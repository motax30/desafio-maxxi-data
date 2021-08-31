import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Project "desafio-fullstack-backend" create sucessfully!';
  }
}
