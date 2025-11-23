import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB_1763722587659 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "resources" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(256) NOT NULL,
                "description" text,
                "status" integer NOT NULL DEFAULT 1,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS "resources";`,
        )
    }

}
