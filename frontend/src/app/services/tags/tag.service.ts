import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../models/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`);
  }

}
