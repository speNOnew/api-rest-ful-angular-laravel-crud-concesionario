<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Helpers\JwtAuth;
use App\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
    	//Recojemos los valores del json y lo formateamos
    	$json = $request->input('json', null);
    	$params = json_decode($json);
    	//Guardamos los datos en las variables correspondientes de no ser nulos
    	$email = (!is_null($json) && isset($params->email)) ? $params->email : null;
    	$name = (!is_null($json) && isset($params->name)) ? $params->name : null;
    	$surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
    	$password = (!is_null($json) && isset($params->password)) ? $params->password : null;
    	$role = 'ROLE_USER';
    	//Comprobaoms que los datos no esten nulos para guardarlos
    	if (!is_null($email) && !is_null($name) && !is_null($password) ) 
    	{
    		//Crear el usuario
    		$user = new User();
    		$user->email = $email;
    		$user->name = $name;
    		$user->surname = $surname;
    		$user->role = $role;
    		//Encriptacion de contraseña
    		$pwd = hash('sha256', $password);
    		$user->password = $pwd;
    		//Comprobar si existe el usuario y si no existe lo guardamos
    		$isset_user = User::where('email', '=', $email)->first();
    		if (is_null($isset_user)) 
    		{
    			$user->save();
    			$data = array
    			(
    				'status' => 'success',
    				'code' => 200,
    				'message' => 'Usuario creado con éxito'
    			);

    		}
    		else
    		{
    			$data = array
    			(
    				'status' => 'error',
    				'code' => 400,
    				'message' => 'Usuario duplicado, no puede registrarse'
    			);
    		}
    	}
    	else
    	{
    		$data = array
			(
				'status' => 'error',
				'code' => 400,
				'message' => 'Usuario no creado'
			);
    	}
    	return response()->json($data, 200);
    }

    public function login(Request $request)
    {
    	//Sacamos el objeto del helpers de tokens
    	$jwt = new JwtAuth();
    	//Recibimos POST
    	$json = $request->input('json', null);
    	$params = json_decode($json);
    	//Asignamos los datos a las variables
    	$email = (!is_null($json) && isset($params->email)) ? $params->email : null;
    	$password = (!is_null($json) && isset($params->password)) ? $params->password : null;
    	$getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;
    	//Cifrar contraseña
    	$pwd = hash('sha256', $password);
    	//Logueamos de todo estar correcto (Enviamos el tokkn)
    	if (!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false'))
    	{
    		$signup = $jwt->signup($email, $pwd);
    	}
    	elseif ($getToken != null) 
    	{
    		$signup = $jwt->signup($email, $pwd, $getToken);
    	}
    	else
    	{
    		$signup = array('status' => 'error', 'message' => 'Envia tus datos por POST');
    	}
    	return response()->json($signup, 200);
    }
}
