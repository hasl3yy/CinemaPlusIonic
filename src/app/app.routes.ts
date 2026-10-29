import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    // Aquí debes cargar el componente de las pestañas (TabsPage) 
    // en lugar de cargar directamente 'tabs.routes'
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./tab1/tab1.page').then((m) => m.PeliculasComponent)
      },
      {
        path: 'tab2',
        loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./tab3/tab3.page').then((m) => m.Tab3Page)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
