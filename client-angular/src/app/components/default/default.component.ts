import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';


@Component
({
    selector: 'default',
    templateUrl: './default.component.html',
    providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit
{
    public title: string;
    public cars: Array<Car>;
    public token;

    constructor(
        private _userService: UserService, 
        private _route: ActivatedRoute, 
        private _router: Router, 
        private _carService: CarService)
    {
        this.title = 'Inicio';
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        console.log('default.component cargado correctamente');
        //Hacemos la peticion de mostrar vehiculos y nos suscribimos
        this.show()
    }

    show(){
        this._carService.show().subscribe(
            response => {
                //De ser satisfactoria la respuesta almacenamos los datos
                if (response.status == 'success') {
                    this.cars = response.cars;
                }
                console.log(response);
            },
            error => {
                console.log(error)
            }
        )
    }

    deleteCar(id){
        this._carService.deleteCar(this.token, id).subscribe(
            response => {
                console.log(response);
                this.show()
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}