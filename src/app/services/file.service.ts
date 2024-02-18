import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileContent } from '../models/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  readFile(file: File): Observable<FileContent> {
    return new Observable<FileContent>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content: string = reader.result as string;
        observer.next({ content });
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsText(file);
    }).pipe(
      catchError((error) => {
        return throwError('Error reading file: ' + error.message);
      })
    );
  }
}
