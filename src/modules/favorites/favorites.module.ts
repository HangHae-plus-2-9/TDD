import { Logger, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [FavoritesController],
  providers: [Logger, FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
