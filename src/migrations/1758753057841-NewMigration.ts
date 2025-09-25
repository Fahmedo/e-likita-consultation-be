import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758753057841 implements MigrationInterface {
  name = 'NewMigration1758753057841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "patient"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "firstName" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "lastName" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "dateOfBirth" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "gender" character varying(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "phoneNumber" character varying(15)`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "email" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" ADD "address" text`);
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "emergencyContactName" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "emergencyContactPhone" character varying(15)`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "medicalHistory" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "currentMedications" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "currentMedications"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "medicalHistory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "emergencyContactPhone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "emergencyContactName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "address"`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "phoneNumber"`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "dateOfBirth"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "lastName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "firstName"`,
    );
    await queryRunner.query(`ALTER TABLE "consultations" ADD "patient" jsonb`);
  }
}
