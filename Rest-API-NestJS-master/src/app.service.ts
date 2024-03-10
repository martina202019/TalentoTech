import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getUser(name): string {
    return 'Hello' + ' ' + name;
  }
}
