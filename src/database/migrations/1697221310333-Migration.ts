import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697221310333 implements MigrationInterface {
    name = 'Migration1697221310333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "product_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "user_id"`);
    }

}
