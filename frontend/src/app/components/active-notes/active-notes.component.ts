import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { NoteBaseComponent } from '../note-base/note-base.component';
import { NoteService } from '../../services/notes/notes.services';

@Component({
  selector: 'app-active-notes',
  standalone: true,
  imports: [CommonModule, NoteBaseComponent],
  template: `<app-note-base 
              [notes]="notes" 
              [isArchiveView]="false"
              (onArchiveToggle)="archiveNote($event)" 
              (onDelete)="deleteNote($event)">
             </app-note-base>`
})
export class ActiveNotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getActiveNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  archiveNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      this.loadNotes();
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.loadNotes();
    });
  }
}