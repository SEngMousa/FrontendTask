import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FileLoaderComponent } from './file-loader.component';
import { FileService } from '../../services/file.service';
import { of, throwError } from 'rxjs';

describe('FileLoaderComponent', () => {
  let component: FileLoaderComponent;
  let fixture: ComponentFixture<FileLoaderComponent>;
  let fileService: FileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileLoaderComponent],
      providers: [FileService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLoaderComponent);
    component = fixture.componentInstance;
    fileService = TestBed.inject(FileService);
    fixture.detectChanges();
  });

  it('should clear error message when file is successfully loaded', () => {
    spyOn(fileService, 'readFile').and.returnValue(of({ content: 'test' }));
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    component.errorMessage = 'Previous error message';
    component.onFileSelected({ target: { files: [file] } });
    expect(component.errorMessage).toBeNull();
  });

  it('should set error message when file loading fails', () => {
    spyOn(fileService, 'readFile').and.returnValue(
      throwError('File loading error')
    );
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    component.errorMessage = null;
    component.onFileSelected({ target: { files: [file] } });
    expect(component.errorMessage!).toEqual('Failed to load file');
  });

  it('should set error message when invalid file type is selected', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    component.errorMessage = null;
    component.onFileSelected({ target: { files: [file] } });
    expect(component.errorMessage!).toEqual(
      'Invalid file type. Please select a .txt file.'
    );
  });

  it('should set file content when file is successfully loaded', () => {
    const fileContent = { content: 'Lorem ipsum' };
    spyOn(fileService, 'readFile').and.returnValue(of(fileContent));
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    component.fileContent = null;
    component.onFileSelected({ target: { files: [file] } });
    expect(component.fileContent!).toEqual(fileContent);
  });

  it('should log success message when file is successfully loaded', () => {
    spyOn(fileService, 'readFile').and.returnValue(
      of({ content: 'Lorem ipsum', wordCount: 2 })
    );
    spyOn(component.logger, 'log');
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    component.onFileSelected({ target: { files: [file] } });
    expect(component.logger.log).toHaveBeenCalledWith(
      'File loaded successfully.'
    );
  });

  it('should log error message when file loading fails', () => {
    spyOn(fileService, 'readFile').and.returnValue(
      throwError('File loading error')
    );
    spyOn(component.logger, 'error');
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    component.onFileSelected({ target: { files: [file] } });
    expect(component.logger.error).toHaveBeenCalledWith(
      'Error loading file:File loading error'
    );
  });
});
