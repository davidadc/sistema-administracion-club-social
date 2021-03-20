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
  ): Promise<any> {
    const { qualification } = createPartnerDto;

    const createQuery = this.createQueryBuilder()
    .insert()
    .into(Partner)
    .values({
      user,
      email: user.email,
      name: user.email,
      phone: user.phone,
      qualification,
      identificationCode: uuidv4()
    });

    try {
      const result = await createQuery.execute();
      const partner = await this.findByCondition({id: result.raw.insertId});
      return [partner, createQuery.getSql()];
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate email
        throw new ConflictException('Correo de socio duplicado.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByCondition(condition: any): Promise<Partner> {
    const partner = await this.findOne({ where: condition });

    if (!partner) {
      throw new NotFoundException(`Socio no encontrado.`);
    }

    return partner;
  }

  async updatePartner(id: number, createPartnerDto: CreatePartnerDto): Promise<any> {
    const { qualification } = createPartnerDto;

    const updateQuery = this.createQueryBuilder()
      .update(Partner)
      .set({
        qualification
      })
      .where('id = :id', { id });

    try {
      await updateQuery.execute();
      const partner = await this.findByCondition({id});
      return [partner, updateQuery.getSql()];
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async deletePartner(id: number, user: User): Promise<any> {
    const partner =  await this.findByCondition({id});

    if (!partner) {
      throw new NotFoundException();
    }

    const query = await this.createQueryBuilder()
      .delete()
      .from(Partner)
      .where('id = :id', { id })

    let response;
    try {
      response = await query.execute();
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }

    if (response.affected === 1) {
      return [partner, query.getSql()];
    } else {
      throw new InternalServerErrorException();
    }
  }
}
