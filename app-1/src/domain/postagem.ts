import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Postagem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({ nullable: false })
  @ApiProperty({ required: true, title: 'Titulo da postagem(obrigatória)' })
  title?: string;

  @Column({ nullable: true })
  @ApiProperty()
  content?: string;
}
