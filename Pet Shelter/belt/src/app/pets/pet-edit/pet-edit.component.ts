import { Component, OnInit } from '@angular/core';

import { Pet } from '../../models/pet';

import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { PetService } from '../../services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  validationErrors: string[] = [];
  pet: Pet;

  constructor(
    private route: ActivatedRoute,
    private readonly petService: PetService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.petService.getPet(id)),
      )
      .subscribe(pet => {
        console.log('pet from api', pet);
        this.pet = pet;
      });
  }

  onSubmit(event: Event, form: NgForm) {
    console.log('editing pet', { ...form.value, _id: this.pet._id });

    this.petService
      .updatePet({ ...form.value, _id: this.pet._id })
      .subscribe(updatedPet => {
        console.log('updated book', updatedPet);

        this.router.navigate(['/pets', updatedPet._id]);

        error: error => this.handleErrors(error.error);
      });
  }
  private handleErrors(errors: string[] | string) {
    this.validationErrors = Array.isArray(errors) ? errors : [errors];
  }
}
