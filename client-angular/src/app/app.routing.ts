import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const appRoutes: Routes = [
    //Ruta por defecto
    { path: '', component: DefaultComponent },
    //Rutas para el apartado de carros
    { path: 'ccar', component: CarNewComponent },
    { path: 'ecar/:id', component: CarEditComponent },
    { path: 'car/:id', component: CarDetailComponent },
    //Ruta de la pagina principal
    { path: 'home', component: DefaultComponent },
    //Ruta de gestion de usuarios
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //Ruta no definida
    { path: '**', component: DefaultComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
