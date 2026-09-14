import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   
  
  
  CREATE TYPE "public"."enum_pages_blocks_services_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_solutions_block_items_icon" AS ENUM('Lightbulb', 'Compass', 'ShieldCheck', 'Scale', 'Briefcase', 'Users');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_archive_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_archive_block_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_services_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_block_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_solutions_block_items_icon" AS ENUM('Lightbulb', 'Compass', 'ShieldCheck', 'Scale', 'Briefcase', 'Users');
  CREATE TYPE "public"."enum_entities_schema_type" AS ENUM('LegalService', 'Attorney', 'Article', 'JobPosting', 'Event', 'Thing');
  CREATE TYPE "public"."enum_testimonials_source" AS ENUM('ReviewSolicitors', 'Google Local Services', 'Direct Client');
  CREATE TYPE "public"."enum_practice_areas_icon" AS ENUM('Scale', 'Briefcase', 'Building2', 'ShieldCheck', 'FileText', 'Users', 'Gavel', 'Landmark');
  CREATE TYPE "public"."enum_practice_areas_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__practice_areas_v_version_icon" AS ENUM('Scale', 'Briefcase', 'Building2', 'ShieldCheck', 'FileText', 'Users', 'Gavel', 'Landmark');
  CREATE TYPE "public"."enum__practice_areas_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_post_type" AS ENUM('news', 'guide');
  CREATE TYPE "public"."enum__posts_v_version_post_type" AS ENUM('news', 'guide');
  CREATE TYPE "public"."enum_vacancies_employment_type" AS ENUM('Full-Time', 'Part-Time', 'Contract');
  CREATE TYPE "public"."enum_team_job_role" AS ENUM('founder', 'partner', 'senior-solicitor', 'associate', 'solicitor', 'consultant', 'manager', 'legal-assistant', 'trainee');
  CREATE TYPE "public"."enum_header_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram');
  CREATE TYPE "public"."enum_header_nav_items_sub_menu_nested_sub_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_sub_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram');
  CREATE TYPE "public"."enum_footer_nav_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"media_id" integer,
  	"button_text" varchar DEFAULT 'Read More',
  	"button_url" varchar DEFAULT '/about',
  	"video_url" varchar
  );
  
  CREATE TABLE "pages_blocks_about_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature_text" varchar
  );
  
  CREATE TABLE "pages_blocks_about_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'About Company',
  	"title" varchar DEFAULT 'Our Skilled Team Grow Your Business.',
  	"description" varchar DEFAULT 'Aliquam volutpat diam a orci euismod ornare. Suspendisse quis massa justo. Suspendisse tortor lacus, tincidunt ut ex a, pretium lobortis sapien. Vestibulum rutrum pharetra ex,',
  	"image1_id" integer,
  	"image2_id" integer,
  	"experience_number" numeric DEFAULT 32,
  	"experience_title" varchar DEFAULT 'Years Experience Our Company',
  	"button_text" varchar DEFAULT 'Discover More',
  	"button_link" varchar DEFAULT '/about',
  	"team_member_id" integer,
  	"founder_name" varchar DEFAULT 'Nguyen, Shane',
  	"founder_title" varchar DEFAULT 'Founder CEO',
  	"founder_avatar_id" integer,
  	"secondary_experience_number" numeric DEFAULT 150,
  	"secondary_experience_title" varchar DEFAULT 'Expert Team members',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_archive_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'From The Blog',
  	"title" varchar DEFAULT 'Blog & Articles',
  	"populate_by" "enum_pages_blocks_blog_archive_block_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_blog_archive_block_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 3,
  	"button_text" varchar DEFAULT 'See More Articles',
  	"button_link" varchar DEFAULT '/guides',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_form_block_avatar_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_cta_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Get In Touch',
  	"title" varchar DEFAULT 'Free Legal Consultation',
  	"form_id" integer,
  	"right_title" varchar DEFAULT 'Serving Global & National Clients With Integrity',
  	"right_description" varchar,
  	"bg_image_id" integer,
  	"emergency_phone" varchar DEFAULT '+44 (0)20 7946 0912',
  	"emergency_email" varchar DEFAULT 'enquiries@allaw.co.uk',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_inline_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Get Free Quote',
  	"subtitle" varchar DEFAULT 'Perfect legal solution for your company.',
  	"form_id" integer,
  	"button_text" varchar DEFAULT 'Get Quote',
  	"button_link" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_experience_block_skill_bars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"percentage" numeric DEFAULT 85
  );
  
  CREATE TABLE "pages_blocks_experience_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Brand Success',
  	"title" varchar DEFAULT 'Empowering Brand Growth Together',
  	"description" varchar,
  	"image1_id" integer,
  	"image2_id" integer,
  	"button_text" varchar DEFAULT 'Get Consulting',
  	"button_link" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Company Case Studies',
  	"title" varchar DEFAULT 'Our Litigation & Legal Success',
  	"populate_by" "enum_pages_blocks_portfolio_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'OUR SOLUTIONS',
  	"title" varchar DEFAULT 'Practice Area Services',
  	"populate_by" "enum_pages_blocks_services_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 4,
  	"button_text" varchar DEFAULT 'ALL PRACTICE AREAS',
  	"button_link" varchar DEFAULT '/practice-areas',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Real Client Stories',
  	"title" varchar DEFAULT 'Customer & Client Experiences',
  	"populate_by" "enum_pages_blocks_testimonials_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_history_block_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_history_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Our History',
  	"title" varchar DEFAULT 'Our Firm History & Growth',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_who_we_are_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"count" numeric,
  	"suffix" varchar DEFAULT 'k',
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_who_we_are_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Who We Are',
  	"title" varchar DEFAULT 'Best Firm Especially in Business Law',
  	"description" varchar,
  	"main_image_id" integer,
  	"button_text" varchar DEFAULT 'Discover More',
  	"button_link" varchar DEFAULT '/about',
  	"solution_title" varchar DEFAULT 'Implement solutions & achieve goals.',
  	"solution_button_text" varchar DEFAULT 'Get Free Consultations',
  	"solution_button_link" varchar DEFAULT '/contact',
  	"solution_bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block_faqs_col1" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block_faqs_col2" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Frequently Asked Questions',
  	"title" varchar DEFAULT 'Answers to Your Legal Enquiries',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_solutions_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_solutions_block_items_icon" DEFAULT 'Lightbulb',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_solutions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Advance Solutions',
  	"title" varchar DEFAULT 'We Help With Strategic Planning',
  	"description" varchar DEFAULT 'A L Law provides tailored legal advice and solutions designed to protect your business, assets, and future.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"media_id" integer,
  	"button_text" varchar DEFAULT 'Read More',
  	"button_url" varchar DEFAULT '/about',
  	"video_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'About Company',
  	"title" varchar DEFAULT 'Our Skilled Team Grow Your Business.',
  	"description" varchar DEFAULT 'Aliquam volutpat diam a orci euismod ornare. Suspendisse quis massa justo. Suspendisse tortor lacus, tincidunt ut ex a, pretium lobortis sapien. Vestibulum rutrum pharetra ex,',
  	"image1_id" integer,
  	"image2_id" integer,
  	"experience_number" numeric DEFAULT 32,
  	"experience_title" varchar DEFAULT 'Years Experience Our Company',
  	"button_text" varchar DEFAULT 'Discover More',
  	"button_link" varchar DEFAULT '/about',
  	"team_member_id" integer,
  	"founder_name" varchar DEFAULT 'Nguyen, Shane',
  	"founder_title" varchar DEFAULT 'Founder CEO',
  	"founder_avatar_id" integer,
  	"secondary_experience_number" numeric DEFAULT 150,
  	"secondary_experience_title" varchar DEFAULT 'Expert Team members',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_archive_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'From The Blog',
  	"title" varchar DEFAULT 'Blog & Articles',
  	"populate_by" "enum__pages_v_blocks_blog_archive_block_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_blog_archive_block_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 3,
  	"button_text" varchar DEFAULT 'See More Articles',
  	"button_link" varchar DEFAULT '/guides',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_form_block_avatar_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Get In Touch',
  	"title" varchar DEFAULT 'Free Legal Consultation',
  	"form_id" integer,
  	"right_title" varchar DEFAULT 'Serving Global & National Clients With Integrity',
  	"right_description" varchar,
  	"bg_image_id" integer,
  	"emergency_phone" varchar DEFAULT '+44 (0)20 7946 0912',
  	"emergency_email" varchar DEFAULT 'enquiries@allaw.co.uk',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_inline_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Get Free Quote',
  	"subtitle" varchar DEFAULT 'Perfect legal solution for your company.',
  	"form_id" integer,
  	"button_text" varchar DEFAULT 'Get Quote',
  	"button_link" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experience_block_skill_bars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"percentage" numeric DEFAULT 85,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experience_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Brand Success',
  	"title" varchar DEFAULT 'Empowering Brand Growth Together',
  	"description" varchar,
  	"image1_id" integer,
  	"image2_id" integer,
  	"button_text" varchar DEFAULT 'Get Consulting',
  	"button_link" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Company Case Studies',
  	"title" varchar DEFAULT 'Our Litigation & Legal Success',
  	"populate_by" "enum__pages_v_blocks_portfolio_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'OUR SOLUTIONS',
  	"title" varchar DEFAULT 'Practice Area Services',
  	"populate_by" "enum__pages_v_blocks_services_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 4,
  	"button_text" varchar DEFAULT 'ALL PRACTICE AREAS',
  	"button_link" varchar DEFAULT '/practice-areas',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Real Client Stories',
  	"title" varchar DEFAULT 'Customer & Client Experiences',
  	"populate_by" "enum__pages_v_blocks_testimonials_block_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_history_block_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_history_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Our History',
  	"title" varchar DEFAULT 'Our Firm History & Growth',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"count" numeric,
  	"suffix" varchar DEFAULT 'k',
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Who We Are',
  	"title" varchar DEFAULT 'Best Firm Especially in Business Law',
  	"description" varchar,
  	"main_image_id" integer,
  	"button_text" varchar DEFAULT 'Discover More',
  	"button_link" varchar DEFAULT '/about',
  	"solution_title" varchar DEFAULT 'Implement solutions & achieve goals.',
  	"solution_button_text" varchar DEFAULT 'Get Free Consultations',
  	"solution_button_link" varchar DEFAULT '/contact',
  	"solution_bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_faqs_col1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_faqs_col2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Frequently Asked Questions',
  	"title" varchar DEFAULT 'Answers to Your Legal Enquiries',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_solutions_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_solutions_block_items_icon" DEFAULT 'Lightbulb',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_solutions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT 'Advance Solutions',
  	"title" varchar DEFAULT 'We Help With Strategic Planning',
  	"description" varchar DEFAULT 'A L Law provides tailored legal advice and solutions designed to protect your business, assets, and future.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"permissions_can_publish_content" boolean DEFAULT true,
  	"permissions_can_manage_users" boolean DEFAULT false,
  	"permissions_can_manage_globals" boolean DEFAULT false,
  	"permissions_can_access_admin" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entities_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "entities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"schema_type" "enum_entities_schema_type" DEFAULT 'LegalService' NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reviewer_name" varchar NOT NULL,
  	"source" "enum_testimonials_source" DEFAULT 'ReviewSolicitors' NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"review_text" varchar NOT NULL,
  	"verified" boolean DEFAULT true,
  	"team_member_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "practice_areas_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "practice_areas_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "practice_areas_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "practice_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum_practice_areas_icon" DEFAULT 'Scale',
  	"custom_icon_id" integer,
  	"summary" varchar,
  	"description" jsonb,
  	"hero_image_id" integer,
  	"capabilities_title" varchar DEFAULT 'Strategic Capabilities & Scope',
  	"capabilities_description" varchar DEFAULT 'Our solicitors combine technical excellence with acute commercial acumen. Whether advising corporate entities on complex regulatory landscapes or resolving contentious disputes, we safeguard our clients'' interests with focused precision.',
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_practice_areas_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_practice_areas_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_practice_areas_v_version_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_practice_areas_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_practice_areas_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_icon" "enum__practice_areas_v_version_icon" DEFAULT 'Scale',
  	"version_custom_icon_id" integer,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_hero_image_id" integer,
  	"version_capabilities_title" varchar DEFAULT 'Strategic Capabilities & Scope',
  	"version_capabilities_description" varchar DEFAULT 'Our solicitors combine technical excellence with acute commercial acumen. Whether advising corporate entities on complex regulatory landscapes or resolving contentious disputes, we safeguard our clients'' interests with focused precision.',
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__practice_areas_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"excerpt" varchar,
  	"about_case" jsonb,
  	"challenges" jsonb,
  	"solutions" jsonb,
  	"practice_area_id" integer,
  	"forum" varchar,
  	"value" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_cases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "cases_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_excerpt" varchar,
  	"version_about_case" jsonb,
  	"version_challenges" jsonb,
  	"version_solutions" jsonb,
  	"version_practice_area_id" integer,
  	"version_forum" varchar,
  	"version_value" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_cases_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"location" varchar DEFAULT 'London Office & Online Webinar' NOT NULL,
  	"summary" varchar,
  	"details" jsonb,
  	"featured_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"department_id" integer,
  	"location" varchar DEFAULT 'London, UK',
  	"employment_type" "enum_vacancies_employment_type" DEFAULT 'Full-Time',
  	"description" jsonb,
  	"closing_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_practice_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"percentage" numeric NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"job_role" "enum_team_job_role" NOT NULL,
  	"avatar_id" integer NOT NULL,
  	"user_id" integer,
  	"background" jsonb,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_office_location" varchar DEFAULT 'London Head Office',
  	"social_links_linkedin" varchar,
  	"social_links_instagram" varchar,
  	"social_links_facebook" varchar,
  	"social_links_x" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_header_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_menu_nested_sub_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_menu_nested_sub_menu_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_menu_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_title" varchar DEFAULT 'Our Practice Areas' NOT NULL
  );
  
  CREATE TABLE "footer_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Head Office Address' NOT NULL,
  	"address" varchar NOT NULL,
  	"map_link" varchar
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "page_banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"practice_areas_title" varchar DEFAULT 'Our Practice Areas',
  	"practice_areas_inner_title" varchar DEFAULT 'Our Practice Areas',
  	"practice_areas_media_id" integer,
  	"team_title" varchar DEFAULT 'Our Team & Partners',
  	"team_inner_title" varchar DEFAULT 'Our Team',
  	"team_media_id" integer,
  	"guides_title" varchar DEFAULT 'Legal Guides & Insights',
  	"guides_inner_title" varchar DEFAULT 'Legal Guides',
  	"guides_media_id" integer,
  	"cases_title" varchar DEFAULT 'Cases & Matters',
  	"cases_inner_title" varchar DEFAULT 'Cases',
  	"cases_media_id" integer,
  	"events_title" varchar DEFAULT 'Events & Webinars',
  	"events_inner_title" varchar DEFAULT 'Events',
  	"events_media_id" integer,
  	"news_title" varchar DEFAULT 'Firm News & Media',
  	"news_inner_title" varchar DEFAULT 'News',
  	"news_media_id" integer,
  	"vacancies_title" varchar DEFAULT 'Careers & Vacancies',
  	"vacancies_inner_title" varchar DEFAULT 'Careers',
  	"vacancies_media_id" integer,
  	"search_title" varchar DEFAULT 'Search Results',
  	"search_inner_title" varchar DEFAULT 'Search',
  	"search_media_id" integer,
  	"default_banner_media_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_inner_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "enable_subscribe_banner" boolean DEFAULT false;
  ALTER TABLE "pages_rels" ADD COLUMN "cases_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "practice_areas_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_inner_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_enable_subscribe_banner" boolean DEFAULT false;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "cases_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "practice_areas_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "practice_area_id" integer;
  ALTER TABLE "posts" ADD COLUMN "post_type" "enum_posts_post_type" DEFAULT 'news';
  ALTER TABLE "posts_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_practice_area_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_post_type" "enum__posts_v_version_post_type" DEFAULT 'news';
  ALTER TABLE "_posts_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "categories" ADD COLUMN "practice_area_id" integer;
  ALTER TABLE "users" ADD COLUMN "role_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "practice_areas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "entities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "practice_areas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "vacancies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_id" integer;
  ALTER TABLE "header" ADD COLUMN "top_bar_address" varchar DEFAULT '2972 Westheimer Rd. Santa Ana, Illinois 85486';
  ALTER TABLE "header" ADD COLUMN "top_bar_email" varchar DEFAULT 'info@allaw.co.uk';
  ALTER TABLE "header" ADD COLUMN "offcanvas_description" varchar DEFAULT 'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.';
  ALTER TABLE "header" ADD COLUMN "cta_button_text" varchar DEFAULT 'Free Consultation';
  ALTER TABLE "header" ADD COLUMN "cta_button_link" varchar DEFAULT '/contact';
  ALTER TABLE "header" ADD COLUMN "practice_areas_hero_media_id" integer;
  ALTER TABLE "footer" ADD COLUMN "flavor_description" varchar DEFAULT 'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.';
  ALTER TABLE "footer" ADD COLUMN "head_office_address" varchar DEFAULT '2972 Westheimer Rd. Santa Ana, Illinois 85486';
  ALTER TABLE "footer" ADD COLUMN "branch_office_address" varchar DEFAULT '8502 Preston Rd. Inglewood, Maine 98380';
  ALTER TABLE "footer" ADD COLUMN "copyright" jsonb;
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar DEFAULT 'Copyright 2026 A L Law — All Rights Reserved';
  ALTER TABLE "footer" ADD COLUMN "subscribe_bg_media_id" integer;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block_features" ADD CONSTRAINT "pages_blocks_about_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_team_member_id_users_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_founder_avatar_id_media_id_fk" FOREIGN KEY ("founder_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_archive_block" ADD CONSTRAINT "pages_blocks_blog_archive_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_form_block_avatar_images" ADD CONSTRAINT "pages_blocks_cta_form_block_avatar_images_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_form_block_avatar_images" ADD CONSTRAINT "pages_blocks_cta_form_block_avatar_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_form_block" ADD CONSTRAINT "pages_blocks_cta_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_form_block" ADD CONSTRAINT "pages_blocks_cta_form_block_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_form_block" ADD CONSTRAINT "pages_blocks_cta_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_inline_block" ADD CONSTRAINT "pages_blocks_cta_inline_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_inline_block" ADD CONSTRAINT "pages_blocks_cta_inline_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_block_skill_bars" ADD CONSTRAINT "pages_blocks_experience_block_skill_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experience_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_block" ADD CONSTRAINT "pages_blocks_experience_block_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_block" ADD CONSTRAINT "pages_blocks_experience_block_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_block" ADD CONSTRAINT "pages_blocks_experience_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_block" ADD CONSTRAINT "pages_blocks_portfolio_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_block" ADD CONSTRAINT "pages_blocks_services_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block" ADD CONSTRAINT "pages_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_history_block_timeline" ADD CONSTRAINT "pages_blocks_history_block_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_history_block_timeline" ADD CONSTRAINT "pages_blocks_history_block_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_history_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_history_block" ADD CONSTRAINT "pages_blocks_history_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_block_stats" ADD CONSTRAINT "pages_blocks_who_we_are_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_block" ADD CONSTRAINT "pages_blocks_who_we_are_block_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_block" ADD CONSTRAINT "pages_blocks_who_we_are_block_solution_bg_image_id_media_id_fk" FOREIGN KEY ("solution_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_block" ADD CONSTRAINT "pages_blocks_who_we_are_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_faqs_col1" ADD CONSTRAINT "pages_blocks_faq_block_faqs_col1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_faqs_col2" ADD CONSTRAINT "pages_blocks_faq_block_faqs_col2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_solutions_block_items" ADD CONSTRAINT "pages_blocks_solutions_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_solutions_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_solutions_block" ADD CONSTRAINT "pages_blocks_solutions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block_features" ADD CONSTRAINT "_pages_v_blocks_about_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_team_member_id_users_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_founder_avatar_id_media_id_fk" FOREIGN KEY ("founder_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_archive_block" ADD CONSTRAINT "_pages_v_blocks_blog_archive_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_form_block_avatar_images" ADD CONSTRAINT "_pages_v_blocks_cta_form_block_avatar_images_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_form_block_avatar_images" ADD CONSTRAINT "_pages_v_blocks_cta_form_block_avatar_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_form_block" ADD CONSTRAINT "_pages_v_blocks_cta_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_form_block" ADD CONSTRAINT "_pages_v_blocks_cta_form_block_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_form_block" ADD CONSTRAINT "_pages_v_blocks_cta_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_inline_block" ADD CONSTRAINT "_pages_v_blocks_cta_inline_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_inline_block" ADD CONSTRAINT "_pages_v_blocks_cta_inline_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experience_block_skill_bars" ADD CONSTRAINT "_pages_v_blocks_experience_block_skill_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_experience_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experience_block" ADD CONSTRAINT "_pages_v_blocks_experience_block_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experience_block" ADD CONSTRAINT "_pages_v_blocks_experience_block_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experience_block" ADD CONSTRAINT "_pages_v_blocks_experience_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_block" ADD CONSTRAINT "_pages_v_blocks_portfolio_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_block" ADD CONSTRAINT "_pages_v_blocks_services_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_history_block_timeline" ADD CONSTRAINT "_pages_v_blocks_history_block_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_history_block_timeline" ADD CONSTRAINT "_pages_v_blocks_history_block_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_history_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_history_block" ADD CONSTRAINT "_pages_v_blocks_history_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_block_stats" ADD CONSTRAINT "_pages_v_blocks_who_we_are_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_block" ADD CONSTRAINT "_pages_v_blocks_who_we_are_block_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_block" ADD CONSTRAINT "_pages_v_blocks_who_we_are_block_solution_bg_image_id_media_id_fk" FOREIGN KEY ("solution_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_block" ADD CONSTRAINT "_pages_v_blocks_who_we_are_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs_col1" ADD CONSTRAINT "_pages_v_blocks_faq_block_faqs_col1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs_col2" ADD CONSTRAINT "_pages_v_blocks_faq_block_faqs_col2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_solutions_block_items" ADD CONSTRAINT "_pages_v_blocks_solutions_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_solutions_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_solutions_block" ADD CONSTRAINT "_pages_v_blocks_solutions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_same_as" ADD CONSTRAINT "entities_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_team_member_id_users_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practice_areas_highlights" ADD CONSTRAINT "practice_areas_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_capabilities" ADD CONSTRAINT "practice_areas_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_faqs" ADD CONSTRAINT "practice_areas_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas" ADD CONSTRAINT "practice_areas_custom_icon_id_media_id_fk" FOREIGN KEY ("custom_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practice_areas" ADD CONSTRAINT "practice_areas_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practice_areas" ADD CONSTRAINT "practice_areas_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_version_highlights" ADD CONSTRAINT "_practice_areas_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_practice_areas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_version_capabilities" ADD CONSTRAINT "_practice_areas_v_version_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_practice_areas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_version_faqs" ADD CONSTRAINT "_practice_areas_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_practice_areas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_parent_id_practice_areas_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_version_custom_icon_id_media_id_fk" FOREIGN KEY ("version_custom_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cases" ADD CONSTRAINT "cases_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cases" ADD CONSTRAINT "cases_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cases" ADD CONSTRAINT "cases_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_parent_id_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("version_practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cases_v_rels" ADD CONSTRAINT "_cases_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cases_v_rels" ADD CONSTRAINT "_cases_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cases_v_rels" ADD CONSTRAINT "_cases_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cases_v_rels" ADD CONSTRAINT "_cases_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_department_id_practice_areas_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_practice_areas" ADD CONSTRAINT "team_practice_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_social_links" ADD CONSTRAINT "header_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_menu_nested_sub_menu" ADD CONSTRAINT "header_nav_items_sub_menu_nested_sub_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_sub_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_menu" ADD CONSTRAINT "header_nav_items_sub_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_columns_links" ADD CONSTRAINT "footer_nav_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_columns" ADD CONSTRAINT "footer_nav_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_addresses" ADD CONSTRAINT "footer_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_practice_areas_media_id_media_id_fk" FOREIGN KEY ("practice_areas_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_team_media_id_media_id_fk" FOREIGN KEY ("team_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_guides_media_id_media_id_fk" FOREIGN KEY ("guides_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_cases_media_id_media_id_fk" FOREIGN KEY ("cases_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_events_media_id_media_id_fk" FOREIGN KEY ("events_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_news_media_id_media_id_fk" FOREIGN KEY ("news_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_vacancies_media_id_media_id_fk" FOREIGN KEY ("vacancies_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_search_media_id_media_id_fk" FOREIGN KEY ("search_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_banners" ADD CONSTRAINT "page_banners_default_banner_media_id_media_id_fk" FOREIGN KEY ("default_banner_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_slides_order_idx" ON "pages_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_parent_id_idx" ON "pages_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_slides_media_idx" ON "pages_hero_slides" USING btree ("media_id");
  CREATE INDEX "pages_blocks_about_block_features_order_idx" ON "pages_blocks_about_block_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_block_features_parent_id_idx" ON "pages_blocks_about_block_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_block_order_idx" ON "pages_blocks_about_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_block_parent_id_idx" ON "pages_blocks_about_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_block_path_idx" ON "pages_blocks_about_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_block_image1_idx" ON "pages_blocks_about_block" USING btree ("image1_id");
  CREATE INDEX "pages_blocks_about_block_image2_idx" ON "pages_blocks_about_block" USING btree ("image2_id");
  CREATE INDEX "pages_blocks_about_block_team_member_idx" ON "pages_blocks_about_block" USING btree ("team_member_id");
  CREATE INDEX "pages_blocks_about_block_founder_avatar_idx" ON "pages_blocks_about_block" USING btree ("founder_avatar_id");
  CREATE INDEX "pages_blocks_blog_archive_block_order_idx" ON "pages_blocks_blog_archive_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_archive_block_parent_id_idx" ON "pages_blocks_blog_archive_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_archive_block_path_idx" ON "pages_blocks_blog_archive_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_form_block_avatar_images_order_idx" ON "pages_blocks_cta_form_block_avatar_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_form_block_avatar_images_parent_id_idx" ON "pages_blocks_cta_form_block_avatar_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_form_block_avatar_images_avatar_idx" ON "pages_blocks_cta_form_block_avatar_images" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_cta_form_block_order_idx" ON "pages_blocks_cta_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_form_block_parent_id_idx" ON "pages_blocks_cta_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_form_block_path_idx" ON "pages_blocks_cta_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_form_block_form_idx" ON "pages_blocks_cta_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_cta_form_block_bg_image_idx" ON "pages_blocks_cta_form_block" USING btree ("bg_image_id");
  CREATE INDEX "pages_blocks_cta_inline_block_order_idx" ON "pages_blocks_cta_inline_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_inline_block_parent_id_idx" ON "pages_blocks_cta_inline_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_inline_block_path_idx" ON "pages_blocks_cta_inline_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_inline_block_form_idx" ON "pages_blocks_cta_inline_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_experience_block_skill_bars_order_idx" ON "pages_blocks_experience_block_skill_bars" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_block_skill_bars_parent_id_idx" ON "pages_blocks_experience_block_skill_bars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_block_order_idx" ON "pages_blocks_experience_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_block_parent_id_idx" ON "pages_blocks_experience_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_block_path_idx" ON "pages_blocks_experience_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_experience_block_image1_idx" ON "pages_blocks_experience_block" USING btree ("image1_id");
  CREATE INDEX "pages_blocks_experience_block_image2_idx" ON "pages_blocks_experience_block" USING btree ("image2_id");
  CREATE INDEX "pages_blocks_portfolio_block_order_idx" ON "pages_blocks_portfolio_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_block_parent_id_idx" ON "pages_blocks_portfolio_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_block_path_idx" ON "pages_blocks_portfolio_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_block_order_idx" ON "pages_blocks_services_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_block_parent_id_idx" ON "pages_blocks_services_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_block_path_idx" ON "pages_blocks_services_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_block_order_idx" ON "pages_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_block_parent_id_idx" ON "pages_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_path_idx" ON "pages_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_history_block_timeline_order_idx" ON "pages_blocks_history_block_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_history_block_timeline_parent_id_idx" ON "pages_blocks_history_block_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_history_block_timeline_image_idx" ON "pages_blocks_history_block_timeline" USING btree ("image_id");
  CREATE INDEX "pages_blocks_history_block_order_idx" ON "pages_blocks_history_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_history_block_parent_id_idx" ON "pages_blocks_history_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_history_block_path_idx" ON "pages_blocks_history_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_we_are_block_stats_order_idx" ON "pages_blocks_who_we_are_block_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_block_stats_parent_id_idx" ON "pages_blocks_who_we_are_block_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_block_order_idx" ON "pages_blocks_who_we_are_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_block_parent_id_idx" ON "pages_blocks_who_we_are_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_block_path_idx" ON "pages_blocks_who_we_are_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_we_are_block_main_image_idx" ON "pages_blocks_who_we_are_block" USING btree ("main_image_id");
  CREATE INDEX "pages_blocks_who_we_are_block_solution_bg_image_idx" ON "pages_blocks_who_we_are_block" USING btree ("solution_bg_image_id");
  CREATE INDEX "pages_blocks_faq_block_faqs_col1_order_idx" ON "pages_blocks_faq_block_faqs_col1" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_faqs_col1_parent_id_idx" ON "pages_blocks_faq_block_faqs_col1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_faqs_col2_order_idx" ON "pages_blocks_faq_block_faqs_col2" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_faqs_col2_parent_id_idx" ON "pages_blocks_faq_block_faqs_col2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_solutions_block_items_order_idx" ON "pages_blocks_solutions_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_solutions_block_items_parent_id_idx" ON "pages_blocks_solutions_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_solutions_block_order_idx" ON "pages_blocks_solutions_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_solutions_block_parent_id_idx" ON "pages_blocks_solutions_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_solutions_block_path_idx" ON "pages_blocks_solutions_block" USING btree ("_path");
  CREATE INDEX "_pages_v_version_hero_slides_order_idx" ON "_pages_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_slides_parent_id_idx" ON "_pages_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_slides_media_idx" ON "_pages_v_version_hero_slides" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_about_block_features_order_idx" ON "_pages_v_blocks_about_block_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_block_features_parent_id_idx" ON "_pages_v_blocks_about_block_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_order_idx" ON "_pages_v_blocks_about_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_block_parent_id_idx" ON "_pages_v_blocks_about_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_path_idx" ON "_pages_v_blocks_about_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_block_image1_idx" ON "_pages_v_blocks_about_block" USING btree ("image1_id");
  CREATE INDEX "_pages_v_blocks_about_block_image2_idx" ON "_pages_v_blocks_about_block" USING btree ("image2_id");
  CREATE INDEX "_pages_v_blocks_about_block_team_member_idx" ON "_pages_v_blocks_about_block" USING btree ("team_member_id");
  CREATE INDEX "_pages_v_blocks_about_block_founder_avatar_idx" ON "_pages_v_blocks_about_block" USING btree ("founder_avatar_id");
  CREATE INDEX "_pages_v_blocks_blog_archive_block_order_idx" ON "_pages_v_blocks_blog_archive_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_archive_block_parent_id_idx" ON "_pages_v_blocks_blog_archive_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_archive_block_path_idx" ON "_pages_v_blocks_blog_archive_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_form_block_avatar_images_order_idx" ON "_pages_v_blocks_cta_form_block_avatar_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_form_block_avatar_images_parent_id_idx" ON "_pages_v_blocks_cta_form_block_avatar_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_form_block_avatar_images_avatar_idx" ON "_pages_v_blocks_cta_form_block_avatar_images" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_cta_form_block_order_idx" ON "_pages_v_blocks_cta_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_form_block_parent_id_idx" ON "_pages_v_blocks_cta_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_form_block_path_idx" ON "_pages_v_blocks_cta_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_form_block_form_idx" ON "_pages_v_blocks_cta_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_cta_form_block_bg_image_idx" ON "_pages_v_blocks_cta_form_block" USING btree ("bg_image_id");
  CREATE INDEX "_pages_v_blocks_cta_inline_block_order_idx" ON "_pages_v_blocks_cta_inline_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_inline_block_parent_id_idx" ON "_pages_v_blocks_cta_inline_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_inline_block_path_idx" ON "_pages_v_blocks_cta_inline_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_inline_block_form_idx" ON "_pages_v_blocks_cta_inline_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_experience_block_skill_bars_order_idx" ON "_pages_v_blocks_experience_block_skill_bars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experience_block_skill_bars_parent_id_idx" ON "_pages_v_blocks_experience_block_skill_bars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experience_block_order_idx" ON "_pages_v_blocks_experience_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experience_block_parent_id_idx" ON "_pages_v_blocks_experience_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experience_block_path_idx" ON "_pages_v_blocks_experience_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_experience_block_image1_idx" ON "_pages_v_blocks_experience_block" USING btree ("image1_id");
  CREATE INDEX "_pages_v_blocks_experience_block_image2_idx" ON "_pages_v_blocks_experience_block" USING btree ("image2_id");
  CREATE INDEX "_pages_v_blocks_portfolio_block_order_idx" ON "_pages_v_blocks_portfolio_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_block_parent_id_idx" ON "_pages_v_blocks_portfolio_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_block_path_idx" ON "_pages_v_blocks_portfolio_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_block_order_idx" ON "_pages_v_blocks_services_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_block_parent_id_idx" ON "_pages_v_blocks_services_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_block_path_idx" ON "_pages_v_blocks_services_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_block_order_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_block_parent_id_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_path_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_history_block_timeline_order_idx" ON "_pages_v_blocks_history_block_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_history_block_timeline_parent_id_idx" ON "_pages_v_blocks_history_block_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_history_block_timeline_image_idx" ON "_pages_v_blocks_history_block_timeline" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_history_block_order_idx" ON "_pages_v_blocks_history_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_history_block_parent_id_idx" ON "_pages_v_blocks_history_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_history_block_path_idx" ON "_pages_v_blocks_history_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_stats_order_idx" ON "_pages_v_blocks_who_we_are_block_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_stats_parent_id_idx" ON "_pages_v_blocks_who_we_are_block_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_order_idx" ON "_pages_v_blocks_who_we_are_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_parent_id_idx" ON "_pages_v_blocks_who_we_are_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_path_idx" ON "_pages_v_blocks_who_we_are_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_main_image_idx" ON "_pages_v_blocks_who_we_are_block" USING btree ("main_image_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_block_solution_bg_image_idx" ON "_pages_v_blocks_who_we_are_block" USING btree ("solution_bg_image_id");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_col1_order_idx" ON "_pages_v_blocks_faq_block_faqs_col1" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_col1_parent_id_idx" ON "_pages_v_blocks_faq_block_faqs_col1" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_col2_order_idx" ON "_pages_v_blocks_faq_block_faqs_col2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_col2_parent_id_idx" ON "_pages_v_blocks_faq_block_faqs_col2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_solutions_block_items_order_idx" ON "_pages_v_blocks_solutions_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_solutions_block_items_parent_id_idx" ON "_pages_v_blocks_solutions_block_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_solutions_block_order_idx" ON "_pages_v_blocks_solutions_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_solutions_block_parent_id_idx" ON "_pages_v_blocks_solutions_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_solutions_block_path_idx" ON "_pages_v_blocks_solutions_block" USING btree ("_path");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "roles_name_idx" ON "roles" USING btree ("name");
  CREATE UNIQUE INDEX "roles_slug_idx" ON "roles" USING btree ("slug");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE INDEX "entities_same_as_order_idx" ON "entities_same_as" USING btree ("_order");
  CREATE INDEX "entities_same_as_parent_id_idx" ON "entities_same_as" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "entities_slug_idx" ON "entities" USING btree ("slug");
  CREATE INDEX "entities_updated_at_idx" ON "entities" USING btree ("updated_at");
  CREATE INDEX "entities_created_at_idx" ON "entities" USING btree ("created_at");
  CREATE INDEX "testimonials_team_member_idx" ON "testimonials" USING btree ("team_member_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "practice_areas_highlights_order_idx" ON "practice_areas_highlights" USING btree ("_order");
  CREATE INDEX "practice_areas_highlights_parent_id_idx" ON "practice_areas_highlights" USING btree ("_parent_id");
  CREATE INDEX "practice_areas_capabilities_order_idx" ON "practice_areas_capabilities" USING btree ("_order");
  CREATE INDEX "practice_areas_capabilities_parent_id_idx" ON "practice_areas_capabilities" USING btree ("_parent_id");
  CREATE INDEX "practice_areas_faqs_order_idx" ON "practice_areas_faqs" USING btree ("_order");
  CREATE INDEX "practice_areas_faqs_parent_id_idx" ON "practice_areas_faqs" USING btree ("_parent_id");
  CREATE INDEX "practice_areas_custom_icon_idx" ON "practice_areas" USING btree ("custom_icon_id");
  CREATE INDEX "practice_areas_hero_image_idx" ON "practice_areas" USING btree ("hero_image_id");
  CREATE INDEX "practice_areas_meta_meta_image_idx" ON "practice_areas" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "practice_areas_slug_idx" ON "practice_areas" USING btree ("slug");
  CREATE INDEX "practice_areas_updated_at_idx" ON "practice_areas" USING btree ("updated_at");
  CREATE INDEX "practice_areas_created_at_idx" ON "practice_areas" USING btree ("created_at");
  CREATE INDEX "practice_areas__status_idx" ON "practice_areas" USING btree ("_status");
  CREATE INDEX "_practice_areas_v_version_highlights_order_idx" ON "_practice_areas_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_practice_areas_v_version_highlights_parent_id_idx" ON "_practice_areas_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_practice_areas_v_version_capabilities_order_idx" ON "_practice_areas_v_version_capabilities" USING btree ("_order");
  CREATE INDEX "_practice_areas_v_version_capabilities_parent_id_idx" ON "_practice_areas_v_version_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_practice_areas_v_version_faqs_order_idx" ON "_practice_areas_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_practice_areas_v_version_faqs_parent_id_idx" ON "_practice_areas_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_practice_areas_v_parent_idx" ON "_practice_areas_v" USING btree ("parent_id");
  CREATE INDEX "_practice_areas_v_version_version_custom_icon_idx" ON "_practice_areas_v" USING btree ("version_custom_icon_id");
  CREATE INDEX "_practice_areas_v_version_version_hero_image_idx" ON "_practice_areas_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_practice_areas_v_version_meta_version_meta_image_idx" ON "_practice_areas_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_practice_areas_v_version_version_slug_idx" ON "_practice_areas_v" USING btree ("version_slug");
  CREATE INDEX "_practice_areas_v_version_version_updated_at_idx" ON "_practice_areas_v" USING btree ("version_updated_at");
  CREATE INDEX "_practice_areas_v_version_version_created_at_idx" ON "_practice_areas_v" USING btree ("version_created_at");
  CREATE INDEX "_practice_areas_v_version_version__status_idx" ON "_practice_areas_v" USING btree ("version__status");
  CREATE INDEX "_practice_areas_v_created_at_idx" ON "_practice_areas_v" USING btree ("created_at");
  CREATE INDEX "_practice_areas_v_updated_at_idx" ON "_practice_areas_v" USING btree ("updated_at");
  CREATE INDEX "_practice_areas_v_latest_idx" ON "_practice_areas_v" USING btree ("latest");
  CREATE INDEX "_practice_areas_v_autosave_idx" ON "_practice_areas_v" USING btree ("autosave");
  CREATE INDEX "cases_hero_image_idx" ON "cases" USING btree ("hero_image_id");
  CREATE INDEX "cases_practice_area_idx" ON "cases" USING btree ("practice_area_id");
  CREATE INDEX "cases_meta_meta_image_idx" ON "cases" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "cases_slug_idx" ON "cases" USING btree ("slug");
  CREATE INDEX "cases_updated_at_idx" ON "cases" USING btree ("updated_at");
  CREATE INDEX "cases_created_at_idx" ON "cases" USING btree ("created_at");
  CREATE INDEX "cases__status_idx" ON "cases" USING btree ("_status");
  CREATE INDEX "cases_rels_order_idx" ON "cases_rels" USING btree ("order");
  CREATE INDEX "cases_rels_parent_idx" ON "cases_rels" USING btree ("parent_id");
  CREATE INDEX "cases_rels_path_idx" ON "cases_rels" USING btree ("path");
  CREATE INDEX "cases_rels_categories_id_idx" ON "cases_rels" USING btree ("categories_id");
  CREATE INDEX "cases_rels_tags_id_idx" ON "cases_rels" USING btree ("tags_id");
  CREATE INDEX "cases_rels_users_id_idx" ON "cases_rels" USING btree ("users_id");
  CREATE INDEX "_cases_v_parent_idx" ON "_cases_v" USING btree ("parent_id");
  CREATE INDEX "_cases_v_version_version_hero_image_idx" ON "_cases_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_cases_v_version_version_practice_area_idx" ON "_cases_v" USING btree ("version_practice_area_id");
  CREATE INDEX "_cases_v_version_meta_version_meta_image_idx" ON "_cases_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_cases_v_version_version_slug_idx" ON "_cases_v" USING btree ("version_slug");
  CREATE INDEX "_cases_v_version_version_updated_at_idx" ON "_cases_v" USING btree ("version_updated_at");
  CREATE INDEX "_cases_v_version_version_created_at_idx" ON "_cases_v" USING btree ("version_created_at");
  CREATE INDEX "_cases_v_version_version__status_idx" ON "_cases_v" USING btree ("version__status");
  CREATE INDEX "_cases_v_created_at_idx" ON "_cases_v" USING btree ("created_at");
  CREATE INDEX "_cases_v_updated_at_idx" ON "_cases_v" USING btree ("updated_at");
  CREATE INDEX "_cases_v_latest_idx" ON "_cases_v" USING btree ("latest");
  CREATE INDEX "_cases_v_autosave_idx" ON "_cases_v" USING btree ("autosave");
  CREATE INDEX "_cases_v_rels_order_idx" ON "_cases_v_rels" USING btree ("order");
  CREATE INDEX "_cases_v_rels_parent_idx" ON "_cases_v_rels" USING btree ("parent_id");
  CREATE INDEX "_cases_v_rels_path_idx" ON "_cases_v_rels" USING btree ("path");
  CREATE INDEX "_cases_v_rels_categories_id_idx" ON "_cases_v_rels" USING btree ("categories_id");
  CREATE INDEX "_cases_v_rels_tags_id_idx" ON "_cases_v_rels" USING btree ("tags_id");
  CREATE INDEX "_cases_v_rels_users_id_idx" ON "_cases_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancies_slug_idx" ON "vacancies" USING btree ("slug");
  CREATE INDEX "vacancies_department_idx" ON "vacancies" USING btree ("department_id");
  CREATE INDEX "vacancies_updated_at_idx" ON "vacancies" USING btree ("updated_at");
  CREATE INDEX "vacancies_created_at_idx" ON "vacancies" USING btree ("created_at");
  CREATE INDEX "team_practice_areas_order_idx" ON "team_practice_areas" USING btree ("_order");
  CREATE INDEX "team_practice_areas_parent_id_idx" ON "team_practice_areas" USING btree ("_parent_id");
  CREATE INDEX "team_avatar_idx" ON "team" USING btree ("avatar_id");
  CREATE INDEX "team_user_idx" ON "team" USING btree ("user_id");
  CREATE INDEX "team_meta_meta_image_idx" ON "team" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "team_slug_idx" ON "team" USING btree ("slug");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "header_social_links_order_idx" ON "header_social_links" USING btree ("_order");
  CREATE INDEX "header_social_links_parent_id_idx" ON "header_social_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_sub_menu_nested_sub_menu_order_idx" ON "header_nav_items_sub_menu_nested_sub_menu" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_menu_nested_sub_menu_parent_id_idx" ON "header_nav_items_sub_menu_nested_sub_menu" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_sub_menu_order_idx" ON "header_nav_items_sub_menu" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_menu_parent_id_idx" ON "header_nav_items_sub_menu" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_columns_links_order_idx" ON "footer_nav_columns_links" USING btree ("_order");
  CREATE INDEX "footer_nav_columns_links_parent_id_idx" ON "footer_nav_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_columns_order_idx" ON "footer_nav_columns" USING btree ("_order");
  CREATE INDEX "footer_nav_columns_parent_id_idx" ON "footer_nav_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_addresses_order_idx" ON "footer_addresses" USING btree ("_order");
  CREATE INDEX "footer_addresses_parent_id_idx" ON "footer_addresses" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "page_banners_practice_areas_practice_areas_media_idx" ON "page_banners" USING btree ("practice_areas_media_id");
  CREATE INDEX "page_banners_team_team_media_idx" ON "page_banners" USING btree ("team_media_id");
  CREATE INDEX "page_banners_guides_guides_media_idx" ON "page_banners" USING btree ("guides_media_id");
  CREATE INDEX "page_banners_cases_cases_media_idx" ON "page_banners" USING btree ("cases_media_id");
  CREATE INDEX "page_banners_events_events_media_idx" ON "page_banners" USING btree ("events_media_id");
  CREATE INDEX "page_banners_news_news_media_idx" ON "page_banners" USING btree ("news_media_id");
  CREATE INDEX "page_banners_vacancies_vacancies_media_idx" ON "page_banners" USING btree ("vacancies_media_id");
  CREATE INDEX "page_banners_search_search_media_idx" ON "page_banners" USING btree ("search_media_id");
  CREATE INDEX "page_banners_default_banner_default_banner_media_idx" ON "page_banners" USING btree ("default_banner_media_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("version_practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entities_fk" FOREIGN KEY ("entities_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_practice_areas_hero_media_id_media_id_fk" FOREIGN KEY ("practice_areas_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_subscribe_bg_media_id_media_id_fk" FOREIGN KEY ("subscribe_bg_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_rels_cases_id_idx" ON "pages_rels" USING btree ("cases_id");
  CREATE INDEX "pages_rels_practice_areas_id_idx" ON "pages_rels" USING btree ("practice_areas_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_cases_id_idx" ON "_pages_v_rels" USING btree ("cases_id");
  CREATE INDEX "_pages_v_rels_practice_areas_id_idx" ON "_pages_v_rels" USING btree ("practice_areas_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "posts_practice_area_idx" ON "posts" USING btree ("practice_area_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_version_version_practice_area_idx" ON "_posts_v" USING btree ("version_practice_area_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "categories_practice_area_idx" ON "categories" USING btree ("practice_area_id");
  CREATE INDEX "users_role_idx" ON "users" USING btree ("role_id");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_practice_areas_id_idx" ON "search_rels" USING btree ("practice_areas_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_entities_id_idx" ON "payload_locked_documents_rels" USING btree ("entities_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_practice_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("practice_areas_id");
  CREATE INDEX "payload_locked_documents_rels_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("cases_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_vacancies_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancies_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "header_practice_areas_hero_media_idx" ON "header" USING btree ("practice_areas_hero_media_id");
  CREATE INDEX "footer_subscribe_bg_media_idx" ON "footer" USING btree ("subscribe_bg_media_id");
  ALTER TABLE "posts_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "header_rels" DROP COLUMN "posts_id";
  ALTER TABLE "footer_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_block_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_blog_archive_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_form_block_avatar_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_inline_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_experience_block_skill_bars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_experience_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_history_block_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_history_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_block_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_faqs_col1" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_faqs_col2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_solutions_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_solutions_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_block_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_archive_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_form_block_avatar_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_inline_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_experience_block_skill_bars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_experience_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_history_block_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_history_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_block_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs_col1" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs_col2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solutions_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solutions_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "entities_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "entities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "practice_areas_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "practice_areas_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "practice_areas_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "practice_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_practice_areas_v_version_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_practice_areas_v_version_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_practice_areas_v_version_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_practice_areas_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_practice_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_sub_menu_nested_sub_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_sub_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_addresses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_banners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_slides" CASCADE;
  DROP TABLE "pages_blocks_about_block_features" CASCADE;
  DROP TABLE "pages_blocks_about_block" CASCADE;
  DROP TABLE "pages_blocks_blog_archive_block" CASCADE;
  DROP TABLE "pages_blocks_cta_form_block_avatar_images" CASCADE;
  DROP TABLE "pages_blocks_cta_form_block" CASCADE;
  DROP TABLE "pages_blocks_cta_inline_block" CASCADE;
  DROP TABLE "pages_blocks_experience_block_skill_bars" CASCADE;
  DROP TABLE "pages_blocks_experience_block" CASCADE;
  DROP TABLE "pages_blocks_portfolio_block" CASCADE;
  DROP TABLE "pages_blocks_services_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_history_block_timeline" CASCADE;
  DROP TABLE "pages_blocks_history_block" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_block_stats" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_block" CASCADE;
  DROP TABLE "pages_blocks_faq_block_faqs_col1" CASCADE;
  DROP TABLE "pages_blocks_faq_block_faqs_col2" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "pages_blocks_solutions_block_items" CASCADE;
  DROP TABLE "pages_blocks_solutions_block" CASCADE;
  DROP TABLE "_pages_v_version_hero_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block_features" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_archive_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_form_block_avatar_images" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_inline_block" CASCADE;
  DROP TABLE "_pages_v_blocks_experience_block_skill_bars" CASCADE;
  DROP TABLE "_pages_v_blocks_experience_block" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_block" CASCADE;
  DROP TABLE "_pages_v_blocks_services_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block" CASCADE;
  DROP TABLE "_pages_v_blocks_history_block_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_history_block" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_block_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_block" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_faqs_col1" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_faqs_col2" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_solutions_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_solutions_block" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "entities_same_as" CASCADE;
  DROP TABLE "entities" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "practice_areas_highlights" CASCADE;
  DROP TABLE "practice_areas_capabilities" CASCADE;
  DROP TABLE "practice_areas_faqs" CASCADE;
  DROP TABLE "practice_areas" CASCADE;
  DROP TABLE "_practice_areas_v_version_highlights" CASCADE;
  DROP TABLE "_practice_areas_v_version_capabilities" CASCADE;
  DROP TABLE "_practice_areas_v_version_faqs" CASCADE;
  DROP TABLE "_practice_areas_v" CASCADE;
  DROP TABLE "cases" CASCADE;
  DROP TABLE "cases_rels" CASCADE;
  DROP TABLE "_cases_v" CASCADE;
  DROP TABLE "_cases_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "vacancies" CASCADE;
  DROP TABLE "team_practice_areas" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "header_social_links" CASCADE;
  DROP TABLE "header_nav_items_sub_menu_nested_sub_menu" CASCADE;
  DROP TABLE "header_nav_items_sub_menu" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_nav_columns_links" CASCADE;
  DROP TABLE "footer_nav_columns" CASCADE;
  DROP TABLE "footer_addresses" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "page_banners" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_cases_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_practice_areas_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_testimonials_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_cases_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_practice_areas_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_testimonials_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_practice_area_id_practice_areas_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_role_id_roles_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_practice_area_id_practice_areas_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_tags_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_practice_area_id_practice_areas_id_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_tags_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_pages_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_practice_areas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_entities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_practice_areas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_vacancies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_practice_areas_hero_media_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_subscribe_bg_media_id_media_id_fk";
  
  DROP INDEX "pages_rels_cases_id_idx";
  DROP INDEX "pages_rels_practice_areas_id_idx";
  DROP INDEX "pages_rels_testimonials_id_idx";
  DROP INDEX "_pages_v_rels_cases_id_idx";
  DROP INDEX "_pages_v_rels_practice_areas_id_idx";
  DROP INDEX "_pages_v_rels_testimonials_id_idx";
  DROP INDEX "categories_practice_area_idx";
  DROP INDEX "users_role_idx";
  DROP INDEX "posts_practice_area_idx";
  DROP INDEX "posts_rels_tags_id_idx";
  DROP INDEX "_posts_v_version_version_practice_area_idx";
  DROP INDEX "_posts_v_rels_tags_id_idx";
  DROP INDEX "search_rels_pages_id_idx";
  DROP INDEX "search_rels_practice_areas_id_idx";
  DROP INDEX "payload_locked_documents_rels_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_roles_id_idx";
  DROP INDEX "payload_locked_documents_rels_entities_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_practice_areas_id_idx";
  DROP INDEX "payload_locked_documents_rels_cases_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_vacancies_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_id_idx";
  DROP INDEX "header_practice_areas_hero_media_idx";
  DROP INDEX "footer_subscribe_bg_media_idx";
  ALTER TABLE "posts_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  ALTER TABLE "pages" DROP COLUMN "hero_title";
  ALTER TABLE "pages" DROP COLUMN "hero_inner_title";
  ALTER TABLE "pages" DROP COLUMN "enable_subscribe_banner";
  ALTER TABLE "pages_rels" DROP COLUMN "cases_id";
  ALTER TABLE "pages_rels" DROP COLUMN "practice_areas_id";
  ALTER TABLE "pages_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_inner_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_enable_subscribe_banner";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "cases_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "practice_areas_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "categories" DROP COLUMN "practice_area_id";
  ALTER TABLE "users" DROP COLUMN "role_id";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "practice_area_id";
  ALTER TABLE "posts" DROP COLUMN "post_type";
  ALTER TABLE "posts_rels" DROP COLUMN "tags_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_practice_area_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_post_type";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "search_rels" DROP COLUMN "pages_id";
  ALTER TABLE "search_rels" DROP COLUMN "practice_areas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "roles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "entities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "practice_areas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "vacancies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_id";
  ALTER TABLE "header" DROP COLUMN "top_bar_address";
  ALTER TABLE "header" DROP COLUMN "top_bar_email";
  ALTER TABLE "header" DROP COLUMN "offcanvas_description";
  ALTER TABLE "header" DROP COLUMN "cta_button_text";
  ALTER TABLE "header" DROP COLUMN "cta_button_link";
  ALTER TABLE "header" DROP COLUMN "practice_areas_hero_media_id";
  ALTER TABLE "footer" DROP COLUMN "flavor_description";
  ALTER TABLE "footer" DROP COLUMN "head_office_address";
  ALTER TABLE "footer" DROP COLUMN "branch_office_address";
  ALTER TABLE "footer" DROP COLUMN "copyright";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";
  ALTER TABLE "footer" DROP COLUMN "subscribe_bg_media_id";
  
  
  
  DROP TYPE "public"."enum_pages_blocks_services_block_populate_by";
  DROP TYPE "public"."enum_pages_blocks_testimonials_block_populate_by";
  DROP TYPE "public"."enum_pages_blocks_solutions_block_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_blog_archive_block_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_blog_archive_block_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_block_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_services_block_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_block_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_solutions_block_items_icon";
  DROP TYPE "public"."enum_entities_schema_type";
  DROP TYPE "public"."enum_testimonials_source";
  DROP TYPE "public"."enum_practice_areas_icon";
  DROP TYPE "public"."enum_practice_areas_status";
  DROP TYPE "public"."enum__practice_areas_v_version_icon";
  DROP TYPE "public"."enum__practice_areas_v_version_status";
  DROP TYPE "public"."enum_cases_status";
  DROP TYPE "public"."enum__cases_v_version_status";
  DROP TYPE "public"."enum_posts_post_type";
  DROP TYPE "public"."enum__posts_v_version_post_type";
  DROP TYPE "public"."enum_vacancies_employment_type";
  DROP TYPE "public"."enum_team_job_role";
  DROP TYPE "public"."enum_header_social_links_platform";
  DROP TYPE "public"."enum_header_nav_items_sub_menu_nested_sub_menu_link_type";
  DROP TYPE "public"."enum_header_nav_items_sub_menu_link_type";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_footer_nav_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";`)
}
