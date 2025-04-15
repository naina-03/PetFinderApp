import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../model/pet.model';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl = environment.apiUrl + '/Pets';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl + '/GetAllPets');
  }

  getMyPets(): Observable<Pet[]> {
    //const email = this.authService.getUserEmail();
    const email = localStorage.getItem('userEmail');
    const url = this.baseUrl + '/GetMyPets?email=' + email;
    return this.http.get<Pet[]>(url);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl + '/AddPet', pet);
  }

  markAsFound(id: number): Observable<void> {
    return this.http.patch<void>(this.baseUrl + '/MarkAsFound?id=' + id, {});
  }  
}