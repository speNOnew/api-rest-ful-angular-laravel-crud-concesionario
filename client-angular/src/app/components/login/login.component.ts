import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component
({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit
{
    public title: string;
    public user: User;
    public token;
    public identity;
    public status: string;

    constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router)
    {
        this.title = 'Identificate';
        this.user = new User('', '', '', '');
    }

    onSubmit(form)
    {
        //Comprobamos los datos del formulario
        console.log(this.user);
        //Hacemos la peticion de inicio de sesion
        this._userService.login(this.user).subscribe( 
            response => { 
                //Comprobamos si la identificacion es correcta
                if (response.status != 'error') {
                    this.status = 'success';
                    //Obtenemos el tokken
                    this.token = response;
                    localStorage.setItem('token', this.token);
                    //Obtenemos objeto del usuario identificado
                    this._userService.login(this.user, true).subscribe(
                        response => {
                            this.identity = response;
                            localStorage.setItem('identity', JSON.stringify(this.identity));
                            this._router.navigate(['']);
                        },
                        error => { 
                            console.log(<any>error); 
                        }
                    );
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    };
    
    logout(){
        //Comprobamos la ruta
        this._route.params.subscribe( params => {
            //Obtenemos los datos del parametro
            let logout = +params['sure'];
            //Comprobamos el contenido del parametro para remover los datos
            if (logout == 1) {
                //Removemos los datos de la sesion
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this.token = null;
                //Redireccion
                this._router.navigate(['login']);
            }
        })
    }

    ngOnInit(){
        console.log('login.component cargado correctamente')
        this.logout();
    }
}