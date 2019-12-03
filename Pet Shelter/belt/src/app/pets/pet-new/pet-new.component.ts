import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


import { Pet } from '../../models/pet';
import { NgForm } from '@angular/forms';

import { PetService } from '../../services';

@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.css']
})
export class PetNewComponent implements OnInit {

  validationErrors: string[] = [];
  pet = new Pet();

  @Output()
  createPet = new EventEmitter<Pet>();

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();

    this.petService.createPet(this.pet).subscribe(createdPet => {
      console.log(createdPet);
      this.pet = new Pet();
      form.reset();

      this.router.navigateByUrl('/');

      error: error => this.handleErrors(error.error);
    });
  }
  private handleErrors(errors: string[] | string) {
    this.validationErrors = Array.isArray(errors) ? errors : [errors];
  }
}
