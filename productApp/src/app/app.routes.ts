import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { AddProduct } from './components/add-product/add-product';
import { UpdateProduct } from './components/update-product/update-product';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: Products },
    { path: 'add-product', component: AddProduct },
    { path: 'update-product/:id', component: UpdateProduct }
];
