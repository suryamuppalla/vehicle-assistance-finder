<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->increments('id', true);
            // $table->unsignedInteger('user_id');
            // $table->unsignedInteger('mechanic_id');
            $table->string('requested_address');
            $table->integer('requested_pincode');
            $table->timestamps();
        });

        Schema::table('requests', function(Blueprint $table) {

            // $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('garage_id')->constrained('garages')->onUpdate('cascade')->onDelete('cascade');
            // $table->foreign('user_id')->references('id')->on('users');
            // $table->foreign('mechanic_id')->references('id')->on('mechanics');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requests');
    }
};
