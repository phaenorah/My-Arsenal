import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = '/api/pets';

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, pet);
  }

  getPet(petId: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/${petId}`);
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.baseUrl}/${pet._id}`, pet);
  }

  removePet(petId: string): Observable<Pet> {
    return this.http.delete<Pet>(`${this.baseUrl}/${petId}`);
  }
}
