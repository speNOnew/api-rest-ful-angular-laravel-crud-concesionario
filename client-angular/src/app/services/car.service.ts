import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { GLOBAL } from "./global";
import { Car } from "../models/car";

@Injectable()
export class CarService{
    public url: string;
    public identity;
    public token;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //Servicio de peticion de crear vehiculo
    create(token, car: Car): Observable<any>{
        let json = JSON.stringify(car);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'cars', params, { headers: headers });
    }

    //Servicio de peticion de mostrar los vehiculos
    show(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return  this._http.get(this.url + 'cars', { headers: headers })
    }

    //Servicio de peticion de mostrar los datos de un vehiculo en especifico
    getCar(id): Observable<any>{
        return this._http.get(this.url + 'cars/' + id);
    }

    //Servicio para la actualizacion de un registro
    updateCar(token, car, id): Observable<any> {
        let json = JSON.stringify(car);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'cars/' + id, params, { headers: headers });
    }

    //Servicio para eliminar un registro de la api
    deleteCar(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url + 'cars/' + id, { headers: headers });
    }
}