import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

/**
 * CreatePartnerDto.
 *
 * This Dto implements validations from 'class-validator' package in the request's body.
 */
export class CreatePartnerDto {
  @IsNumber()
  @Min(1)
  @Max(3)
  @IsNotEmpty()
  @ApiProperty()
  qualification: number;
}
