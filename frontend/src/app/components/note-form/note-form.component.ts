import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../models/tag';
import { Note } from '../../models/note';
import { TagService } from '../../services/tags/tag.service';
import { NoteService } from '../../services/notes/notes.services';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  title = '';
  content = '';
  selectedTags: Tag[] = [];
  tagToAdd: Tag | null = null;
  allTags: Tag[] = [];

  archived = false; // ✅ Se agrega propiedad archived

  isEditMode = false;
  editingNoteId: number | null = null;

  constructor(
    private tagService: TagService,
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tagService.getTags().subscribe(tags => {
      this.allTags = tags;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.noteService.getNoteById(+idParam).subscribe(note => {
        if (note) {
          this.isEditMode = true;
          this.editingNoteId = note.id;
          this.title = note.title;
          this.content = note.content;
          this.selectedTags = [...note.tags];
          this.archived = note.archived; // ✅ Cargar estado archivado
        }
      });
    }
  }

  addTag() {
    if (this.tagToAdd && !this.selectedTags.find(t => t.id === this.tagToAdd!.id)) {
      this.selectedTags.push(this.tagToAdd);
    }
    this.tagToAdd = null;
  }

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
  }

  onSubmit() {
    if (!this.title || !this.content) return;

    const baseNote = {
      title: this.title,
      content: this.content,
      archived: this.archived, // ✅ Incluir estado archivado
      tags: this.selectedTags
    };

    if (this.isEditMode && this.editingNoteId !== null) {
      const note: Note = {
        id: this.editingNoteId,
        ...baseNote
      };

      this.noteService.updateNote(note).subscribe({
        next: () => this.router.navigate(['/notes']),
        error: err => console.error('Error updating note:', err)
      });
    } else {
      this.noteService.addNote(baseNote as Omit<Note, 'id'>).subscribe({
        next: () => this.router.navigate(['/notes']),
        error: err => console.error('Error creating note:', err)
      });
    }
  }
}
