import { PartialType } from '@nestjs/mapped-types';
import { CreateControllerForGuardDto } from './create-controller-for-guard.dto';

export class UpdateControllerForGuardDto extends PartialType(
  CreateControllerForGuardDto,
) {}
