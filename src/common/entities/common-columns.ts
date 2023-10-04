import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// `CommonColumns` 클래스는 `BaseEntity`를 확장하여 기본 엔터티의 공통 컬럼을 정의합니다.
export class CommonColumns extends BaseEntity {
  // `id`: 각 엔터티의 유일한 식별자로 사용됩니다.
  // 이 프로퍼티는 API 문서에 설명과 예제가 포함되어 있습니다.
  @ApiProperty({ description: 'id', example: 1 }) // API 문서에서 프로퍼티에 대한 설명과 예시를 제공합니다.
  @PrimaryGeneratedColumn() // `id` 컬럼은 기본 키이자 자동으로 증가하는 컬럼입니다.
  public id!: number;

  // `created_at`: 엔터티가 생성된 시각입니다.
  // 이 값은 엔터티가 생성될 때 자동으로 할당됩니다.
  @CreateDateColumn() // 엔터티가 생성되었을 때의 시간을 자동으로 설정합니다.
  public readonly created_at!: Date | string;

  // `updated_at`: 엔터티가 마지막으로 업데이트된 시각입니다.
  // 이 값은 엔터티가 업데이트될 때 자동으로 갱신됩니다.
  @UpdateDateColumn() // 엔터티가 업데이트되었을 때의 시간을 자동으로 설정합니다.
  public readonly updated_at!: Date | string;

  // `deleted_at`: 엔터티가 삭제된 시각입니다.
  // 이 값은 엔터티가 삭제된 시점의 시간을 저장합니다.
  // `null`이면 해당 엔터티가 삭제되지 않았음을 의미합니다.
  @DeleteDateColumn() // 엔터티가 삭제되었을 때의 시간을 설정합니다. 이 컬럼이 `null`이 아니면 엔터티는 삭제된 것으로 간주됩니다.
  public readonly deleted_at?: Date | string | null;
}
