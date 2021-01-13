import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Roles } from '../core/decorator/role.decorator';
import { AuthGuard } from '../core/guard/auth.guard';
import { RoleGuard } from '../core/guard/role.guard';
import { ControllerForGuardService } from './controller-for-guard.service';
import { CreateControllerForGuardDto } from './dto/create-controller-for-guard.dto';
import { UpdateControllerForGuardDto } from './dto/update-controller-for-guard.dto';

@Controller('controller-for-guard')
export class ControllerForGuardController {
  constructor(
    private readonly controllerForGuardService: ControllerForGuardService,
  ) {}

  @Post()
  @Roles('admin')
  create(@Body() createControllerForGuardDto: CreateControllerForGuardDto) {
    return this.controllerForGuardService.create(createControllerForGuardDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  findAll() {
    return this.controllerForGuardService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.controllerForGuardService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateControllerForGuardDto: UpdateControllerForGuardDto,
  ) {
    return this.controllerForGuardService.update(
      +id,
      updateControllerForGuardDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controllerForGuardService.remove(+id);
  }
}
