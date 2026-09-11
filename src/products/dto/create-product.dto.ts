import { IsString, IsNumber, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;
}
