import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { PartnerModule } from './partner/partner.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/dist', 'client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') == true,
        // logging: 'all',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PartnerModule,
    UserModule,
    SharedModule,
  ],
})
export class AppModule {}
