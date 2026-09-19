import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_assignments_kind" AS ENUM('school', 'work', 'side');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_assignments_course" AS ENUM('Web Development', 'Project', 'User Experience', 'Databases', 'Software Design', 'Infrastructure', 'Security', 'Overig');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__assignments_v_version_kind" AS ENUM('school', 'work', 'side');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__assignments_v_version_course" AS ENUM('Web Development', 'Project', 'User Experience', 'Databases', 'Software Design', 'Infrastructure', 'Security', 'Overig');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    UPDATE "assignments"
    SET "course" = 'Web Development'
    WHERE "course" ILIKE 'web development' AND "course" IS DISTINCT FROM 'Web Development';

    UPDATE "_assignments_v"
    SET "version_course" = 'Web Development'
    WHERE "version_course" ILIKE 'web development' AND "version_course" IS DISTINCT FROM 'Web Development';

    UPDATE "assignments"
    SET "course" = 'Overig'
    WHERE "course" IS NOT NULL
      AND "course"::text NOT IN ('Web Development', 'Project', 'User Experience', 'Databases', 'Software Design', 'Infrastructure', 'Security', 'Overig');

    UPDATE "_assignments_v"
    SET "version_course" = 'Overig'
    WHERE "version_course" IS NOT NULL
      AND "version_course"::text NOT IN ('Web Development', 'Project', 'User Experience', 'Databases', 'Software Design', 'Infrastructure', 'Security', 'Overig');

    ALTER TABLE "assignments" ALTER COLUMN "course" SET DATA TYPE "public"."enum_assignments_course" USING "course"::text::"public"."enum_assignments_course";
    ALTER TABLE "_assignments_v" ALTER COLUMN "version_course" SET DATA TYPE "public"."enum__assignments_v_version_course" USING "version_course"::text::"public"."enum__assignments_v_version_course";

    ALTER TABLE "assignments" ADD COLUMN IF NOT EXISTS "kind" "enum_assignments_kind" DEFAULT 'school';
    ALTER TABLE "_assignments_v" ADD COLUMN IF NOT EXISTS "version_kind" "enum__assignments_v_version_kind" DEFAULT 'school';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "assignments" ALTER COLUMN "course" SET DATA TYPE varchar USING "course"::text;
    ALTER TABLE "_assignments_v" ALTER COLUMN "version_course" SET DATA TYPE varchar USING "version_course"::text;
    ALTER TABLE "assignments" DROP COLUMN IF EXISTS "kind";
    ALTER TABLE "_assignments_v" DROP COLUMN IF EXISTS "version_kind";
    DROP TYPE IF EXISTS "public"."enum_assignments_kind";
    DROP TYPE IF EXISTS "public"."enum_assignments_course";
    DROP TYPE IF EXISTS "public"."enum__assignments_v_version_kind";
    DROP TYPE IF EXISTS "public"."enum__assignments_v_version_course";
  `)
}
