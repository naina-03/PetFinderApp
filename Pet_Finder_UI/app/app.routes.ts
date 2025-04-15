import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { MyPetsComponent } from '../my-pets/my-pets.component';
import { AuthGuard } from '../auth.guard';
import { LoginComponent } from '../login/login.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'my-pets',
        component: MyPetsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-pet',
        component: AddPetComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
