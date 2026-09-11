import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true,nullable:false})
    dni:number;
    @Column({nullable:false})
    firstName:String;
    @Column({nullable:false})
    lastName:String;
    @Column({nullable:false})
    email:string;
    @Column({nullable:false})
    password:string;
}
