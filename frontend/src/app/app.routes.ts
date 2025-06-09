import { Routes } from '@angular/router'; 
import { AuthGuard } from './auth/guards/auth';
import { LoginGuard } from './auth/guards/login';

export const routes: Routes = [
  {
    path: 'notes',
    loadComponent: () => import('./components/active-notes/active-notes.component').then(c => c.ActiveNotesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'notes-archived',
    loadComponent: () => import('./components/archived-notes/archived-notes.component').then(c => c.ArchivedNotesComponent),
    canActivate: [AuthGuard],
  },
    {
    path: 'create-note',
    loadComponent: () =>
      import('./components/note-form/note-form.component').then(m => m.NoteFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-note/:id',
    loadComponent: () =>
      import('./components/note-form/note-form.component').then(m => m.NoteFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/componentLogin/login.component').then(c => c.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
