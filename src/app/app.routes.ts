import { Routes } from '@angular/router';
import { AuthGuardService } from './services/http/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((m) => m.routes)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.routes').then((m) => m.routes),
        canActivate: [AuthGuardService]
      }
];
