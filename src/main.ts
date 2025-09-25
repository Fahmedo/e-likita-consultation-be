import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend integration
  app.enableCors({
    origin: ['http://localhost:3000', process.env.CORS_ORIGIN],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('e-Likita Hospital Consultation Assistant API')
    .setDescription(
      'Healthcare Assistant Guided Triage API - PostgreSQL Backend',
    )
    .setVersion('1.0')
    .addTag('patients', 'Patient management endpoints')
    .addTag('consultations', 'Consultation flow endpoints')
    .addTag('symptoms', 'Symptoms assessment endpoints')
    .addTag('recommendations', 'Healthcare recommendations endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`e-Likita PostgreSQL Backend running on port ${port}`);
  console.log(`API Documentation: http://localhost:${port}/api/docs`);
  console.log(`Database: PostgreSQL`);
}
void bootstrap();
