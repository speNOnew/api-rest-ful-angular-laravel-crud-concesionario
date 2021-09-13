import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Car } from '../../models/car';
import { User } from '../../models/user';
import { CarService } from '../../services/car.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  styleUrls: ['./car-edit.component.css'],
  providers: [UserService, CarService]
})
export class CarEditComponent implements OnInit {

  public car: Car;
  public page_title: string;
  public token;
  public status_car;

  constructor(
    private _userService: UserService,
    private _carService: CarService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { this.token = this._userService.getToken() }

  ngOnInit() {
    //Obtenemos el id del parametro y se lo pasamos al metodo que obtiene el objeto del carro por el id
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getCar(id);
      }
    )
  }

  getCar(id){
    //Hacemos la peticion a la api pasandole los parametros y nos suscribimos a la respuesta
    this._carService.getCar(id).subscribe(
      response => {
        if (response.status == 'success') {
          this.car = response.car;
          this.page_title = 'Editanto: ' + this.car.title;
        }else{
          this._router.navigate(['']);
        }
      },error => { console.log(<any>error) }
    );
  }

  onSubmit(form){
    //Cargamos el formulario y enviamos la peticion para modificar los campos del registro
    console.log(this.car);
    this._carService.updateCar(this.token, this.car, this.car.id).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.status_car = 'success'
          this._router.navigate(['car/', this.car.id]);
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
