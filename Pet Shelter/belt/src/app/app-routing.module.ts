import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromPets from './pets';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    children: [
      {
        path: '',
        component: fromPets.PetListComponent,
      },
      {
        path: 'new',
        component: fromPets.PetNewComponent,
      },
      {
        path: ':id',
        component: fromPets.PetDetailComponent,
      },
      {
        path: ':id/edit',
        component: fromPets.PetEditComponent,
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
