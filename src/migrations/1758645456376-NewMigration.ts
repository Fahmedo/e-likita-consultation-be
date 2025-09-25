import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758645456376 implements MigrationInterface {
  name = 'NewMigration1758645456376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ALTER COLUMN "status" SET DEFAULT 'completed'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consultations" ALTER COLUMN "status" SET DEFAULT 'started'`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD "patientId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
