import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryColumn({ generated: "increment" })
    id?: number;
    @Column()
    title?: string;
    @Column()
    content?: string;
    @Column()
    createdAt?: Date;

}