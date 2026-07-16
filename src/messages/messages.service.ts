import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";

import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    return this.prisma.message.create({ data: dto });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async count() {
    return this.prisma.message.count();
  }
}
