import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./authentication/auth.routes').then((m) => m.authRoutes),
  },
]
