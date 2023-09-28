import { BadRequestException } from '@nestjs/common';
import { CommonColumns } from '../entities/common-columns';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { BaseRepositoryInterface } from './base.repository.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';

export class BaseRepository<T extends CommonColumns>
  implements BaseRepositoryInterface<T>
{
  constructor(private readonly _repo: Repository<T>) {}

  protected createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this._repo.createQueryBuilder(alias);
  }

  async create(data: T): Promise<T> {
    return await this._repo.save(data);
  }

  async createMany(data: T[]): Promise<T[]> {
    return await this._repo.save(data);
  }

  async all(columns = [], relations = []): Promise<T[]> {
    return await this._repo.find({
      select: columns,
      relations,
    } as any);
  }

  async findById(id: number, columns = [], relations = []): Promise<T> {
    if (!id) throw new BadRequestException();
    return await this._repo.findOne({
      select: columns,
      where: { id },
      relations,
    } as any);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const model = await this.findById(id);
    return await this._repo.save({
      ...model,
      ...data,
    });
  }

  async remove(id: number): Promise<T> {
    const model = await this.findById(id);
    return await this._repo.save({
      ...model,
      deleted_at: new Date(),
    });
  }

  async paginate(
    page: number,
    perPage: number,
    columns = [],
    relations = [],
  ): Promise<PaginatedResult<T>> {
    return {
      total: await this._repo.count(),
      data: await this._repo.find({
        select: columns,
        relations,
        skip: (page - 1) * perPage,
        take: perPage,
      } as any),
    };
  }
}
