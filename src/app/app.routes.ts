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
    path: 'funciones',
    loadComponent: () => import('./funciones/funciones.component').then((m) => m.FuncionesComponent)
  },

  // Si 'funciones' necesita recibir el ID de una película o función específica, hazlo así:
  // {
  //   path: 'funciones/:idPelicula',
  //   loadComponent: () => import('./funciones/funciones.page').then((m) => m.FuncionesPage)
  // },
  {
    path: 'tabs', // Es recomendable darle un path raíz a las pestañas para evitar conflictos con el path vacío ''
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
  // Ruta comodín para redirigir URLs inválidas al login
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];