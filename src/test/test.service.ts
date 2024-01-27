import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  findAll() {
    return process.env.SETTINGS;
  }
}
