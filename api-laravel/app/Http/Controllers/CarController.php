<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Helpers\JwtAuth;
use App\Car;
use App\User;

class CarController extends Controller
{
    public function index(Request $request)
    {
		//Mostrar todos los registros
    	$cars = Car::all()->load('user');
   		$data = array('cars' => $cars, 'status' => 'success', 'code' => 200);
    	return response()->json($data, 200);
    }
    public function show($id)
    {
    	//Mostrar registro en especifico
    	$car = Car::find($id);
		if (is_object($car)) 
		{
			$car = Car::find($id)->load('user');
			return response()->json(array('car' => $car, 'status' => 'success'), 200);
		}
		else
		{
			return response()->json(array('message' => 'El vehiculo no existe', 'status' => 'error'), 200);
		}
    }
    public function store(Request $request)
    {
    	//Obtener token
    	$hash = $request->header('Authorization', null);
    	$jwtAuth = new JwtAuth();
    	$checkToken = $jwtAuth->checkToken($hash);
    	//Si viene token permitir interaccion
    	if ($checkToken) 
    	{
    		//Conseguimos el usuario identificando
    		$user = $jwtAuth->checkToken($hash, true);
    		//Recogemos datos de POST
    		$json = $request->input('json', null);
    		$params = json_decode($json);
    		$params_array = json_decode($json, true);
    		//Validamos errores
    		$validate = \Validator::make($params_array, 
    		[
    			'title' => 'required',
    			'description' => 'required',
    			'price' => 'required',
    			'status' => 'required'
    		]);
    		if ($validate->fails()) 
    		{
    			return response()->json($validate->errors(), 400);
    		}
    		//Guardar coche
			$car = new Car();
			$car->user_id = $user->sub;
    		$car->title = $params->title;
    		$car->description = $params->description;
    		$car->price = $params->price;
    		$car->status = $params->status;
    		$car->save();
    		$data = array('car' => $car, 'status' => 'success', 'code' => 200);
    	}
    	else
    	{
    		//Devolver error en caso de que falle el login
    		$data = array('message' => 'Fallo el login', 'status' => 'error', 'code' => 400);
    	}
    	return response()->json($data, 200);
    }
    public function update($id, Request $request)
    {
    	//token y validacion de token
    	$hash = $request->header('Authorization', null);
    	$jwt = new JwtAuth();
    	$checkToken = $jwt->checkToken($hash, null);
    	//Obtener datos de la peticion de haber token
    	if ($checkToken) 
    	{
    		//Recogemos datos de POST
    		$json = $request->input('json', null);
    		$params = json_decode($json);
    		$params_array = json_decode($json, true);
    		//Validamos los datos
    		$validate = \Validator::make($params_array, 
    		[
    			'title' => 'required',
    			'description' => 'required',
    			'price' => 'required',
    			'status' => 'required'
    		]);
    		if ($validate->fails()) 
    		{
    			return response()->json($validate->errors(), 400);
    		}
			//No pedir modificacion de estos campos para posibles errores
			unset($params_array['id']);
			unset($params_array['user_id']);
			unset($params_array['created_at']);
			unset($params_array['user']);
    		//Actualizar el registro
    		$car = Car::where('id', $id)->update($params_array);
    		$data = array('car' => $params, 'status' => 'success', 'code' => 200);
    	}
    	//Si no existe el token
    	else
    	{
    		//Devolvemos error
    		$data = array('message' => 'Login incorrecto', 'status' => 'error', 'code' => 300);
    	}
    	return response()->json($data, 200);
    }
    public function destroy($id, Request $request)
    {
    	//token y validacion de token
    	$hash = $request->header('Authorization', null);
    	$jwt = new JwtAuth();
    	$checkToken = $jwt->checkToken($hash, null);
    	//Obtener datos de la peticion de haber token
    	if ($checkToken) 
    	{
    		//Encontrar registro
    		$car = Car::find($id);
    		//Eliminar registro
    		$car->delete();
    		//Devolver respuesta
    		$data = array('car' => $car, 'status' => 'success', 'code' => 200);
    	}
    	//Si no existe el token
    	else
    	{
    		//Devolvemos error
    		$data = array('message' => 'Login incorrecto', 'status' => 'error', 'code' => 300);
    	}
    	return response()->json($data, 200);
    }
}