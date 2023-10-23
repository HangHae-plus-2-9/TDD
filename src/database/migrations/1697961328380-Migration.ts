import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697961328380 implements MigrationInterface {
  name = 'Migration1697961328380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "customer_id" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "cart_id" integer NOT NULL, "product" integer NOT NULL, "quantity" integer NOT NULL, "cartIdId" integer, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "product_id" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_items" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "customer_id" integer NOT NULL, "payment_method" integer NOT NULL, "payment_amount" integer NOT NULL, "paid_at" TIMESTAMP, "canceled_at" TIMESTAMP, "courier_name" integer, "invoice_number" character varying, "shipping_address" character varying NOT NULL, "shipping_receiver" character varying NOT NULL, "shipping_receiver_phone" character varying NOT NULL, "departed_at" TIMESTAMP, "arrived_at" TIMESTAMP, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "email_verified_at" TIMESTAMP, "phone" character varying, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "seller_id" integer NOT NULL, "name" character varying NOT NULL, "cat_name" character varying NOT NULL, "desc" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sellers" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "business_num" character varying NOT NULL, "store_name" character varying NOT NULL, "account_num" character varying NOT NULL, CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_payment_method_enum_enum" AS ENUM('CREDIT_CARD', 'VIRTUAL_ACCOUNT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_payment_status_enum_enum" AS ENUM('PENDING', 'COMPLETED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "payment_method_enum" "public"."payments_payment_method_enum_enum" NOT NULL DEFAULT 'CREDIT_CARD', "amount" integer NOT NULL, "canceled_amount" integer, "canceled_at" TIMESTAMP, "payment_status_enum" "public"."payments_payment_status_enum_enum" NOT NULL DEFAULT 'PENDING', "orderId" integer, CONSTRAINT "REL_af929a5f2a400fdb6913b4967e" UNIQUE ("orderId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_033b32986b1524e256cbfa9f711" FOREIGN KEY ("cartIdId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_033b32986b1524e256cbfa9f711"`,
    );
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(
      `DROP TYPE "public"."payments_payment_status_enum_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."payments_payment_method_enum_enum"`,
    );
    await queryRunner.query(`DROP TABLE "sellers"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "cart_items"`);
    await queryRunner.query(`DROP TABLE "cart"`);
  }
}
