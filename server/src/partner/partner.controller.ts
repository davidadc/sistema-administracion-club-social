import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { PartnerService } from './partner.service';

// Entity
import { User } from '../user/entities/user.entity';

// Dto
import { CreatePartnerDto } from './dto/create-partner.dto';
// import { UpdatePartnerDto } from './dto/update-partner.dto';

// Utils
import { GetUser } from '../utils/decorator/get-user.decorator';
import { Success } from '../utils/interfaces/response.interface';
import { successResponse } from '../utils/response';

@Controller('partner')
@ApiTags('Partner')
@UseGuards(AuthGuard())
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Socios creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async create(
    @Body() createPartnerDto: CreatePartnerDto,
    @GetUser() user: User,
  ): Promise<Success> {
    const partner = await this.partnerService.create(createPartnerDto, user);

    return successResponse(partner, 'Socio creado exitosamente', 201);
  }

  // @Get()
  // @ApiResponse({
  //   status: 200,
  //   description: 'Socios retornados exitosamente',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Error en la información enviada.',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'No autorizado.',
  // })
  // async findAll(@GetUser() user): Promise<Success> {
  //   const partners = await this.partnerService.findAll(user);
  //
  //   return successResponse(partners, 'Socios retornados exitosamente.', 200);
  // }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Socio retornado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Success> {
    const partner = await this.partnerService.findOne(+id, user);

    return successResponse(partner, 'Socio retornado exitosamente.', 200);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Socio actualizado exitosamente',
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
    @Body() updatePartnerDto: CreatePartnerDto,
  ) {
    const partner = await this.partnerService.update(+id, updatePartnerDto);

    return successResponse(partner, 'Socio actualizado exitosamente', 200);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Socio borrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.partnerService.remove(+id, user);
  }
}
