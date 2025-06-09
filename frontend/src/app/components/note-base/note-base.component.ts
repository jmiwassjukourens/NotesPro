import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Note } from '../../models/note';
import { Tag } from '../../models/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-base',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './note-base.component.html',
  styleUrl: './note-base.component.css'
})
export class NoteBaseComponent {
  @Input() notes: Note[] = [];
  @Input() isArchiveView: boolean = false;

  @Output() onArchiveToggle = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  selectedTags: Tag[] = [];
  noteToDelete: number | null = null;
  tagToAdd: Tag | null = null;

  get availableTags(): Tag[] {
    const tagMap = new Map<string, Tag>();
    this.notes.forEach(note => {
      note.tags.forEach(tag => tagMap.set(tag.name, tag));
    });
    return Array.from(tagMap.values());
  }

  get filteredNotes(): Note[] {
    if (this.selectedTags.length === 0) return this.notes;
    return this.notes.filter(note =>
      this.selectedTags.every(selectedTag =>
        note.tags.some(tag => tag.name === selectedTag.name)
      )
    );
  }

  confirmDelete(noteId: number) {
    this.noteToDelete = noteId;
  }

  deleteNote() {
    if (this.noteToDelete !== null) {
      this.onDelete.emit(this.noteToDelete);
      this.noteToDelete = null;
    }
  }

  cancelDelete() {
    this.noteToDelete = null;
  }

  triggerArchiveToggle(noteId: number) {
    console.log('Toggling archive for note id:', noteId);
    this.onArchiveToggle.emit(noteId);
  }

  addTagToSelection() {
    if (this.tagToAdd && !this.selectedTags.find(t => t.name === this.tagToAdd!.name)) {
      this.selectedTags.push(this.tagToAdd);
    }
    this.tagToAdd = null;
  }

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name);
  }

  clearFilter() {
    this.selectedTags = [];
  }
}
