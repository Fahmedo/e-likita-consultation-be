import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758752783808 implements MigrationInterface {
  name = 'NewMigration1758752783808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patient" jsonb, "symptoms" jsonb, "followUp" jsonb, "status" "public"."consultations_status_enum" NOT NULL DEFAULT 'completed', "urgencyLevel" "public"."consultations_urgencylevel_enum", "additionalNotes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "consultations"`);
  }
}
