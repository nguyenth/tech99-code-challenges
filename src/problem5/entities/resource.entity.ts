import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity("resources")
export class Resource {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 256})
    name!: string;

    @Column("text", { nullable: true })
    description?: string;

    @Column({ default: 1 })
    status!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}