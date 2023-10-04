// 필요한 라이브러리와 모듈을 가져옵니다.
import { BadRequestException } from '@nestjs/common';
import { CommonColumns } from '../entities/common-columns';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { BaseRepositoryInterface } from './base.repository.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';

// 'T'는 'CommonColumns'를 확장하는 타입입니다.
export class BaseRepository<T extends CommonColumns>
  implements BaseRepositoryInterface<T>
{
  // 'BaseRepository'는 'BaseRepositoryInterface' 인터페이스를 구현합니다.
  // 'BaseRepository'는 'Repository<T>' 타입의 인스턴스를 인자로 받아 생성됩니다.
  constructor(private readonly _repo: Repository<T>) {}

  // 'alias'를 인자로 받아, 'SelectQueryBuilder<T>'를 반환하는 메서드입니다.
  protected createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this._repo.createQueryBuilder(alias);
  }

  // 'data'를 인자로 받아, 그것을 저장하고 저장된 데이터를 반환하는 비동기 메서드입니다.
  async create(data: T): Promise<T> {
    return await this._repo.save(data);
  }

  // 'T' 타입의 배열 'data'를 인자로 받아, 그것을 저장하고 저장된 데이터를 반환하는 비동기 메서드입니다.
  async createMany(data: T[]): Promise<T[]> {
    return await this._repo.save(data);
  }

  // 선택적으로 'columns'와 'relations'을 인자로 받아, 모든 데이터를 검색하고 반환하는 비동기 메서드입니다.
  async all(columns = [], relations = []): Promise<T[]> {
    return await this._repo.find({
      select: columns,
      relations,
    } as any);
  }

  // 'id'와 선택적으로 'columns'와 'relations'을 인자로 받아, ID에 해당하는 데이터를 검색하고 반환하는 비동기 메서드입니다.
  async findById(id: number, columns = [], relations = []): Promise<T> {
    if (!id) throw new BadRequestException();
    return await this._repo.findOne({
      select: columns,
      where: { id },
      relations,
    } as any);
  }

  // 'id'와 'data'를 인자로 받아, ID에 해당하는 데이터를 'data'로 업데이트하고 업데이트된 데이터를 반환하는 비동기 메서드입니다.
  async update(id: number, data: Partial<T>): Promise<T> {
    const model = await this.findById(id);
    return await this._repo.save({
      ...model,
      ...data,
    });
  }

  // 'id'를 인자로 받아, ID에 해당하는 데이터의 'deleted_at' 필드를 현재 시간으로 설정하고 업데이트된 데이터를 반환하는 비동기 메서드입니다.
  async remove(id: number): Promise<T> {
    const model = await this.findById(id);
    return await this._repo.save({
      ...model,
      deleted_at: new Date(),
    });
  }

  // 'page', 'perPage', 그리고 선택적으로 'columns'와 'relations'을 인자로 받아,
  // 데이터를 페이지네이션하고, 그 결과를 'PaginatedResult<T>' 타입으로 반환하는 비동기 메서드입니다.
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
