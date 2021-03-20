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
import { User } from '../../user/entities/user.entity';

// Dto
import { CreatePartnerDto } from '../dto/create-partner.dto';

@EntityRepository(Partner)
export class PartnerRepository extends Repository<Partner> {
  private logger = new Logger(PartnerRepository.name);

  async createPartner(
    createPartnerDto: CreatePartnerDto,
    user: User,
  ): Promise<Partner> {
    const { qualification } = createPartnerDto;

    const partner = new Partner();
    partner.user = user;
    partner.email = user.email;
    partner.name = user.name;
    partner.phone = user.phone;
    partner.qualification = qualification;
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
