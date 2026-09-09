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
  CREATE TYPE "public"."enum_pages_blocks_assignments_background" AS ENUM('none', 'light', 'dark');
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
  CREATE TYPE "public"."enum__pages_v_blocks_assignments_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_assignments_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_assignments_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_assignments_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum_assignments_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_assignments_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_assignments_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_blocks_assignments_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_assignments_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__assignments_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__assignments_v_blocks_hero_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__assignments_v_blocks_hero_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_blocks_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_blocks_media_block_width" AS ENUM('content', 'full');
  CREATE TYPE "public"."enum__assignments_v_blocks_media_block_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_blocks_columns_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_blocks_call_to_action_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum__assignments_v_blocks_call_to_action_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum__assignments_v_blocks_call_to_action_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_blocks_assignments_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__assignments_v_version_status" AS ENUM('draft', 'published');
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
  
  CREATE TABLE "pages_blocks_assignments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Opdrachten',
  	"intro" varchar,
  	"limit" numeric,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_assignments_background" DEFAULT 'none',
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
  
  CREATE TABLE "_pages_v_blocks_assignments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Opdrachten',
  	"intro" varchar,
  	"limit" numeric,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_assignments_background" DEFAULT 'none',
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
  
  CREATE TABLE "assignments_competencies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "assignments_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "assignments_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_assignments_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_assignments_blocks_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "assignments_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_hero_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_rich_text_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum_assignments_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_media_block_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "assignments_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_columns_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_assignments_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_assignments_blocks_call_to_action_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "assignments_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_call_to_action_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments_blocks_assignments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Opdrachten',
  	"intro" varchar,
  	"limit" numeric,
  	"anchor" varchar,
  	"background" "enum_assignments_blocks_assignments_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "assignments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"course" varchar,
  	"period" varchar,
  	"summary" varchar,
  	"cover_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_noindex" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_assignments_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_assignments_v_version_competencies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_assignments_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__assignments_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__assignments_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_hero_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_rich_text_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"width" "enum__assignments_v_blocks_media_block_width" DEFAULT 'content',
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_media_block_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_columns_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__assignments_v_blocks_call_to_action_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum__assignments_v_blocks_call_to_action_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_call_to_action_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v_blocks_assignments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Opdrachten',
  	"intro" varchar,
  	"limit" numeric,
  	"anchor" varchar,
  	"background" "enum__assignments_v_blocks_assignments_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_assignments_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_course" varchar,
  	"version_period" varchar,
  	"version_summary" varchar,
  	"version_cover_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_noindex" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__assignments_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
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
  	"assignments_id" integer,
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
  ALTER TABLE "pages_blocks_assignments" ADD CONSTRAINT "pages_blocks_assignments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_pages_v_blocks_assignments" ADD CONSTRAINT "_pages_v_blocks_assignments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_competencies" ADD CONSTRAINT "assignments_competencies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_links" ADD CONSTRAINT "assignments_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_hero_links" ADD CONSTRAINT "assignments_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_hero_links" ADD CONSTRAINT "assignments_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_hero_links" ADD CONSTRAINT "assignments_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_hero" ADD CONSTRAINT "assignments_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_hero" ADD CONSTRAINT "assignments_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_rich_text" ADD CONSTRAINT "assignments_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_media_block" ADD CONSTRAINT "assignments_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_media_block" ADD CONSTRAINT "assignments_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_columns_columns" ADD CONSTRAINT "assignments_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_columns" ADD CONSTRAINT "assignments_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_call_to_action_links" ADD CONSTRAINT "assignments_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_call_to_action_links" ADD CONSTRAINT "assignments_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments_blocks_call_to_action_links" ADD CONSTRAINT "assignments_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_call_to_action" ADD CONSTRAINT "assignments_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments_blocks_assignments" ADD CONSTRAINT "assignments_blocks_assignments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assignments" ADD CONSTRAINT "assignments_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assignments" ADD CONSTRAINT "assignments_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_version_competencies" ADD CONSTRAINT "_assignments_v_version_competencies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_version_links" ADD CONSTRAINT "_assignments_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_hero_links" ADD CONSTRAINT "_assignments_v_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_hero_links" ADD CONSTRAINT "_assignments_v_blocks_hero_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_hero_links" ADD CONSTRAINT "_assignments_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_hero" ADD CONSTRAINT "_assignments_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_hero" ADD CONSTRAINT "_assignments_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_rich_text" ADD CONSTRAINT "_assignments_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_media_block" ADD CONSTRAINT "_assignments_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_media_block" ADD CONSTRAINT "_assignments_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_columns_columns" ADD CONSTRAINT "_assignments_v_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_columns" ADD CONSTRAINT "_assignments_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_call_to_action_links" ADD CONSTRAINT "_assignments_v_blocks_call_to_action_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_call_to_action_links" ADD CONSTRAINT "_assignments_v_blocks_call_to_action_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_call_to_action_links" ADD CONSTRAINT "_assignments_v_blocks_call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_call_to_action" ADD CONSTRAINT "_assignments_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v_blocks_assignments" ADD CONSTRAINT "_assignments_v_blocks_assignments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_assignments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_assignments_v" ADD CONSTRAINT "_assignments_v_parent_id_assignments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assignments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v" ADD CONSTRAINT "_assignments_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_assignments_v" ADD CONSTRAINT "_assignments_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assignments_fk" FOREIGN KEY ("assignments_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "pages_blocks_assignments_order_idx" ON "pages_blocks_assignments" USING btree ("_order");
  CREATE INDEX "pages_blocks_assignments_parent_id_idx" ON "pages_blocks_assignments" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_assignments_path_idx" ON "pages_blocks_assignments" USING btree ("_path");
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
  CREATE INDEX "_pages_v_blocks_assignments_order_idx" ON "_pages_v_blocks_assignments" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_assignments_parent_id_idx" ON "_pages_v_blocks_assignments" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_assignments_path_idx" ON "_pages_v_blocks_assignments" USING btree ("_path");
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
  CREATE INDEX "assignments_competencies_order_idx" ON "assignments_competencies" USING btree ("_order");
  CREATE INDEX "assignments_competencies_parent_id_idx" ON "assignments_competencies" USING btree ("_parent_id");
  CREATE INDEX "assignments_links_order_idx" ON "assignments_links" USING btree ("_order");
  CREATE INDEX "assignments_links_parent_id_idx" ON "assignments_links" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_hero_links_order_idx" ON "assignments_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "assignments_blocks_hero_links_parent_id_idx" ON "assignments_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_hero_links_link_link_reference_idx" ON "assignments_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "assignments_blocks_hero_links_link_link_media_idx" ON "assignments_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "assignments_blocks_hero_order_idx" ON "assignments_blocks_hero" USING btree ("_order");
  CREATE INDEX "assignments_blocks_hero_parent_id_idx" ON "assignments_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_hero_path_idx" ON "assignments_blocks_hero" USING btree ("_path");
  CREATE INDEX "assignments_blocks_hero_image_idx" ON "assignments_blocks_hero" USING btree ("image_id");
  CREATE INDEX "assignments_blocks_rich_text_order_idx" ON "assignments_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "assignments_blocks_rich_text_parent_id_idx" ON "assignments_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_rich_text_path_idx" ON "assignments_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "assignments_blocks_media_block_order_idx" ON "assignments_blocks_media_block" USING btree ("_order");
  CREATE INDEX "assignments_blocks_media_block_parent_id_idx" ON "assignments_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_media_block_path_idx" ON "assignments_blocks_media_block" USING btree ("_path");
  CREATE INDEX "assignments_blocks_media_block_media_idx" ON "assignments_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "assignments_blocks_columns_columns_order_idx" ON "assignments_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "assignments_blocks_columns_columns_parent_id_idx" ON "assignments_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_columns_order_idx" ON "assignments_blocks_columns" USING btree ("_order");
  CREATE INDEX "assignments_blocks_columns_parent_id_idx" ON "assignments_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_columns_path_idx" ON "assignments_blocks_columns" USING btree ("_path");
  CREATE INDEX "assignments_blocks_call_to_action_links_order_idx" ON "assignments_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "assignments_blocks_call_to_action_links_parent_id_idx" ON "assignments_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_call_to_action_links_link_link_refere_idx" ON "assignments_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "assignments_blocks_call_to_action_links_link_link_media_idx" ON "assignments_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "assignments_blocks_call_to_action_order_idx" ON "assignments_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "assignments_blocks_call_to_action_parent_id_idx" ON "assignments_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_call_to_action_path_idx" ON "assignments_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "assignments_blocks_assignments_order_idx" ON "assignments_blocks_assignments" USING btree ("_order");
  CREATE INDEX "assignments_blocks_assignments_parent_id_idx" ON "assignments_blocks_assignments" USING btree ("_parent_id");
  CREATE INDEX "assignments_blocks_assignments_path_idx" ON "assignments_blocks_assignments" USING btree ("_path");
  CREATE INDEX "assignments_cover_idx" ON "assignments" USING btree ("cover_id");
  CREATE INDEX "assignments_meta_meta_image_idx" ON "assignments" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "assignments_slug_idx" ON "assignments" USING btree ("slug");
  CREATE INDEX "assignments_updated_at_idx" ON "assignments" USING btree ("updated_at");
  CREATE INDEX "assignments_created_at_idx" ON "assignments" USING btree ("created_at");
  CREATE INDEX "assignments__status_idx" ON "assignments" USING btree ("_status");
  CREATE INDEX "_assignments_v_version_competencies_order_idx" ON "_assignments_v_version_competencies" USING btree ("_order");
  CREATE INDEX "_assignments_v_version_competencies_parent_id_idx" ON "_assignments_v_version_competencies" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_version_links_order_idx" ON "_assignments_v_version_links" USING btree ("_order");
  CREATE INDEX "_assignments_v_version_links_parent_id_idx" ON "_assignments_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_hero_links_order_idx" ON "_assignments_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_hero_links_parent_id_idx" ON "_assignments_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_hero_links_link_link_reference_idx" ON "_assignments_v_blocks_hero_links" USING btree ("link_reference_id");
  CREATE INDEX "_assignments_v_blocks_hero_links_link_link_media_idx" ON "_assignments_v_blocks_hero_links" USING btree ("link_media_id");
  CREATE INDEX "_assignments_v_blocks_hero_order_idx" ON "_assignments_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_hero_parent_id_idx" ON "_assignments_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_hero_path_idx" ON "_assignments_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_assignments_v_blocks_hero_image_idx" ON "_assignments_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_assignments_v_blocks_rich_text_order_idx" ON "_assignments_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_rich_text_parent_id_idx" ON "_assignments_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_rich_text_path_idx" ON "_assignments_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_assignments_v_blocks_media_block_order_idx" ON "_assignments_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_media_block_parent_id_idx" ON "_assignments_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_media_block_path_idx" ON "_assignments_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_assignments_v_blocks_media_block_media_idx" ON "_assignments_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_assignments_v_blocks_columns_columns_order_idx" ON "_assignments_v_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_columns_columns_parent_id_idx" ON "_assignments_v_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_columns_order_idx" ON "_assignments_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_columns_parent_id_idx" ON "_assignments_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_columns_path_idx" ON "_assignments_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_assignments_v_blocks_call_to_action_links_order_idx" ON "_assignments_v_blocks_call_to_action_links" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_call_to_action_links_parent_id_idx" ON "_assignments_v_blocks_call_to_action_links" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_call_to_action_links_link_link_ref_idx" ON "_assignments_v_blocks_call_to_action_links" USING btree ("link_reference_id");
  CREATE INDEX "_assignments_v_blocks_call_to_action_links_link_link_med_idx" ON "_assignments_v_blocks_call_to_action_links" USING btree ("link_media_id");
  CREATE INDEX "_assignments_v_blocks_call_to_action_order_idx" ON "_assignments_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_call_to_action_parent_id_idx" ON "_assignments_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_call_to_action_path_idx" ON "_assignments_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_assignments_v_blocks_assignments_order_idx" ON "_assignments_v_blocks_assignments" USING btree ("_order");
  CREATE INDEX "_assignments_v_blocks_assignments_parent_id_idx" ON "_assignments_v_blocks_assignments" USING btree ("_parent_id");
  CREATE INDEX "_assignments_v_blocks_assignments_path_idx" ON "_assignments_v_blocks_assignments" USING btree ("_path");
  CREATE INDEX "_assignments_v_parent_idx" ON "_assignments_v" USING btree ("parent_id");
  CREATE INDEX "_assignments_v_version_version_cover_idx" ON "_assignments_v" USING btree ("version_cover_id");
  CREATE INDEX "_assignments_v_version_meta_version_meta_image_idx" ON "_assignments_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_assignments_v_version_version_slug_idx" ON "_assignments_v" USING btree ("version_slug");
  CREATE INDEX "_assignments_v_version_version_updated_at_idx" ON "_assignments_v" USING btree ("version_updated_at");
  CREATE INDEX "_assignments_v_version_version_created_at_idx" ON "_assignments_v" USING btree ("version_created_at");
  CREATE INDEX "_assignments_v_version_version__status_idx" ON "_assignments_v" USING btree ("version__status");
  CREATE INDEX "_assignments_v_created_at_idx" ON "_assignments_v" USING btree ("created_at");
  CREATE INDEX "_assignments_v_updated_at_idx" ON "_assignments_v" USING btree ("updated_at");
  CREATE INDEX "_assignments_v_latest_idx" ON "_assignments_v" USING btree ("latest");
  CREATE INDEX "_assignments_v_autosave_idx" ON "_assignments_v" USING btree ("autosave");
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
  CREATE INDEX "payload_locked_documents_rels_assignments_id_idx" ON "payload_locked_documents_rels" USING btree ("assignments_id");
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
  DROP TABLE "pages_blocks_assignments" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_links" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v_blocks_assignments" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "assignments_competencies" CASCADE;
  DROP TABLE "assignments_links" CASCADE;
  DROP TABLE "assignments_blocks_hero_links" CASCADE;
  DROP TABLE "assignments_blocks_hero" CASCADE;
  DROP TABLE "assignments_blocks_rich_text" CASCADE;
  DROP TABLE "assignments_blocks_media_block" CASCADE;
  DROP TABLE "assignments_blocks_columns_columns" CASCADE;
  DROP TABLE "assignments_blocks_columns" CASCADE;
  DROP TABLE "assignments_blocks_call_to_action_links" CASCADE;
  DROP TABLE "assignments_blocks_call_to_action" CASCADE;
  DROP TABLE "assignments_blocks_assignments" CASCADE;
  DROP TABLE "assignments" CASCADE;
  DROP TABLE "_assignments_v_version_competencies" CASCADE;
  DROP TABLE "_assignments_v_version_links" CASCADE;
  DROP TABLE "_assignments_v_blocks_hero_links" CASCADE;
  DROP TABLE "_assignments_v_blocks_hero" CASCADE;
  DROP TABLE "_assignments_v_blocks_rich_text" CASCADE;
  DROP TABLE "_assignments_v_blocks_media_block" CASCADE;
  DROP TABLE "_assignments_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_assignments_v_blocks_columns" CASCADE;
  DROP TABLE "_assignments_v_blocks_call_to_action_links" CASCADE;
  DROP TABLE "_assignments_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_assignments_v_blocks_assignments" CASCADE;
  DROP TABLE "_assignments_v" CASCADE;
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
  DROP TYPE "public"."enum_pages_blocks_assignments_background";
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
  DROP TYPE "public"."enum__pages_v_blocks_assignments_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_assignments_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_assignments_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_assignments_blocks_hero_background";
  DROP TYPE "public"."enum_assignments_blocks_rich_text_background";
  DROP TYPE "public"."enum_assignments_blocks_media_block_width";
  DROP TYPE "public"."enum_assignments_blocks_media_block_background";
  DROP TYPE "public"."enum_assignments_blocks_columns_background";
  DROP TYPE "public"."enum_assignments_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum_assignments_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum_assignments_blocks_call_to_action_background";
  DROP TYPE "public"."enum_assignments_blocks_assignments_background";
  DROP TYPE "public"."enum_assignments_status";
  DROP TYPE "public"."enum__assignments_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__assignments_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__assignments_v_blocks_hero_background";
  DROP TYPE "public"."enum__assignments_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__assignments_v_blocks_media_block_width";
  DROP TYPE "public"."enum__assignments_v_blocks_media_block_background";
  DROP TYPE "public"."enum__assignments_v_blocks_columns_background";
  DROP TYPE "public"."enum__assignments_v_blocks_call_to_action_links_link_type";
  DROP TYPE "public"."enum__assignments_v_blocks_call_to_action_links_link_appearance";
  DROP TYPE "public"."enum__assignments_v_blocks_call_to_action_background";
  DROP TYPE "public"."enum__assignments_v_blocks_assignments_background";
  DROP TYPE "public"."enum__assignments_v_version_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}
