import { Injectable } from '@nestjs/common';
import { CreateControllerForGuardDto } from './dto/create-controller-for-guard.dto';
import { UpdateControllerForGuardDto } from './dto/update-controller-for-guard.dto';

@Injectable()
export class ControllerForGuardService {
  create(createControllerForGuardDto: CreateControllerForGuardDto) {
    return 'This action adds a new controllerForGuard';
  }

  findAll() {
    return `This action returns all controllerForGuard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} controllerForGuard`;
  }

  update(id: number, updateControllerForGuardDto: UpdateControllerForGuardDto) {
    return `This action updates a #${id} controllerForGuard`;
  }

  remove(id: number) {
    return `This action removes a #${id} controllerForGuard`;
  }
}
