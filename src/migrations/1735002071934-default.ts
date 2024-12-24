import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735002071934 implements MigrationInterface {
    name = 'Default1735002071934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "absence" ("absence_id" SERIAL NOT NULL, "justification" text NOT NULL, "course_id" integer, CONSTRAINT "PK_196b3f69576e32ebe44c35573ac" PRIMARY KEY ("absence_id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("course_id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "instituition" character varying NOT NULL, "total_classes" integer NOT NULL, "total_absences_allowed" integer NOT NULL, "total_absences" integer NOT NULL, "max_absences_percentage" double precision NOT NULL, "class_days" integer NOT NULL, "course_start_date" TIMESTAMP NOT NULL, "course_end_date" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_b0e0ab8aa86f713201e050f9d8e" PRIMARY KEY ("course_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "instituicion" character varying NOT NULL, "photo" bytea NOT NULL, "account_created" TIMESTAMP NOT NULL DEFAULT now(), "email_verified" boolean NOT NULL DEFAULT false, "bio" text, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "date_of_birth" date NOT NULL, "social_links" jsonb, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "absence" ADD CONSTRAINT "FK_265ca1f6d5492628a239cc860da" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_bb2c8374d6f04bf9301895d1b33" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_bb2c8374d6f04bf9301895d1b33"`);
        await queryRunner.query(`ALTER TABLE "absence" DROP CONSTRAINT "FK_265ca1f6d5492628a239cc860da"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "absence"`);
    }

}
