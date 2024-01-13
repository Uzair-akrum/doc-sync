import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getDocument() {
    console.log('req');
    const document = await this.documentService.getDocumentbyId();
    console.log(
      '🚀 ~ file: document.controller.ts:12 ~ DocumentController ~ getDocument ~ document:',
      document,
    );
    return document;
  }
  @Post()
  async createDocument(@Body() createDocumentDto: any) {
    console.log("🚀 ~ DocumentController ~ createDocument ~ createDocumentDto:", createDocumentDto)
    const data = JSON.parse(createDocumentDto);
    return await this.documentService.createDocument(data);
  }
}
