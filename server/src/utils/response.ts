import { Success } from './interfaces/response.interface';

export const successResponse = (
  data,
  message = 'OK',
  statusCode = 200,
): Success => ({ statusCode, data, message });
