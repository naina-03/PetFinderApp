import { Component } from '@angular/core';
import { PetService } from '../service/pet.service';
import { Pet } from '../model/pet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.css'
})
export class MyPetsComponent {

  pets: Pet[] = [];

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit() {
    this.getMyPets();
  }

  getMyPets() {
    this.petService.getMyPets().subscribe({
      next: (pets) => this.pets = pets,
      error: (err) => console.error('Failed to load pets:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  markAsFound(id: number) {
    this.petService.markAsFound(id).subscribe(() => {
      this.getMyPets();
    });
  }
}