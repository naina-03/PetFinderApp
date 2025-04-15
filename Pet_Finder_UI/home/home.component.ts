import { Component } from '@angular/core';
import { Pet } from '../model/pet.model';
import { PetService } from '../service/pet.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pets: Pet[] = [];
  isLoggedIn: boolean = false;

  constructor(private petService: PetService, private router: Router, private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });

    if (this.isLoggedIn) {
      this.loadPets();
    }
  }

  navigateTo(path: string): void {
    this.router.navigate(['/home', path]);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  loadPets(): void {
    this.petService.getAllPets().subscribe((data) => {
      this.pets = data;
    });
  }
}