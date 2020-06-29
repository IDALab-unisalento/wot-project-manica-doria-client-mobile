import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Attachment } from '../models/attachment';
import { Observable, throwError } from 'rxjs';
import { ApiVariables } from '../common/ApiVariables';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private getAllAttachmentUrl = ApiVariables.apiUrlAttachment + '/getAll';
  private getAttachmentByIdUrl = ApiVariables.apiUrlAttachment + '/getById/';
  private saveAttachmentUrl = ApiVariables.apiUrlAttachment + '/save';
  private deleteAttachmentUrl = ApiVariables.apiUrlAttachment + '/delete/';
  private uploadAttachmentUrl = ApiVariables.apiUrlAttachment + '/upload/';
  private getFileAttachmentUrl = ApiVariables.apiUrlAttachment + '/getFile/';
  private getVideoUrl = ApiVariables.apiUrlAttachment + '/download';

  constructor(private http: HttpClient) { }

  private static getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];
    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }

  private static convertBase64ToBlob(base64: string) {
    const info = AttachmentService.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: info.mime });
  }

  getAllAttachment(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.getAllAttachmentUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAttachmentById(id: string): Observable<Attachment> {
    return this.http.get<Attachment>(this.getAttachmentByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveAttachment(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(this.saveAttachmentUrl, attachment, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAttachment(id: string): Observable<Attachment> {
    return this.http.delete<Attachment>(this.deleteAttachmentUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

  uploadAttachment(file: File, type: string, idStep: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<HttpEvent<any>>(this.uploadAttachmentUrl + type + '/' + idStep, formData, {responseType: 'text'} as any);

  }

  getAttachment(id: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.getFileAttachmentUrl + id);
  }

  /*
  getVideo(): any {
    return this.http.get<any>(this.getVideoUrl,  {responseType: 'text'} as any);
  }

  base64EncodeUnicode(str) {
    // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
    // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
    const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(Number('0x' + p1));
    });

    return btoa(utf8Bytes);
  }
  */
}
