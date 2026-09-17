'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import Link from 'next/link'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  title?: string | null
  formTitle?: string | null
  content?: DefaultTypedEditorState | null | any
  form: FormType
  location?: {
    type?: 'googleMaps' | 'onlineLink' | 'remote' | null
    mapEmbedUrl?: string | null
    onlineLinkUrl?: string | null
  } | null
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    title,
    formTitle,
    content,
    location,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps?.fields || {},
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <>
      <div className="contact__page section-padding pb-0 font-body">
        <div className="container mx-auto px-4 relative z-10">
          <div className="row flex flex-wrap -mx-4">
            
            {/* Form Column */}
            <div className="col-xl-5 col-lg-5 w-full lg:w-5/12 px-4 order-last lg:order-first">
              <div className="contact__page-form bg-[#f4f4f4] dark:bg-[#181C22] p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 dark:border-[#2D333B] translate-y-12 lg:translate-y-24">
                <h3 className="mb-8 font-heading font-bold text-2xl md:text-3xl text-brand-charcoal dark:text-white">{formTitle || 'Contact Us'}</h3>
                
                <FormProvider {...formMethods}>
                  {!isLoading && hasSubmitted && confirmationType === 'message' && (
                    <div className="mb-4 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                      <RichText data={confirmationMessage} />
                    </div>
                  )}
                  {isLoading && !hasSubmitted && <p className="mb-4 text-brand-slate">Loading, please wait...</p>}
                  {error && <div className="mb-4 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">{`${error.status || '500'}: ${error.message || ''}`}</div>}
                  
                  {!hasSubmitted && (
                    <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                      <div className="row flex flex-wrap -mx-2">
                        {formFromProps && formFromProps.fields && formFromProps.fields.map((field, index) => {
                          const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                          if (Field) {
                            return (
                              <div className="col-sm-12 w-full px-2 mb-5" key={index}>
                                <div className="contact__page-form-item contact-item relative">
                                  {/* Inject icons based on field names if possible, else standard styling */}
                                  {'name' in field && field.name === 'name' && <span className="fal fa-user absolute left-4 top-1/2 -translate-y-1/2 text-brand-crimson z-10"></span>}
                                  {'name' in field && field.name === 'email' && <span className="far fa-envelope-open absolute left-4 top-1/2 -translate-y-1/2 text-brand-crimson z-10"></span>}
                                  {'name' in field && field.name === 'message' && <span className="far fa-comments absolute left-4 top-4 text-brand-crimson z-10"></span>}
                                  
                                  <div className={`[&_input]:w-full [&_input]:bg-white [&_input]:dark:bg-[#1C2128] [&_input]:border [&_input]:border-gray-200 [&_input]:dark:border-[#2D333B] [&_input]:rounded [&_input]:py-3 ${'name' in field && (field.name === 'name' || field.name === 'email') ? '[&_input]:pl-10' : '[&_input]:px-4'} [&_input]:pr-4 [&_input]:text-brand-charcoal [&_input]:dark:text-white [&_input]:focus:outline-none [&_input]:focus:border-brand-crimson [&_input]:transition-colors [&_textarea]:w-full [&_textarea]:bg-white [&_textarea]:dark:bg-[#1C2128] [&_textarea]:border [&_textarea]:border-gray-200 [&_textarea]:dark:border-[#2D333B] [&_textarea]:rounded [&_textarea]:py-3 ${'name' in field && field.name === 'message' ? '[&_textarea]:pl-10' : '[&_textarea]:px-4'} [&_textarea]:pr-4 [&_textarea]:h-32 [&_textarea]:resize-none [&_textarea]:text-brand-charcoal [&_textarea]:dark:text-white [&_textarea]:focus:outline-none [&_textarea]:focus:border-brand-crimson [&_textarea]:transition-colors`}>
                                    <Field
                                      form={formFromProps}
                                      {...field}
                                      {...formMethods}
                                      control={control}
                                      errors={errors}
                                      register={register}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })}
                        
                        <div className="col-lg-12 w-full px-2 mt-3">										
                          <div className="contact__page-form-item">
                            <button className="btn-one bg-brand-crimson hover:bg-brand-crimson/90 text-white font-semibold py-3 px-8 rounded flex items-center gap-2 transition-colors w-full justify-center md:justify-start md:w-auto" type="submit">
                              {submitButtonLabel || 'Submit Now'}<i className="far fa-chevron-double-right"></i>
                            </button>
                          </div>										
                        </div>
                      </div>							
                    </form>  
                  )}
                </FormProvider>                      
              </div>
            </div>
            
            {/* Info Column */}
            <div className="col-xl-7 col-lg-7 w-full lg:w-7/12 px-4 mb-12 lg:mb-0">
              <div className="contact__page-info lg:pl-12">
                <h2 className="mb-12 font-heading font-bold text-4xl text-brand-charcoal dark:text-white">{title || 'Get In Touch'}</h2>
                
                {content && (
                  <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:text-lg mb-8">
                    <RichText data={content} enableGutter={false} />
                  </div>
                )}
                
                {location?.type && (
                  <div className="mt-8 flex flex-col gap-4">
                    {location.type === 'remote' && (
                      <div className="flex items-center gap-3 text-lg font-medium text-brand-charcoal dark:text-white">
                        <i className="fal fa-globe text-brand-crimson text-xl"></i>
                        Remote
                      </div>
                    )}
                    {location.type === 'onlineLink' && location.onlineLinkUrl && (
                      <div className="flex items-center gap-3 text-lg font-medium text-brand-charcoal dark:text-white">
                        <i className="fal fa-link text-brand-crimson text-xl"></i>
                        <Link href={location.onlineLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-crimson transition-colors">
                          Join Online
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {location?.type === 'googleMaps' && location.mapEmbedUrl && (
        <div className="contact__page-map relative z-0">
          <iframe 
            src={location.mapEmbedUrl} 
            loading="lazy"
            className="w-full h-[450px] border-0 grayscale"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  )
}
