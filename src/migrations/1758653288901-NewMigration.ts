import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758653288901 implements MigrationInterface {
  name = 'NewMigration1758653288901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" DROP CONSTRAINT "FK_040b97d53d9746104919a24fa2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" DROP CONSTRAINT "FK_5ddfb6902efef6b6c693699be9e"`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "category"`);
    await queryRunner.query(
      `ALTER TABLE "symptoms" DROP COLUMN "relatedSymptoms"`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "riskFactors"`);
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "symptoms" ADD "severity" text`);
    await queryRunner.query(
      `ALTER TABLE "symptoms" ADD "duration" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" ADD "frequency" text`);
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "patientId" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" ADD "symptoms" jsonb`);
    await queryRunner.query(`ALTER TABLE "consultations" ADD "followUp" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "followUp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "symptoms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "frequency"`);
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "symptoms" DROP COLUMN "severity"`);
    await queryRunner.query(
      `ALTER TABLE "symptoms" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" ADD "riskFactors" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "symptoms" ADD "relatedSymptoms" text array`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptoms" ADD "category" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "symptoms" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" ADD CONSTRAINT "FK_5ddfb6902efef6b6c693699be9e" FOREIGN KEY ("symptomId") REFERENCES "symptoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" ADD CONSTRAINT "FK_040b97d53d9746104919a24fa2c" FOREIGN KEY ("consultationId") REFERENCES "consultations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
