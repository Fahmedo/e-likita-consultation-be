import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsDefined,
  MinLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SymptomDto } from './symptom.dto';
import { FollowUpDto } from './follow-up.dto';

export class CreateConsultationDto {
  @ApiProperty({ description: 'Patient first name', maxLength: 100 })
  @IsDefined({ message: 'First name is required' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(1)
  firstName: string;

  @ApiProperty({ description: 'Patient last name', maxLength: 100 })
  @IsDefined({ message: 'Last name is required' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(1)
  lastName: string;

  @ApiProperty({ description: 'Patient date of birth', format: 'date' })
  @IsDefined({ message: 'Date of birth is required' })
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Patient gender',
    enum: ['male', 'female', 'other'],
  })
  @IsDefined({ message: 'Gender is required' })
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiPropertyOptional({ description: 'Patient phone number', maxLength: 15 })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Patient email address' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ description: 'Patient address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Emergency contact name', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emergencyContactName?: string;

  @ApiPropertyOptional({
    description: 'Emergency contact phone',
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  emergencyContactPhone?: string;

  @ApiPropertyOptional({ description: 'Medical history', maxLength: 50 })
  @IsOptional()
  @IsArray()
  medicalHistory?: string[];

  @ApiPropertyOptional({
    description: 'Medication',
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  currentMedication?: string;

  @ApiProperty({ type: [SymptomDto], description: 'List of reported symptoms' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SymptomDto)
  symptoms: SymptomDto[];

  @ApiPropertyOptional({
    type: FollowUpDto,
    description: 'Follow-up details if applicable',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FollowUpDto)
  followUp?: FollowUpDto;

  @ApiPropertyOptional({
    description: 'Any additional notes from the consultation',
  })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
