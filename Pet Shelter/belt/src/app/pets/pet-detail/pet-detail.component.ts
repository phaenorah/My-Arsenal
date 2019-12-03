import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Pet } from '../../models/pet';
import { PetService } from '../../services';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  pets: Pet[] = [];
  numberOfLikes = 0;

  @Input()
  pet: Pet;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
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
  onDelete(pet: Pet): void {
    console.log('deleting pet', pet);
    this.petService.removePet(pet._id).subscribe(deletedPet => {
      console.log('deleted pet', deletedPet);

      this.pets = this.pets.filter(
        currentPet => currentPet._id !== deletedPet._id,
      );
      this.router.navigateByUrl('/');
    });
  }
  likeButtonClick() {
    this.pet.numberOfLikes++;
    this.petService.updatePet(this.pet).subscribe(updatedPet => {
      this.pet = updatedPet;
    });
  }
}
