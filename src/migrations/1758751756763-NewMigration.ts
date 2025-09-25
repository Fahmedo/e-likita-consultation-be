import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758751756763 implements MigrationInterface {
  name = 'NewMigration1758751756763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendations" DROP CONSTRAINT "FK_f82035dcdaa82158e4fe697e41a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "chiefComplaint"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "presentIllnessHistory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "painScale"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "vitalSigns"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "followUpInstructions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "completedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" ADD "patient" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "patient"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "patientId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "completedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "followUpInstructions" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "vitalSigns" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "painScale" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "presentIllnessHistory" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "chiefComplaint" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendations" ADD CONSTRAINT "FK_f82035dcdaa82158e4fe697e41a" FOREIGN KEY ("consultationId") REFERENCES "consultations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
