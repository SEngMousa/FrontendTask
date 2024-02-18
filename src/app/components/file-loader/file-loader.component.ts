import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { LoggerService } from '../../utils/logger.service';
import { FileContent } from '../../models/file';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
})
export class FileLoaderComponent {
  errorMessage: string | null = null;
  fileContent: FileContent | null = null;

  constructor(private fileService: FileService, public logger: LoggerService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    if (!this.isValidFileType(file)) {
      this.errorMessage = 'Invalid file type. Please select a .txt file.';
      return;
    }

    this.fileService.readFile(file).subscribe(
      (content: FileContent) => {
        this.fileContent = content;
        this.errorMessage = null;
        this.logger.log('File loaded successfully.');
      },
      (error: any) => {
        this.errorMessage = 'Failed to load file';

        this.logger.error('Error loading file:' + error);
      }
    );
  }

  private isValidFileType(file: File): boolean {
    return file.type === 'text/plain';
  }
}
