import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsultationStatus } from '../../common/enums/consultation-status.enum';
import { UrgencyLevel } from '../../common/enums/urgency-level.enum';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 15, nullable: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  emergencyContactName: string;

  @Column({ length: 15, nullable: true })
  emergencyContactPhone: string;

  @Column({ type: 'text', nullable: true })
  medicalHistory: string[];

  @Column({ type: 'text', nullable: true })
  currentMedications: string;

  @Column({ type: 'jsonb', nullable: true })
  symptoms: {
    name: string;
    severity?: string;
    duration?: string;
    frequency?: string;
    description?: string;
  }[];

  @Column({ type: 'jsonb', nullable: true })
  followUp: {
    preferredContactMethod: string;
    preferredTime: string;
    urgency: string;
    additionalNotes?: string;
  };

  @Column({
    type: 'enum',
    enum: ConsultationStatus,
    default: ConsultationStatus.COMPLETED,
  })
  status: ConsultationStatus;

  @Column({
    type: 'enum',
    enum: UrgencyLevel,
    nullable: true,
  })
  urgencyLevel: UrgencyLevel;

  @Column({ type: 'text', nullable: true })
  additionalNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
