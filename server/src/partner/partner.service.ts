import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Partner } from './entities/partner.entity';
import { User } from '../user/entities/user.entity';

// Repository
import { PartnerRepository } from './repositories/partner.repository';

// Dto
import { CreatePartnerDto } from './dto/create-partner.dto';
import { AuditoriaRepository } from 'src/shared/repositories/auditoria.repository';
import { OperationTypeEnum } from 'src/utils/enum/operation-type.enum';
// import { UpdatePartnerDto } from './dto/update-partner.dto';

/**
 * PartnerService.
 *
 * Service that make calls to the PartnerRepository.
 */
@Injectable()
export class PartnerService {
  /**
   * Create PartnerService
   *
   * @param {PartnerRepository} partnerRepository
   */
  constructor(
    @InjectRepository(PartnerRepository)
    private readonly partnerRepository: PartnerRepository,
    @InjectRepository(AuditoriaRepository)
    private readonly auditoriaRepository: AuditoriaRepository,
  ) {}

  /**
   * Create partner on previous user.
   *
   * @param {CreatePartnerDto} createPartnerDto
   * @param {User} user
   */
  async create(createPartnerDto: CreatePartnerDto, user: User, clientIpMac: string[]) {
    const [partner, sql] = await this.partnerRepository.createPartner(createPartnerDto, user);
    await this.auditoriaRepository.createRegister(
      Partner.name,
      partner.id,
      OperationTypeEnum.UPDATE,
      sql,
      null,
      partner,
      clientIpMac[0],
      clientIpMac[1],
      null,
    );
    return partner;

  }

  // /**
  //  * Query to return all partners in the DB.
  //  *
  //  * @param {User} user
  //  *
  //  * @returns {Partner[]}
  //  */
  // async findAll(user: User): Promise<Partner[]> {
  //   return this.partnerRepository.find({ where: { user } });
  // }

  /**
   * Query to return one partner by id
   *
   * @param {number} id
   * @param {User} user
   *
   * @returns {User}
   */
  async findOne(id: number, user: User): Promise<Partner> {
    return this.partnerRepository.findByCondition({ id, user });
  }

  /**
   * Update partner fields.
   *
   * @param {number} id
   * @param {CreatePartnerDto} createPartnerDto
   *
   * @returns {Partner}
   */
  async update(
    id: number,
    createPartnerDto: CreatePartnerDto,
    clientIpMac: string[]
  ): Promise<Partner> {
    const [partner, sql] = await this.partnerRepository.updatePartner(id, createPartnerDto);
    await this.auditoriaRepository.createRegister(
      Partner.name,
      partner.id,
      OperationTypeEnum.UPDATE,
      sql,
      null,
      partner,
      clientIpMac[0],
      clientIpMac[1],
      null,
    );
    return partner;
  }

  /**
   * Query to delete partner by its id
   *
   * @param {number} id
   * @param {User} user
   *
   * @returns {void}
   */
  async remove(id: number, user: User): Promise<void> {
    const result = await this.partnerRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Socio no encontrado.`);
    }
  }
}
