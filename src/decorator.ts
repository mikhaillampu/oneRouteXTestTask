import { SetMetadata } from '@nestjs/common';
import { Const } from './constant';

export const Public = () => SetMetadata(Const.IS_PUBLIC_KEY, true);