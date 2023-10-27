import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21698371499270 implements MigrationInterface {
    name = 'Init21698371499270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'CREATOR', 'ADMIN') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'ADMIN') NOT NULL`);
    }

}
