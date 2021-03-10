import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Service
import { AuthService } from './auth.service';

// Decorator
import { GetUser } from '../utils/decorator/get-user.decorator';

// Dto
import { RegisterDto } from './dto/register.dto';

// Utils
import { Success } from '../utils/interfaces/response.interface';
import { successResponse } from '../utils/response';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Información duplicada.',
  })
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<Success> {
    await this.authService.register(registerDto);

    return successResponse(null, 'Usuario registrado exitosamente.', 201);
  }

  @Post('login')
  @UseGuards(AuthGuard('basic'))
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la información enviada.',
  })
  @ApiBasicAuth()
  async login(@GetUser() user) {
    const accessToken = await this.authService.login(user);

    return successResponse(
      { user, accessToken },
      'Inicio de sesión exitoso.',
      201,
    );
  }
}
