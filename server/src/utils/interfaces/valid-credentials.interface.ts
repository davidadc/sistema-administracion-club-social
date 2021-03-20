import { Partner } from '../../partner/entities/partner.entity';

export interface ValidCredentials {
  id: number;
  email: string;
  partner?: Partner;
}
