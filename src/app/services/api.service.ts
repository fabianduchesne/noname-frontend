import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DbStatus {
  postgres_version?: string;
  error?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  comment: string;
}

export interface ContactResponse {
  success?: boolean;
  submission_id?: number;
  email_sent_to?: string;
  timestamp?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkDb(): Observable<DbStatus> {
    return this.http.get<DbStatus>(`${this.base}/db-hello`);
  }

  submitContact(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.base}/contact`, payload);
  }
}
