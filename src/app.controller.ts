import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'e-Likita Hospital Consultation Assistant API',
      version: '1.0.0',
    };
  }

  @Get()
  @ApiOperation({ summary: 'API information' })
  @ApiResponse({ status: 200, description: 'API information' })
  getInfo() {
    return {
      name: 'e-Likita Hospital Consultation Assistant API',
      version: '1.0.0',
      description: 'Healthcare Assistant Guided Triage API',
      documentation: '/api/docs',
      endpoints: {
        patients: '/api/v1/patients',
        consultations: '/api/v1/consultations',
        symptoms: '/api/v1/symptoms',
        recommendations: '/api/v1/recommendations',
      },
    };
  }
}
