import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component
({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit
{
    public title: string;
    public user: User;
    public status: string;

    constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router)
    {
        this.title = 'Registrate';
        this.user = new User('', '', '', '');
    }

    onSubmit(form)
    {
        // console.log(this.user);
        // console.log(this._userService.pruebas());
        this._userService.register(this.user).subscribe(
            response => { 
                if (response.status == 'success'){
                    this.status = response.status;
                    //Vaciar  el formulario
                    this.user = new User('', '', '', '');
                    form.reset()
                }else{
                    this.status = 'error';
                }
             },error => { console.log(<any>error) }
             );
    }

    ngOnInit(){
        console.log('register.component cargado correctamente')
    }
}