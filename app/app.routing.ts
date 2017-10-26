import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { ProductListComponent, ProductAddEditComponent } from './products/index';
import { OrderListComponent, OrderAddEditComponent } from './orders/index';
import { OrderCListComponent, OrderCAddEditComponent } from './orderCanceled/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'products',
        component: ProductListComponent,
        children: [
            { path: 'add', component: ProductAddEditComponent },
            { path: 'edit/:id', component: ProductAddEditComponent }
        ]
    },
    {
        path: 'orders',
        component: OrderListComponent,
        children: [
            { path: 'add', component: OrderAddEditComponent },
            { path: 'edit/:id', component: OrderAddEditComponent }
        ]
    },
    {
        path: 'ordersCanceled',
        component: OrderCListComponent,
        children: [
            { path: 'add', component: OrderCAddEditComponent },
            { path: 'edit/:id', component: OrderCAddEditComponent }
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
