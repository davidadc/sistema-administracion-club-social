import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

// Dtp
// import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';

// Utils
import { Success } from '../utils/interfaces/response.interface';
import { successResponse } from '../utils/response';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Usuarios retornados exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async findAll(): Promise<Success> {
    const users = await this.userService.findAll();

    return successResponse(users, 'Usuarios retornados exitosamente', 200);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuario retornado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async findOne(@Param('id') id: string): Promise<Success> {
    const user = await this.userService.findOne(+id);

    return successResponse(user, 'Usuario retornado exitosamente', 200);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: RegisterDto,
  ): Promise<Success> {
    const user = await this.userService.update(+id, updateUserDto);

    return successResponse(user, 'Usuario retornado exitosamente', 200);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Usuario borrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(+id);
  }
}
