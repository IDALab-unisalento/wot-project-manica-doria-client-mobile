import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attachment } from '../models/attachment';
import { Observable } from 'rxjs';
import { ApiVariables } from '../common/ApiVariables';

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

  constructor(private http: HttpClient) { }

  getAllAttachment(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.getAllAttachmentUrl);
  }

  getAttachmentById(id: string): Observable<Attachment> {
    return this.http.get<Attachment>(this.getAttachmentByIdUrl + id);
  }

  saveAttachment(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(this.saveAttachmentUrl, attachment, httpOptions);
  }

  deleteAttachment(id: string): Observable<Attachment> {
    return this.http.delete<Attachment>(this.deleteAttachmentUrl + id);
  }
}
