import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

// Entity
import { Partner } from '../entities/partner.entity';

// Dto
import { CreatePartnerDto } from '../dto/create-partner.dto';

@EntityRepository(Partner)
export class PartnerRepository extends Repository<Partner> {
  private logger = new Logger(PartnerRepository.name);

  async createPartner(
    createPartnerDto: CreatePartnerDto,
    user: any,
  ): Promise<Partner> {
    const { email, name, phone } = createPartnerDto;
    const partner = new Partner();
    partner.user = user;
    partner.email = email;
    partner.name = name;
    partner.phone = phone;
    partner.identificationCode = uuidv4();

    try {
      await this.save(partner);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate email
        throw new ConflictException('Correo de socio duplicado.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return partner;
  }

  async findByCondition(condition: any): Promise<Partner> {
    const partner = await this.findOne({ where: condition });

    if (!partner) {
      throw new NotFoundException(`Socio no encontrado.`);
    }

    return partner;
  }
}
