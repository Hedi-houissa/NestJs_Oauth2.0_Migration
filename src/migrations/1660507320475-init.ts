import {MigrationInterface, QueryRunner} from "typeorm";

export class init1660507320475 implements MigrationInterface {
    name = 'init1660507320475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NULL, \`delFlag\` tinyint NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`officeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`office\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`location\` varchar(20) NOT NULL, \`delFlag\` tinyint NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD CONSTRAINT \`FK_864d95e6bba7f37a5e4a58b0707\` FOREIGN KEY (\`officeId\`) REFERENCES \`office\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP FOREIGN KEY \`FK_864d95e6bba7f37a5e4a58b0707\``);
        await queryRunner.query(`DROP TABLE \`office\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
    }

}
