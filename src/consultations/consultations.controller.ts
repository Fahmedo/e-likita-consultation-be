import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { Consultation } from './entities/consultation.entity';

@ApiTags('consultations')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Start a new consultation' })
  @ApiResponse({
    status: 201,
    description: 'Consultation created successfully',
    type: Consultation,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  create(
    @Body() createConsultationDto: CreateConsultationDto,
  ): Promise<Consultation> {
    return this.consultationsService.create(createConsultationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  @ApiResponse({
    status: 200,
    description: 'Consultations retrieved successfully',
    type: [Consultation],
  })
  findAll(active?: string): Promise<Consultation[]> {
    if (active === 'true') {
      return this.consultationsService.getActiveConsultations();
    }
    return this.consultationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a consultation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Consultation retrieved successfully',
    type: Consultation,
  })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Consultation> {
    return this.consultationsService.findOne(id);
  }

  // @Get('patient/:patientId')
  // @ApiOperation({ summary: 'Get consultations for a specific patient' })
  // @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Patient consultations retrieved successfully',
  //   type: [Consultation],
  // })
  // @ApiResponse({ status: 404, description: 'Patient not found' })
  // findByPatient(
  //   @Param('patientId', ParseUUIDPipe) patientId: string,
  // ): Promise<Consultation[]> {
  //   return this.consultationsService.findByPatient(patientId);
  // }

  // @Get(':id/summary')
  // @ApiOperation({
  //   summary: 'Get consultation summary (for completed consultations)',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultation summary retrieved successfully',
  //   type: ConsultationSummaryDto,
  // })
  // @ApiResponse({ status: 400, description: 'Consultation not completed' })
  // @ApiResponse({ status: 404, description: 'Consultation not found' })
  // // getConsultationSummary(
  // //   @Param('id', ParseUUIDPipe) id: string,
  // // ): Promise<ConsultationSummaryDto> {
  // //   return this.consultationsService.getConsultationSummary(id);
  // // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a consultation' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultation updated successfully',
  //   type: Consultation,
  // })
  // @ApiResponse({ status: 404, description: 'Consultation not found' })
  // // update(
  // //   @Param('id', ParseUUIDPipe) id: string,
  // //   updateConsultationDto: UpdateConsultationDto,
  // // ): Promise<Consultation> {
  // //   return this.consultationsService.update(id, updateConsultationDto);
  // // }

  // @Patch(':id/status')
  // @ApiOperation({ summary: 'Update consultation status' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultation status updated successfully',
  //   type: Consultation,
  // })
  // @ApiResponse({ status: 404, description: 'Consultation not found' })
  // // updateStatus(
  // //   @Param('id', ParseUUIDPipe) id: string,
  // //   @Body('status') status: ConsultationStatus,
  // // ): Promise<Consultation> {
  // //   return this.consultationsService.updateStatus(id, status);
  // // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a consultation' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultation deleted successfully',
  // })
  // @ApiResponse({ status: 404, description: 'Consultation not found' })
  // remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
  //   return this.consultationsService.remove(id);
  // }
}
