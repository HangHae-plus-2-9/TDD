import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697952620615 implements MigrationInterface {
    name = 'Migration1697952620615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_method_enum" AS ENUM('CREDIT_CARD', 'VIRTUAL_ACCOUNT')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'COMPLETED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "method" "public"."payments_method_enum" NOT NULL DEFAULT 'CREDIT_CARD', "amount" integer NOT NULL, "canceled_amount" integer, "canceled_at" TIMESTAMP, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "orderId" integer, CONSTRAINT "REL_af929a5f2a400fdb6913b4967e" UNIQUE ("orderId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
    }

}
