<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestsController extends Controller
{
    //

    public function index(Request $request)
    {
        $user = auth()->guard('api')->user();

        if (!$user) {
            return response(['data' => 'You are not logged in'], 401);
        }

        $requests = Requests::where('user_id', $user->id)->get();

        if (!$requests) {
            return response(['data' => 'No Requests found on you'], 404);
        }

        return response($requests, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $user = auth()->guard('api')->user();
        if (!$user) {
            return response('You are not logged in, please try again', 400);
        }
        $validator = Validator::make($data, [
            'garage_id' => 'required',
            'requested_address' => 'required',
            'requested_pincode' => 'required',
            'repair_for' => 'required'
        ]);


        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        $data['user_id'] = $user->id;
        $request = Requests::create($data);
        return response($request, 200);
    }
}
