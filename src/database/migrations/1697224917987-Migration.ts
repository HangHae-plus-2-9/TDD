import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697224917987 implements MigrationInterface {
    name = 'Migration1697224917987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" RENAME COLUMN "product_id" TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" RENAME COLUMN "product" TO "product_id"`);
    }

}
