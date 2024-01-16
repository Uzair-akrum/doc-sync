import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  @Get('list/:name')
  async getDocumentListing(@Param('name') name: string) {
    return await this.documentService.getDocumentByAuthor(name);
  }
  @Post()
  async createDocument(@Body() createDocumentDto: any) {
    const { name } = createDocumentDto;
    return await this.documentService.createDocument(name);
  }
}
