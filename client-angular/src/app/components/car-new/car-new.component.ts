import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
 
@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public car: Car;
  public status_car;


  constructor( private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _carService: CarService ) {
    this.page_title = 'Crear carro';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(['login']);
    } else {
      this.car = new Car('', '', '', '');
    }
  }

  onSubmit(form){
    console.log(this.car, this.token);
    this._carService.create(this.token, this.car).subscribe(
      response => {
        //Validamos la respuesta del servidor por consola
        console.log(response);
        //Si la respuesta es positiva tomamos los datos
        if (response.status == 'success') {
          this.car = response.car;
          this.status_car = response.status;
          //Limpiamos el formulario al culminar la peticion
          form.reset();
        }else{
          this.status_car = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
