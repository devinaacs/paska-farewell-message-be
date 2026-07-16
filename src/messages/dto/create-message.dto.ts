import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({ example: "Devina" })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: "Good luck Paska! You will be missed 🥲" })
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  message!: string;

  @ApiPropertyOptional({ example: "✨" })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  sticker?: string;
}
