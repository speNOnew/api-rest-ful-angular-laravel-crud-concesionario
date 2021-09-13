import { Component, OnInit, DoCheck } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'app';
  public identity;
  public token;

  constructor( private _userServices: UserService){
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
  }

  ngOnInit(){
    console.log('app.component Cargado')
  }

  ngDoCheck(){
    //Detectamos los cambios en la sesion para cargar la pagina
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
  }

}
