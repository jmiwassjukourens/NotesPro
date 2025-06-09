import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { NoteBaseComponent } from '../note-base/note-base.component';
import { NoteService } from '../../services/notes/notes.services';
import { TagService } from '../../services/tags/tag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../models/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [CommonModule, NoteBaseComponent],
  template: `<app-note-base 
              [notes]="notes" 
              [isArchiveView]="true"
              (onArchiveToggle)="unarchiveNote($event)" 
              (onDelete)="deleteNote($event)">
             </app-note-base>`
})
export class ArchivedNotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getArchivedNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  unarchiveNote(id: number): void {
    this.noteService.unarchiveNote(id).subscribe(() => {
      this.loadNotes();
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.loadNotes();
    });
  }
}