import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService],
    });
    fileService = TestBed.inject(FileService);
  });

  it('should read file content', (done) => {
    const file = new File(['Hello, World!'], 'test.txt', {
      type: 'text/plain',
    });

    fileService.readFile(file).subscribe((fileContent) => {
      expect(fileContent.content).toBe('Hello, World!');
      done();
    });
  });
});
