import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SymptomDto {
  @ApiProperty({ description: 'Name of the symptom (e.g., Headache, Fever)' })
  @IsString()
  symptomId: string;

  @ApiProperty({ description: 'Name of the symptom (e.g., Headache, Fever)' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Severity of the symptom (e.g., Mild, High)' })
  @IsString()
  severity: string;

  @ApiProperty({
    description: 'Duration of the symptom (e.g., 2 days, 1 week)',
  })
  @IsString()
  duration: string;

  @ApiPropertyOptional({
    description: 'Frequency of occurrence (e.g., Intermittent, Constant)',
  })
  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
