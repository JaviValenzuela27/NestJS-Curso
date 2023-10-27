import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698379000138 implements MigrationInterface {
    name = 'Init1698379000138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'ADMIN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_1f53e7ffe94530f9e0221224d29\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_1f53e7ffe94530f9e0221224d29\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'CREATOR', 'ADMIN') NOT NULL`);
    }

}
