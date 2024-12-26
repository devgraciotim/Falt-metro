import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735179027402 implements MigrationInterface {
    name = 'Default1735179027402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "instituicion" TO "institution"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "institution" TO "instituicion"`);
    }

}
