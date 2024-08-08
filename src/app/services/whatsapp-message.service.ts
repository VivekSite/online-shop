import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WhatsappMessageService {
  private messageUrl: string = `${environment.BASE_URL}/twilio`;

  constructor(private http: HttpClient) {}

  SendWhatsappMessage(mobile_number: string, message: string) {
    this.http.post<{ success: boolean; message: string }>(
      `${this.messageUrl}`,
      { mobile_number, message }
    );
  }
}
