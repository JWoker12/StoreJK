import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CheckoutModule } from './components/checkout/checkout.module';
// import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
    { path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
    { path: 'checkout', loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule) },
    // { path: 'products', component: ProductsComponent },
    // { path: 'checkout', component: CheckoutModule },
    { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
