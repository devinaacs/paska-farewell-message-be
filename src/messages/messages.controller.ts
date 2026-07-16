import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiCreatedResponse({ description: "Message created successfully" })
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: "All messages ordered by newest first" })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get("count")
  @ApiOkResponse({ description: "Total message count" })
  async count() {
    const total = await this.messagesService.count();
    return { total };
  }
}
