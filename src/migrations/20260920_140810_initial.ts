import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_projects_source" AS ENUM('featured', 'all', 'kind');
  CREATE TYPE "public"."enum_pages_blocks_projects_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum_pages_blocks_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_source" AS ENUM('featured', 'all', 'kind');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_projects_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum_projects_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_projects_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_projects_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_projects_source" AS ENUM('featured', 'all', 'kind');
  CREATE TYPE "public"."enum_projects_blocks_projects_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum_projects_blocks_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_links_type" AS ENUM('repo', 'demo', 'report', 'design', 'video', 'package', 'article', 'other');
  CREATE TYPE "public"."enum_projects_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum_projects_project_status" AS ENUM('in-progress', 'completed', 'shipped', 'archived');
  CREATE TYPE "public"."enum_projects_visibility" AS ENUM('public', 'anonymised', 'on-request');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum__projects_v_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__projects_v_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__projects_v_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_source" AS ENUM('featured', 'all', 'kind');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__projects_v_version_links_type" AS ENUM('repo', 'demo', 'report', 'design', 'video', 'package', 'article', 'other');
  CREATE TYPE "public"."enum__projects_v_version_kind" AS ENUM('school', 'work', 'side');
  CREATE TYPE "public"."enum__projects_v_version_project_status" AS ENUM('in-progress', 'completed', 'shipped', 'archived');
  CREATE TYPE "public"."enum__projects_v_version_visibility" AS ENUM('public', 'anonymised', 'on-request');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_technologies_category" AS ENUM('language', 'framework', 'database', 'infrastructure', 'tooling', 'design');
  CREATE TYPE "public"."enum_organisations_type" AS ENUM('employer', 'client', 'school');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_hero_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_rich_text_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum_pages_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum_pages_blocks_media_block_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_columns_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_call_to_action_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_call_to_action_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Projects',
  	"intro" varchar,
  	"source" "enum_pages_blocks_projects_source" DEFAULT 'featured',
  	"kind" "enum_pages_blocks_projects_kind",
  	"limit" numeric,
  	"show_link_to_overview" boolean DEFAULT true,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_projects_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_noindex" boolean,
  	"parent_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"path" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_hero_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_rich_text_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum__pages_v_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_media_block_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_columns_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_call_to_action_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_call_to_action_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Projects',
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_projects_source" DEFAULT 'featured',
  	"kind" "enum__pages_v_blocks_projects_kind",
  	"limit" numeric,
  	"show_link_to_overview" boolean DEFAULT true,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_projects_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_noindex" boolean,
  	"version_parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "projects_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_hero_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_rich_text_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum_projects_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum_projects_blocks_media_block_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "projects_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_columns_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_call_to_action_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "projects_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_call_to_action_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Projects',
  	"intro" varchar,
  	"source" "enum_projects_blocks_projects_source" DEFAULT 'featured',
  	"kind" "enum_projects_blocks_projects_kind",
  	"limit" numeric,
  	"show_link_to_overview" boolean DEFAULT true,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_projects_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_projects_links_type" DEFAULT 'repo',
  	"url" varchar
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"label" varchar
  );
  
  CREATE TABLE "projects_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" varchar,
  	"source_role" varchar,
  	"quote" varchar,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum_projects_kind" DEFAULT 'school',
  	"project_status" "enum_projects_project_status" DEFAULT 'completed',
  	"tagline" varchar,
  	"summary" varchar,
  	"cover_id" integer,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"role" varchar,
  	"team_size" numeric,
  	"course_id" integer,
  	"organisation_id" integer,
  	"problem" jsonb,
  	"approach" jsonb,
  	"my_contribution" jsonb,
  	"outcome" jsonb,
  	"reflection" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_noindex" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility" "enum_projects_visibility" DEFAULT 'public',
  	"client_alias" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"technologies_id" integer
  );
  
  CREATE TABLE "_projects_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_hero_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_rich_text_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum__projects_v_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_media_block_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_columns_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_call_to_action_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_call_to_action_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Projects',
  	"intro" varchar,
  	"source" "enum__projects_v_blocks_projects_source" DEFAULT 'featured',
  	"kind" "enum__projects_v_blocks_projects_kind",
  	"limit" numeric,
  	"show_link_to_overview" boolean DEFAULT true,
  	"anchor" varchar,
  	"background" "enum__projects_v_blocks_projects_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__projects_v_version_links_type" DEFAULT 'repo',
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" varchar,
  	"source_role" varchar,
  	"quote" varchar,
  	"date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_kind" "enum__projects_v_version_kind" DEFAULT 'school',
  	"version_project_status" "enum__projects_v_version_project_status" DEFAULT 'completed',
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_cover_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_role" varchar,
  	"version_team_size" numeric,
  	"version_course_id" integer,
  	"version_organisation_id" integer,
  	"version_problem" jsonb,
  	"version_approach" jsonb,
  	"version_my_contribution" jsonb,
  	"version_outcome" jsonb,
  	"version_reflection" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_noindex" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_visibility" "enum__projects_v_version_visibility" DEFAULT 'public',
  	"version_client_alias" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"technologies_id" integer
  );
  
  CREATE TABLE "technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_technologies_category" DEFAULT 'framework' NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"semester" varchar,
  	"institution" varchar DEFAULT 'Fontys ICT',
  	"description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organisations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_organisations_type" DEFAULT 'client' NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"technologies_id" integer,
  	"courses_id" integer,
  	"organisations_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_title" varchar DEFAULT 'Portfolio',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns" ADD CONSTRAINT "pages_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_links" ADD CONSTRAINT "pages_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_links" ADD CONSTRAINT "pages_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_links" ADD CONSTRAINT "pages_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns" ADD CONSTRAINT "_pages_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_links" ADD CONSTRAINT "_pages_v_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_links" ADD CONSTRAINT "_pages_v_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_links" ADD CONSTRAINT "_pages_v_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_block" ADD CONSTRAINT "projects_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_block" ADD CONSTRAINT "projects_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns_columns" ADD CONSTRAINT "projects_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_links" ADD CONSTRAINT "projects_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_links" ADD CONSTRAINT "projects_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_links" ADD CONSTRAINT "projects_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action" ADD CONSTRAINT "projects_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_projects" ADD CONSTRAINT "projects_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_documents" ADD CONSTRAINT "projects_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_documents" ADD CONSTRAINT "projects_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_feedback" ADD CONSTRAINT "projects_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_links" ADD CONSTRAINT "_projects_v_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_links" ADD CONSTRAINT "_projects_v_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_links" ADD CONSTRAINT "_projects_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_block" ADD CONSTRAINT "_projects_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_block" ADD CONSTRAINT "_projects_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns_columns" ADD CONSTRAINT "_projects_v_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_links" ADD CONSTRAINT "_projects_v_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_links" ADD CONSTRAINT "_projects_v_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_links" ADD CONSTRAINT "_projects_v_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action" ADD CONSTRAINT "_projects_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_projects" ADD CONSTRAINT "_projects_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_documents" ADD CONSTRAINT "_projects_v_version_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_documents" ADD CONSTRAINT "_projects_v_version_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_feedback" ADD CONSTRAINT "_projects_v_version_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_course_id_courses_id_fk" FOREIGN KEY ("version_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_organisation_id_organisations_id_fk" FOREIGN KEY ("version_organisation_id") REFERENCES "public"."organisations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "technologies" ADD CONSTRAINT "technologies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organisations" ADD CONSTRAINT "organisations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organisations_fk" FOREIGN KEY ("organisations_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_reference_idx" ON "pages_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_media_idx" ON "pages_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_columns_columns_order_idx" ON "pages_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_columns_parent_id_idx" ON "pages_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_order_idx" ON "pages_blocks_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_parent_id_idx" ON "pages_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_path_idx" ON "pages_blocks_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_call_to_action_links_order_idx" ON "pages_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_links_parent_id_idx" ON "pages_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_links_link_link_reference_idx" ON "pages_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "pages_blocks_call_to_action_links_link_link_media_idx" ON "pages_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_link_link_reference_idx" ON "_pages_v_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "_pages_v_blocks_hero_links_link_link_media_idx" ON "_pages_v_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_columns_columns_order_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_columns_parent_id_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_order_idx" ON "_pages_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_parent_id_idx" ON "_pages_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_path_idx" ON "_pages_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_call_to_action_links_order_idx" ON "_pages_v_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_links_parent_id_idx" ON "_pages_v_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_links_link_link_reference_idx" ON "_pages_v_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_links_link_link_media_idx" ON "_pages_v_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "projects_blocks_hero_links_order_idx" ON "projects_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_links_parent_id_idx" ON "projects_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_links_link_link_reference_idx" ON "projects_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "projects_blocks_hero_links_link_link_media_idx" ON "projects_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_image_idx" ON "projects_blocks_hero" USING btree ("image_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_block_order_idx" ON "projects_blocks_media_block" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_block_parent_id_idx" ON "projects_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_block_path_idx" ON "projects_blocks_media_block" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_block_media_idx" ON "projects_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "projects_blocks_columns_columns_order_idx" ON "projects_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "projects_blocks_columns_columns_parent_id_idx" ON "projects_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_columns_order_idx" ON "projects_blocks_columns" USING btree ("_order");
  CREATE INDEX "projects_blocks_columns_parent_id_idx" ON "projects_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_columns_path_idx" ON "projects_blocks_columns" USING btree ("_path");
  CREATE INDEX "projects_blocks_call_to_action_links_order_idx" ON "projects_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_call_to_action_links_parent_id_idx" ON "projects_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_links_link_link_reference_idx" ON "projects_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "projects_blocks_call_to_action_links_link_link_media_idx" ON "projects_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "projects_blocks_call_to_action_order_idx" ON "projects_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "projects_blocks_call_to_action_parent_id_idx" ON "projects_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_path_idx" ON "projects_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "projects_blocks_projects_order_idx" ON "projects_blocks_projects" USING btree ("_order");
  CREATE INDEX "projects_blocks_projects_parent_id_idx" ON "projects_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_projects_path_idx" ON "projects_blocks_projects" USING btree ("_path");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE INDEX "projects_documents_order_idx" ON "projects_documents" USING btree ("_order");
  CREATE INDEX "projects_documents_parent_id_idx" ON "projects_documents" USING btree ("_parent_id");
  CREATE INDEX "projects_documents_file_idx" ON "projects_documents" USING btree ("file_id");
  CREATE INDEX "projects_feedback_order_idx" ON "projects_feedback" USING btree ("_order");
  CREATE INDEX "projects_feedback_parent_id_idx" ON "projects_feedback" USING btree ("_parent_id");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE INDEX "projects_course_idx" ON "projects" USING btree ("course_id");
  CREATE INDEX "projects_organisation_idx" ON "projects" USING btree ("organisation_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_technologies_id_idx" ON "projects_rels" USING btree ("technologies_id");
  CREATE INDEX "_projects_v_blocks_hero_links_order_idx" ON "_projects_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_links_parent_id_idx" ON "_projects_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_links_link_link_reference_idx" ON "_projects_v_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "_projects_v_blocks_hero_links_link_link_media_idx" ON "_projects_v_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_image_idx" ON "_projects_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_block_order_idx" ON "_projects_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_block_parent_id_idx" ON "_projects_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_block_path_idx" ON "_projects_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_block_media_idx" ON "_projects_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_projects_v_blocks_columns_columns_order_idx" ON "_projects_v_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_columns_columns_parent_id_idx" ON "_projects_v_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_columns_order_idx" ON "_projects_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_columns_parent_id_idx" ON "_projects_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_columns_path_idx" ON "_projects_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_call_to_action_links_order_idx" ON "_projects_v_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_call_to_action_links_parent_id_idx" ON "_projects_v_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_links_link_link_refere_idx" ON "_projects_v_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_links_link_link_media_idx" ON "_projects_v_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_order_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_call_to_action_parent_id_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_path_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_projects_order_idx" ON "_projects_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_projects_parent_id_idx" ON "_projects_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_path_idx" ON "_projects_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_documents_order_idx" ON "_projects_v_version_documents" USING btree ("_order");
  CREATE INDEX "_projects_v_version_documents_parent_id_idx" ON "_projects_v_version_documents" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_documents_file_idx" ON "_projects_v_version_documents" USING btree ("file_id");
  CREATE INDEX "_projects_v_version_feedback_order_idx" ON "_projects_v_version_feedback" USING btree ("_order");
  CREATE INDEX "_projects_v_version_feedback_parent_id_idx" ON "_projects_v_version_feedback" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_idx" ON "_projects_v" USING btree ("version_cover_id");
  CREATE INDEX "_projects_v_version_version_course_idx" ON "_projects_v" USING btree ("version_course_id");
  CREATE INDEX "_projects_v_version_version_organisation_idx" ON "_projects_v" USING btree ("version_organisation_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_technologies_id_idx" ON "_projects_v_rels" USING btree ("technologies_id");
  CREATE INDEX "technologies_logo_idx" ON "technologies" USING btree ("logo_id");
  CREATE UNIQUE INDEX "technologies_slug_idx" ON "technologies" USING btree ("slug");
  CREATE INDEX "technologies_updated_at_idx" ON "technologies" USING btree ("updated_at");
  CREATE INDEX "technologies_created_at_idx" ON "technologies" USING btree ("created_at");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "organisations_logo_idx" ON "organisations" USING btree ("logo_id");
  CREATE UNIQUE INDEX "organisations_slug_idx" ON "organisations" USING btree ("slug");
  CREATE INDEX "organisations_updated_at_idx" ON "organisations" USING btree ("updated_at");
  CREATE INDEX "organisations_created_at_idx" ON "organisations" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_organisations_id_idx" ON "payload_locked_documents_rels" USING btree ("organisations_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_link_reference_idx" ON "header_nav_items" USING btree ("link_reference_id");
  CREATE INDEX "header_nav_items_link_link_media_idx" ON "header_nav_items" USING btree ("link_media_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_link_link_reference_idx" ON "footer_nav_items" USING btree ("link_reference_id");
  CREATE INDEX "footer_nav_items_link_link_media_idx" ON "footer_nav_items" USING btree ("link_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_columns_columns" CASCADE;
  DROP TABLE "pages_blocks_columns" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_links" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_links" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v_blocks_projects" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "projects_blocks_hero_links" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_media_block" CASCADE;
  DROP TABLE "projects_blocks_columns_columns" CASCADE;
  DROP TABLE "projects_blocks_columns" CASCADE;
  DROP TABLE "projects_blocks_call_to_action_links" CASCADE;
  DROP TABLE "projects_blocks_call_to_action" CASCADE;
  DROP TABLE "projects_blocks_projects" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_documents" CASCADE;
  DROP TABLE "projects_feedback" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_links" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_media_block" CASCADE;
  DROP TABLE "_projects_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action_links" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_projects_v_blocks_projects" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v_version_documents" CASCADE;
  DROP TABLE "_projects_v_version_feedback" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "technologies" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "organisations" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_background";
  DROP TYPE "public"."enum_pages_blocks_media_block_width";
  DROP TYPE "public"."enum_pages_blocks_media_block_background";
  DROP TYPE "public"."enum_pages_blocks_columns_background";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_background";
  DROP TYPE "public"."enum_pages_blocks_projects_source";
  DROP TYPE "public"."enum_pages_blocks_projects_kind";
  DROP TYPE "public"."enum_pages_blocks_projects_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_width";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_columns_background";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_background";
  DROP TYPE "public"."enum__pages_v_blocks_projects_source";
  DROP TYPE "public"."enum__pages_v_blocks_projects_kind";
  DROP TYPE "public"."enum__pages_v_blocks_projects_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_hero_background";
  DROP TYPE "public"."enum_projects_blocks_rich_text_background";
  DROP TYPE "public"."enum_projects_blocks_media_block_width";
  DROP TYPE "public"."enum_projects_blocks_media_block_background";
  DROP TYPE "public"."enum_projects_blocks_columns_background";
  DROP TYPE "public"."enum_projects_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_call_to_action_background";
  DROP TYPE "public"."enum_projects_blocks_projects_source";
  DROP TYPE "public"."enum_projects_blocks_projects_kind";
  DROP TYPE "public"."enum_projects_blocks_projects_background";
  DROP TYPE "public"."enum_projects_links_type";
  DROP TYPE "public"."enum_projects_kind";
  DROP TYPE "public"."enum_projects_project_status";
  DROP TYPE "public"."enum_projects_visibility";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_hero_background";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__projects_v_blocks_media_block_width";
  DROP TYPE "public"."enum__projects_v_blocks_media_block_background";
  DROP TYPE "public"."enum__projects_v_blocks_columns_background";
  DROP TYPE "public"."enum__projects_v_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_call_to_action_background";
  DROP TYPE "public"."enum__projects_v_blocks_projects_source";
  DROP TYPE "public"."enum__projects_v_blocks_projects_kind";
  DROP TYPE "public"."enum__projects_v_blocks_projects_background";
  DROP TYPE "public"."enum__projects_v_version_links_type";
  DROP TYPE "public"."enum__projects_v_version_kind";
  DROP TYPE "public"."enum__projects_v_version_project_status";
  DROP TYPE "public"."enum__projects_v_version_visibility";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_technologies_category";
  DROP TYPE "public"."enum_organisations_type";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}
