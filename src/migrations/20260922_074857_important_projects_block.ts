import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_key_projects_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_pages_blocks_key_projects_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_key_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum___pages_v_blocks_key_projects_v_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum___pages_v_blocks_key_projects_v_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum___pages_v_blocks_key_projects_v_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_key_projects_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum_projects_blocks_key_projects_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum_projects_blocks_key_projects_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum___projects_v_blocks_key_projects_v_links_link_type" AS ENUM('reference', 'custom', 'mailto', 'tel', 'download');
  CREATE TYPE "public"."enum___projects_v_blocks_key_projects_v_links_link_appearance" AS ENUM('default', 'outline', 'plain');
  CREATE TYPE "public"."enum___projects_v_blocks_key_projects_v_background" AS ENUM('none', 'light', 'dark');
  CREATE TABLE "pages_blocks_key_projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_key_projects_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_key_projects_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_key_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_key_projects_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"logos_id" integer
  );
  
  CREATE TABLE "__pages_v_blocks_key_projects_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_blocks_key_projects_v_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_blocks_key_projects_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_blocks_key_projects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"background" "enum___pages_v_blocks_key_projects_v_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"logos_id" integer
  );
  
  CREATE TABLE "projects_blocks_key_projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_key_projects_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_key_projects_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "projects_blocks_key_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"background" "enum_projects_blocks_key_projects_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "__projects_v_blocks_key_projects_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___projects_v_blocks_key_projects_v_links_link_type" DEFAULT 'reference',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_mailto" varchar,
  	"link_tel" varchar,
  	"link_media_id" integer,
  	"link_anchor" varchar,
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum___projects_v_blocks_key_projects_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__projects_v_blocks_key_projects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"background" "enum___projects_v_blocks_key_projects_v_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "projects_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "projects_rels" ADD COLUMN "logos_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "logos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "logos_id" integer;
  ALTER TABLE "pages_blocks_key_projects_links" ADD CONSTRAINT "pages_blocks_key_projects_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_key_projects_links" ADD CONSTRAINT "pages_blocks_key_projects_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_key_projects_links" ADD CONSTRAINT "pages_blocks_key_projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_key_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_key_projects" ADD CONSTRAINT "pages_blocks_key_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks_key_projects_v_links" ADD CONSTRAINT "__pages_v_blocks_key_projects_v_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks_key_projects_v_links" ADD CONSTRAINT "__pages_v_blocks_key_projects_v_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks_key_projects_v_links" ADD CONSTRAINT "__pages_v_blocks_key_projects_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_blocks_key_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks_key_projects_v" ADD CONSTRAINT "__pages_v_blocks_key_projects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_projects_links" ADD CONSTRAINT "projects_blocks_key_projects_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_projects_links" ADD CONSTRAINT "projects_blocks_key_projects_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_projects_links" ADD CONSTRAINT "projects_blocks_key_projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_key_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_projects" ADD CONSTRAINT "projects_blocks_key_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__projects_v_blocks_key_projects_v_links" ADD CONSTRAINT "__projects_v_blocks_key_projects_v_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__projects_v_blocks_key_projects_v_links" ADD CONSTRAINT "__projects_v_blocks_key_projects_v_links_link_media_id_media_id_fk" FOREIGN KEY ("link_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__projects_v_blocks_key_projects_v_links" ADD CONSTRAINT "__projects_v_blocks_key_projects_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__projects_v_blocks_key_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__projects_v_blocks_key_projects_v" ADD CONSTRAINT "__projects_v_blocks_key_projects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "logos" ADD CONSTRAINT "logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_key_projects_links_order_idx" ON "pages_blocks_key_projects_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_projects_links_parent_id_idx" ON "pages_blocks_key_projects_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_projects_links_link_link_reference_idx" ON "pages_blocks_key_projects_links" USING btree ("link_reference_id");
  CREATE INDEX "pages_blocks_key_projects_links_link_link_media_idx" ON "pages_blocks_key_projects_links" USING btree ("link_media_id");
  CREATE INDEX "pages_blocks_key_projects_order_idx" ON "pages_blocks_key_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_projects_parent_id_idx" ON "pages_blocks_key_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_projects_path_idx" ON "pages_blocks_key_projects" USING btree ("_path");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_logos_id_idx" ON "pages_rels" USING btree ("logos_id");
  CREATE INDEX "__pages_v_blocks_key_projects_v_links_order_idx" ON "__pages_v_blocks_key_projects_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_blocks_key_projects_v_links_parent_id_idx" ON "__pages_v_blocks_key_projects_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_blocks_key_projects_v_links_link_link_referenc_idx" ON "__pages_v_blocks_key_projects_v_links" USING btree ("link_reference_id");
  CREATE INDEX "__pages_v_blocks_key_projects_v_links_link_link_media_idx" ON "__pages_v_blocks_key_projects_v_links" USING btree ("link_media_id");
  CREATE INDEX "__pages_v_blocks_key_projects_v_order_idx" ON "__pages_v_blocks_key_projects_v" USING btree ("_order");
  CREATE INDEX "__pages_v_blocks_key_projects_v_parent_id_idx" ON "__pages_v_blocks_key_projects_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_blocks_key_projects_v_path_idx" ON "__pages_v_blocks_key_projects_v" USING btree ("_path");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_logos_id_idx" ON "_pages_v_rels" USING btree ("logos_id");
  CREATE INDEX "projects_blocks_key_projects_links_order_idx" ON "projects_blocks_key_projects_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_key_projects_links_parent_id_idx" ON "projects_blocks_key_projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_key_projects_links_link_link_reference_idx" ON "projects_blocks_key_projects_links" USING btree ("link_reference_id");
  CREATE INDEX "projects_blocks_key_projects_links_link_link_media_idx" ON "projects_blocks_key_projects_links" USING btree ("link_media_id");
  CREATE INDEX "projects_blocks_key_projects_order_idx" ON "projects_blocks_key_projects" USING btree ("_order");
  CREATE INDEX "projects_blocks_key_projects_parent_id_idx" ON "projects_blocks_key_projects" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_key_projects_path_idx" ON "projects_blocks_key_projects" USING btree ("_path");
  CREATE INDEX "__projects_v_blocks_key_projects_v_links_order_idx" ON "__projects_v_blocks_key_projects_v_links" USING btree ("_order");
  CREATE INDEX "__projects_v_blocks_key_projects_v_links_parent_id_idx" ON "__projects_v_blocks_key_projects_v_links" USING btree ("_parent_id");
  CREATE INDEX "__projects_v_blocks_key_projects_v_links_link_link_refer_idx" ON "__projects_v_blocks_key_projects_v_links" USING btree ("link_reference_id");
  CREATE INDEX "__projects_v_blocks_key_projects_v_links_link_link_media_idx" ON "__projects_v_blocks_key_projects_v_links" USING btree ("link_media_id");
  CREATE INDEX "__projects_v_blocks_key_projects_v_order_idx" ON "__projects_v_blocks_key_projects_v" USING btree ("_order");
  CREATE INDEX "__projects_v_blocks_key_projects_v_parent_id_idx" ON "__projects_v_blocks_key_projects_v" USING btree ("_parent_id");
  CREATE INDEX "__projects_v_blocks_key_projects_v_path_idx" ON "__projects_v_blocks_key_projects_v" USING btree ("_path");
  CREATE INDEX "logos_logo_idx" ON "logos" USING btree ("logo_id");
  CREATE INDEX "logos_updated_at_idx" ON "logos" USING btree ("updated_at");
  CREATE INDEX "logos_created_at_idx" ON "logos" USING btree ("created_at");
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_logos_id_idx" ON "projects_rels" USING btree ("logos_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_logos_id_idx" ON "_projects_v_rels" USING btree ("logos_id");
  CREATE INDEX "payload_locked_documents_rels_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("logos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_key_projects_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_key_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__pages_v_blocks_key_projects_v_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__pages_v_blocks_key_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_key_projects_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_key_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__projects_v_blocks_key_projects_v_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__projects_v_blocks_key_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "logos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_key_projects_links" CASCADE;
  DROP TABLE "pages_blocks_key_projects" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "__pages_v_blocks_key_projects_v_links" CASCADE;
  DROP TABLE "__pages_v_blocks_key_projects_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "projects_blocks_key_projects_links" CASCADE;
  DROP TABLE "projects_blocks_key_projects" CASCADE;
  DROP TABLE "__projects_v_blocks_key_projects_v_links" CASCADE;
  DROP TABLE "__projects_v_blocks_key_projects_v" CASCADE;
  DROP TABLE "logos" CASCADE;
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_projects_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_logos_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_projects_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_logos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_logos_fk";
  
  DROP INDEX "projects_rels_projects_id_idx";
  DROP INDEX "projects_rels_logos_id_idx";
  DROP INDEX "_projects_v_rels_projects_id_idx";
  DROP INDEX "_projects_v_rels_logos_id_idx";
  DROP INDEX "payload_locked_documents_rels_logos_id_idx";
  ALTER TABLE "projects_rels" DROP COLUMN "projects_id";
  ALTER TABLE "projects_rels" DROP COLUMN "logos_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "projects_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "logos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "logos_id";
  DROP TYPE "public"."enum_pages_blocks_key_projects_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_key_projects_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_key_projects_background";
  DROP TYPE "public"."enum___pages_v_blocks_key_projects_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_blocks_key_projects_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_blocks_key_projects_v_background";
  DROP TYPE "public"."enum_projects_blocks_key_projects_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_key_projects_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_key_projects_background";
  DROP TYPE "public"."enum___projects_v_blocks_key_projects_v_links_link_type";
  DROP TYPE "public"."enum___projects_v_blocks_key_projects_v_links_link_appearance";
  DROP TYPE "public"."enum___projects_v_blocks_key_projects_v_background";`)
}
