import { Logger, Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { FavoirteRepository } from './favorite.repository';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [FavoriteController],
  providers: [
    Logger,
    FavoriteService,
    {
      provide: 'FavoriteRepositoryInterface',
      useClass: FavoirteRepository,
    },
  ],
})
export class FavoriteModule {}
