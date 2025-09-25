import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1758644237582 implements MigrationInterface {
  name = 'NewMigration1758644237582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "dateOfBirth" date NOT NULL, "gender" character varying(10) NOT NULL, "phoneNumber" character varying(15), "email" character varying(255), "address" text, "emergencyContactName" character varying(50), "emergencyContactPhone" character varying(15), "medicalHistory" text, "currentMedications" text, "allergies" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommendations_type_enum" AS ENUM('self_care', 'pharmacy_visit', 'gp_appointment', 'urgent_care', 'emergency_room', 'specialist_referral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recommendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consultationId" uuid NOT NULL, "type" "public"."recommendations_type_enum" NOT NULL, "title" character varying(200) NOT NULL, "description" text NOT NULL, "priority" character varying(20) NOT NULL DEFAULT 'medium', "instructions" text, "precautions" text, "followUpTimeframe" text, "resources" jsonb, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_23a8d2db26db8cabb6ae9d6cd87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."consultations_status_enum" AS ENUM('started', 'patient_info_completed', 'symptoms_assessed', 'follow_ups_completed', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."consultations_urgencylevel_enum" AS ENUM('low', 'moderate', 'high', 'emergency')`,
    );
    await queryRunner.query(
      `CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" uuid NOT NULL, "status" "public"."consultations_status_enum" NOT NULL DEFAULT 'started', "urgencyLevel" "public"."consultations_urgencylevel_enum", "chiefComplaint" text, "presentIllnessHistory" text, "painScale" integer, "additionalNotes" text, "vitalSigns" jsonb, "followUpInstructions" text, "completedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "symptom_assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consultationId" uuid NOT NULL, "symptomId" uuid, "symptomName" character varying(100) NOT NULL, "severity" integer, "duration" integer, "durationUnit" character varying(20), "description" text, "triggers" text, "relievingFactors" text, "associatedSymptoms" jsonb, "location" jsonb, "isChiefComplaint" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e8b6838d7fcb7f634bde30bfb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "symptoms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "category" character varying(50) NOT NULL, "relatedSymptoms" text array, "riskFactors" jsonb, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b164d6568d7710d8e0076f63929" UNIQUE ("name"), CONSTRAINT "PK_7041f6c8f7afb75b9286c275a81" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommendation_templates_type_enum" AS ENUM('self_care', 'pharmacy_visit', 'gp_appointment', 'urgent_care', 'emergency_room', 'specialist_referral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recommendation_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "type" "public"."recommendation_templates_type_enum" NOT NULL, "title" character varying(200) NOT NULL, "description" text NOT NULL, "priority" character varying(20) NOT NULL DEFAULT 'medium', "instructions" text, "precautions" text, "followUpTimeframe" text, "triggerSymptoms" text array, "triggerConditions" text array, "criteria" jsonb, "resources" jsonb, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5db305d735ce432d13f8f4d02d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendations" ADD CONSTRAINT "FK_f82035dcdaa82158e4fe697e41a" FOREIGN KEY ("consultationId") REFERENCES "consultations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" ADD CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" ADD CONSTRAINT "FK_040b97d53d9746104919a24fa2c" FOREIGN KEY ("consultationId") REFERENCES "consultations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" ADD CONSTRAINT "FK_5ddfb6902efef6b6c693699be9e" FOREIGN KEY ("symptomId") REFERENCES "symptoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" DROP CONSTRAINT "FK_5ddfb6902efef6b6c693699be9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "symptom_assessments" DROP CONSTRAINT "FK_040b97d53d9746104919a24fa2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultations" DROP CONSTRAINT "FK_a00f58f9b1e75d30d66ee4097d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendations" DROP CONSTRAINT "FK_f82035dcdaa82158e4fe697e41a"`,
    );
    await queryRunner.query(`DROP TABLE "recommendation_templates"`);
    await queryRunner.query(
      `DROP TYPE "public"."recommendation_templates_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "symptoms"`);
    await queryRunner.query(`DROP TABLE "symptom_assessments"`);
    await queryRunner.query(`DROP TABLE "consultations"`);
    await queryRunner.query(
      `DROP TYPE "public"."consultations_urgencylevel_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."consultations_status_enum"`);
    await queryRunner.query(`DROP TABLE "recommendations"`);
    await queryRunner.query(`DROP TYPE "public"."recommendations_type_enum"`);
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
