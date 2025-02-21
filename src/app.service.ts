import { Injectable } from '@nestjs/common';
import { Const } from './constant';

@Injectable()
export class AppService {
  getHello(): string {
    return Const.HELLO_WORLD;
  }
}
