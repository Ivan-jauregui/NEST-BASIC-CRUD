import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:true})
    description?: string;

    @Column('decimal',{precision: 10, scale: 2,nullable:false})
    price: number;
    
    @Column('int',{nullable:false})
    stock: number;
}
