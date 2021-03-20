import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Partner } from './entities/partner.entity';
import { User } from '../user/entities/user.entity';

// Repository
import { PartnerRepository } from './repositories/partner.repository';

// Dto
import { CreatePartnerDto } from './dto/create-partner.dto';
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
  ) {}

  /**
   * Create partner on previous user.
   *
   * @param {CreatePartnerDto} createPartnerDto
   * @param {User} user
   */
  async create(createPartnerDto: CreatePartnerDto, user: User) {
    return this.partnerRepository.createPartner(createPartnerDto, user);
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
  ): Promise<Partner> {
    const { qualification } = createPartnerDto;
    const partner = await this.partnerRepository.findByCondition({ id });

    partner.qualification = qualification;

    return await this.partnerRepository.save(partner);
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
