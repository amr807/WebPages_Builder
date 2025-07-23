import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, GeneratedPage, GeneratePageDto } from './app.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Controller()
export class AppController {

  constructor(   private readonly appService: AppService,

  ) {}

  @Post("generate-page")
  getPage(@Body() promit:GeneratePageDto):Promise< GeneratedPage> {
    return this.appService.generatePage(promit);
  } 
}
