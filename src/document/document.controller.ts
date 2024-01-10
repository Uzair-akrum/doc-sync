import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getDocument() {
	console.log('req')
    const document = await this.documentService.getDocumentbyId();
    console.log("🚀 ~ file: document.controller.ts:12 ~ DocumentController ~ getDocument ~ document:", document)
    return document;
  }
}
