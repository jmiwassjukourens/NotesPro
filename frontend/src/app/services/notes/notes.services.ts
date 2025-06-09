import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../../models/note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/api/notes'; 

  constructor(private http: HttpClient) {}  

  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/active`);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/archived`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  addNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }


  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }

  archiveNote(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/archive`, {});
  }

  unarchiveNote(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/unarchive`, {});
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
