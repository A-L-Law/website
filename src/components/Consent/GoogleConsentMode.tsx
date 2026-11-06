import React from 'react'

interface GoogleConsentModeProps {
  gaMeasurementId?: string | null
}

export const GoogleConsentMode: React.FC<GoogleConsentModeProps> = ({ gaMeasurementId }) => {
  const gaId = gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <>
      <script
        id="google-consent-mode-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Check for existing consent in localStorage
            var storedConsent = null;
            try {
              storedConsent = JSON.parse(localStorage.getItem('al_law_cookie_consent'));
            } catch (e) {}

            var analyticsGranted = storedConsent && storedConsent.analytics ? 'granted' : 'denied';
            var marketingGranted = storedConsent && storedConsent.marketing ? 'granted' : 'denied';

            // Establish default Consent Mode v2 flags synchronously before GA loads
            gtag('consent', 'default', {
              'analytics_storage': analyticsGranted,
              'ad_storage': marketingGranted,
              'ad_user_data': marketingGranted,
              'ad_personalization': marketingGranted,
              'wait_for_update': 500
            });

            gtag('js', new Date());
            ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true });` : ''}
          `,
        }}
      />
      {gaId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
      )}
    </>
  )
}
