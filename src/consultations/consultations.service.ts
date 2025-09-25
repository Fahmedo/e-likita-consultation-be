import { Injectable, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';
import type { CreateConsultationDto } from './dto/create-consultation.dto';
import { ConsultationStatus } from '../common/enums/consultation-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private consultationsRepository: Repository<Consultation>,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<Consultation> {
    const consultation = this.consultationsRepository.create({
      ...createConsultationDto,
    });

    return await this.consultationsRepository.save(consultation);
  }

  async findAll(): Promise<Consultation[]> {
    return await this.consultationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Consultation> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }

    return consultation;
  }

  async findByPatientEmail(email: string): Promise<Consultation[]> {
    return await this.consultationsRepository.find({
      where: { email },
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveConsultations(): Promise<Consultation[]> {
    return await this.consultationsRepository.find({
      where: [
        { status: ConsultationStatus.STARTED },
        { status: ConsultationStatus.PATIENT_INFO_COMPLETED },
        { status: ConsultationStatus.SYMPTOMS_ASSESSED },
        { status: ConsultationStatus.FOLLOW_UPS_COMPLETED },
      ],
      order: { createdAt: 'DESC' },
    });
  }
}
