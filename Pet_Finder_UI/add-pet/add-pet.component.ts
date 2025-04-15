import { Component } from '@angular/core';
import { Pet } from '../model/pet.model';
import { Router } from '@angular/router';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  pet = {} as Pet;
  imageUrl: string = '';
  showSuccessMessage: boolean = false;

  constructor(private router: Router, private petService: PetService) { }

  submitForm() {
    this.pet.imageUrl = this.imageUrl;
    if (!this.pet.name || !this.pet.contactInfo || !this.pet.location) {
      alert('Please fill in all required fields.');
      return;
    }
    this.petService.addPet(this.pet).subscribe({
      next: (data) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
        alert('Failed to add pet. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.pet.imageUrl = this.imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}