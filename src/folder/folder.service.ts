import { ConflictException, Injectable } from '@nestjs/common';
import { Folder } from './folder.schema';
import { FolderRepository } from './folder.repository';
import { createFolderDTOlayer } from './dto/create-folder.dto';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Importez UserService
import { EmailService } from '../email/email.service'; // Importez UserService

@Injectable()
export class FolderService {
  constructor(private folderRepository: FolderRepository,    private userService: UsersService,    private emailService: EmailService, // Correctement injecté

) {}

  async findAll(userId: string, page: number = 1, perPage: number = 3): Promise<Folder[]> {
    const skip = Math.max(0, (page - 1) * perPage); // Assurez-vous que skip est au moins égal à 0
    console.log(`Fetching folders for user ${userId}, page: ${page}, and perPage: ${perPage}`);
    return this.folderRepository.findAll(userId, skip, perPage);
  }
  async search(keyword: string, userId: string, page: number, perPage: number): Promise<Folder[]> {
    const skip = (page - 1) * perPage;
  
    
    return this.folderRepository.search(keyword, userId, skip, perPage);
  }
  
   
    async findOne(id: string, userId: string) {
      return this.folderRepository.findOne(id, userId);
    }
  
  

  async create(createFolderDto: createFolderDTOlayer, user: string): Promise<createFolderDTOlayer> {
    return this.folderRepository.create(createFolderDto, user);
  }

  async update(id: string, updateFolderDto: any) {
    return this.folderRepository.update(id, updateFolderDto);
  }

  async remove(id: string) {
    return this.folderRepository.remove(id);
  }
  async shareFolder(folderId: string, userIdToShareWith: string): Promise<Folder> {
    const folder = await this.folderRepository.findById(folderId);
  
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
  
    if (folder.sharedWith.some(user => user._id === userIdToShareWith)) {
      throw new ConflictException('Folder already shared with this user');
    }
  
    const userToShareWith = await this.userService.findById(userIdToShareWith);
  
    if (!userToShareWith) {
      throw new NotFoundException('User not found');
    }
  
    folder.sharedWith.push(userToShareWith);
  
    return this.folderRepository.update(folderId, folder);
  }
  
async getSharedFoldersForUser(userId: string): Promise<Folder[]> {
  return this.folderRepository.getSharedFoldersForUser(userId);
}


async ignoreAccess(folderId: string, userIdToIgnore: string): Promise<Folder> {
  console.log('Folder ID:', folderId);
  console.log('User ID to ignore:', userIdToIgnore);

  const folder = await this.folderRepository.findById(folderId);

  if (!folder) {
    console.log('Folder not found');
    throw new NotFoundException('Folder not found');
  }

  folder.sharedWith = folder.sharedWith.filter(user => user._id.toString() !== userIdToIgnore);

  const updatedFolder = await this.folderRepository.update(folderId, folder);

  try {
    const userToIgnore = await this.userService.findById(userIdToIgnore);
    
    if (!userToIgnore) {
      throw new NotFoundException('User not found');
    }

    const userEmail = userToIgnore.email;

    const subject = 'Accès au dossier ignoré';
    const text = 'Vous avez été ignoré lors de l\'accès à un dossier.';
    await this.emailService.sendEmail(userEmail, subject, text);
    console.log('E-mail envoyé à l\'utilisateur ignoré avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail à l\'utilisateur ignoré :', error);
  }

  return updatedFolder;
}



async getFolderCreationData(): Promise<{ date: Date, folderCount: number }[]> {
  return this.folderRepository.aggregateFolderCreationData();
}
async updateFolderAccess(folderId: string): Promise<boolean> {
  try {
    const folder = await this.folderRepository.findById(folderId);
    
    if (!folder) {
      throw new Error('Folder not found');
    }
    
    const newAccess = folder.access === 'update' ? 'view' : 'update';
    await this.folderRepository.update(folderId, { access: newAccess });
    return true;
  } catch (error) {
    console.error('Failed to update folder access:', error);
    return false;
  }
}



}


