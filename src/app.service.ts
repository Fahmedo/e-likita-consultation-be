import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'e-Likita Hospital Consultation Assistant API is running!';
  }
}
