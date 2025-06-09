import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent) },
    { path: 'products/:id', loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent), data: { title: '' } },
    { path: 'detail/:id', loadComponent: () => import('./pages/detail-page/detail-page.component').then(m => m.DetailPageComponent) },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
