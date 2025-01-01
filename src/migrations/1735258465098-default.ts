import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735258465098 implements MigrationInterface {
    name = 'Default1735258465098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "class_days"`);
        await queryRunner.query(`CREATE TYPE "public"."course_class_days_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')`);
        await queryRunner.query(`ALTER TABLE "course" ADD "class_days" "public"."course_class_days_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "class_days"`);
        await queryRunner.query(`DROP TYPE "public"."course_class_days_enum"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "class_days" integer NOT NULL`);
    }

}
