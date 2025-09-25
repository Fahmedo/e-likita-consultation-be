import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FollowUpDto {
  @ApiProperty({
    description: 'preferred method of contact email, phone number',
  })
  @IsString()
  preferredContactMethod: string;

  @ApiProperty({ description: 'preffered time morning or afternoon' })
  @IsString()
  preferredTime: string;

  @ApiProperty({
    description: 'Whether patient experienced chills (true/false)',
  })
  @ApiPropertyOptional({
    description: 'Urgency level for follow-up (e.g., Low, Medium, High)',
  })
  @IsOptional()
  @IsString()
  urgency?: string;

  @ApiPropertyOptional({
    description: 'Addtional notes for follow-up',
  })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
