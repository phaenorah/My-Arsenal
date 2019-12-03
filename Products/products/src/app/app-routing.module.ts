import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromProducts from './products';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: fromProducts.ProductListComponent,
      },
      {
        path: 'new',
        component: fromProducts.ProductNewComponent,
      },
      {
        path: ':id',
        component: fromProducts.ProductDetailComponent,
      },
      {
        path: ':id/edit',
        component: fromProducts.ProductEditComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
