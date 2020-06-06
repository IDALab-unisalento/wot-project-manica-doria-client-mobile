import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Attachment} from '../models/attachment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllAttachment = 'http://localhost:8080/api/attachment/getAll';
const getAttachmentById = 'http://localhost:8080/api/attachment/getById/';
const saveAttachment = 'http://localhost:8080/api/attachment/save';
const deleteAttachment = 'http://localhost:8080/api/attachment/delete/';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  getAllAttachment(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(getAllAttachment);
  }

  getAttachmentById(id: string): Observable<Attachment> {
    return this.http.get<Attachment>(getAttachmentById + id);
  }

  saveAttachment(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(saveAttachment, attachment, httpOptions);
  }

  deleteAttachment(id: string): Observable<Attachment> {
    return this.http.delete<Attachment>(deleteAttachment + id);
  }
}
