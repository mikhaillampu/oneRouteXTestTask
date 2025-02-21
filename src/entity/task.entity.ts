import { Const } from 'src/constant';
import { TASK_STATUS } from 'src/enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: Const.TITLE_LENGTH })
  title: string;

  @ApiPropertyOptional()
  @Column({ nullable: true, length: Const.DESC_LENGTH })
  description?: string;

  @ApiProperty({ enum: () => TASK_STATUS })
  @Column({ type: 'enum', enum: TASK_STATUS, default: TASK_STATUS.PENDING })
  status: TASK_STATUS;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User[];

  @ApiPropertyOptional()
  @Column()
  userId: number;
}