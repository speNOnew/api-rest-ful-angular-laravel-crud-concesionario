import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from "../../models/user";
import { UserService } from '../../services/user.service';
import { Car } from "../../models/car";
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService, UserService]
})
export class CarDetailComponent implements OnInit {

  // public title_page;
  public car: Car;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) { 
    // this.title = 'Detalles del vehiculo';
  }

  ngOnInit() {
    this.getCar();
  }

  getCar(){
    //Tomamos el parametro que viene por la ruta
    this._route.params.subscribe( 
      params => {
        //Guardamos en una variable "id" el id que viene en la ruta
        let id = +params['id'];
        //Hacemos la peticion al servidor
        this._carService.getCar(id).subscribe(
          response =>{
            //Si la respuesta es correcta, guardamos el objeto
            if (response.status == 'success') {
              this.car = response.car;
              console.log(this.car);
            }else{
              this._router.navigate(['']);
            }
          },
          error =>{console.log(<any>error)}
        )
      }
    )
  }
}
