<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garage extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'address', 'pinCode', 'rating', 'phone', 'visiting_charges', 'experience_in', 'image', 'created_by'];
}
