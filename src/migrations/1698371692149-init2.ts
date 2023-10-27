import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21698371692149 implements MigrationInterface {
    name = 'Init21698371692149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`access_level\` \`access_level\` enum ('30', '40', '50') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`access_level\` \`access_level\` enum ('40', '50') NOT NULL`);
    }

}
