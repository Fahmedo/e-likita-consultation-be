import { ApiProperty } from '@nestjs/swagger';
import { ConsultationStatus } from '../../common/enums/consultation-status.enum';
import { UrgencyLevel } from '../../common/enums/urgency-level.enum';

export class ConsultationSummaryDto {
  @ApiProperty({ description: 'Consultation ID' })
  id: string;

  @ApiProperty({ description: 'Patient information' })
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
  };

  @ApiProperty({ description: 'Consultation status', enum: ConsultationStatus })
  status: ConsultationStatus;

  @ApiProperty({ description: 'Urgency level', enum: UrgencyLevel })
  urgencyLevel: UrgencyLevel;

  @ApiProperty({ description: 'Chief complaint' })
  chiefComplaint: string;

  @ApiProperty({ description: 'Key symptoms identified' })
  symptoms: string[];

  @ApiProperty({ description: 'Follow-up instructions' })
  followUpInstructions: string;

  @ApiProperty({ description: 'Consultation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Completion date' })
  completedAt: Date;
}
