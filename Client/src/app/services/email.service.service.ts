import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://your-api-endpoint.com/send-email'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const emailData = {
      to,
      subject,
      body
    };
    return this.http.post(this.apiUrl, emailData);
  }
}
