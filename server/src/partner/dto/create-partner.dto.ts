import { OmitType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dto/register.dto';

/**
 * CreatePartnerDto.
 *
 * This Dto implements validations from 'class-validator' package in the request's body.
 */
export class CreatePartnerDto extends OmitType(RegisterDto, [
  'password',
] as const) {}
