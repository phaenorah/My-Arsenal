import { Component, OnInit } from '@angular/core';

import { Pet } from '../../models/pet';
import { PetService } from '../../services';

import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: Pet[] = [];
  selectedPet: Pet;

  constructor(
    private petService: PetService,
    private readonly router: Router,
    private readonly auth: AuthService,
    ) { }

  ngOnInit() {
    this.petService.getPets()
      .subscribe(pets => {
        console.log('pets?', pets, this);
        this.pets = pets;
      });
  }
  onSelect(pet: Pet) {
    console.log('selecting pet', pet);
    this.selectedPet = this.selectedPet === pet ? null : pet;
  }

  onCreate(pet: Pet) {
    console.log('creating pet', pet);

    this.petService
      .createPet(pet)
      .subscribe(createdPet => (this.pets = [...this.pets, createdPet]));
  }

  onEnter(pet: Pet) {
    console.log(`entered pet ${pet.name}`);
  }

  onEvent(event: Event) {
    console.log('eventing');
    event.stopPropagation();
  }
}
