import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Postagem {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number;

    @Column({ nullable: false })
    @ApiProperty({ required: true })
    title?: string;

    @Column({ nullable: true })
    @ApiProperty()
    content?: string
}