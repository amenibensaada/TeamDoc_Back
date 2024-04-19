import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { DocumentService } from './document.service';

@Controller('Document')
export class DocumentController {
  constructor(private readonly DocService: DocumentService) {}
  @Get()
  async findAll(): Promise<Documents[]> {
    return this.DocService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Documents> {
    return this.DocService.findOne(id);
  }
  @Post()
  async create(@Body() Documentsvalidator: createDocumentsDTOlayer): Promise<Documents> {
    return this.DocService.create(Documentsvalidator);
  }

  @Post('/createavecaffectation')
  async createavecsaffection(
    @Body() Documentsvalidator: createDocumentsDTOlayer
  ): Promise<Documents> {
    return this.DocService.createavecaffectation(Documentsvalidator);
  }

  @Post('/createDocandfolder/:folderName')
  async createDocandfolder(
    @Body() Documentsvalidator: createDocumentsDTOlayer,
    @Param('folderName') folderName: string
  ): Promise<Documents> {
    return this.DocService.createDocandfolder(Documentsvalidator, folderName);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedocuDto: createDocumentsDTOlayer
  ): Promise<Documents> {
    return this.DocService.update(id, updatedocuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Documents> {
    return this.DocService.remove(id);
  }
}
