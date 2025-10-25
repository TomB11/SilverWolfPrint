import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'products/:id', loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent) },
    { path: 'detail/:id', loadComponent: () => import('./pages/detail-page/detail-page.component').then(m => m.DetailPageComponent) },
    { path: 'cart', loadComponent: () => import('./pages/cart-page/cart-page.component').then(m => m.CartPageComponent) },
    { path: 'about', loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent) },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
