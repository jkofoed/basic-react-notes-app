<?php

namespace App\Http\Controllers;

use App\Models\Notation;
use Illuminate\Http\Request;

class NotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notes = Notation::all();
        
        return ["status" => 1, "data" => $notes];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $request->validate(["note" => "required"]);
       $note = Notation::create($request->all());

       return [ "status" => 1, "data" => $note];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notation  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Notation $note)
    {
        return [ "status" => 1, "data" => $note];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notation  $note
     * @return \Illuminate\Http\Response
     */
    public function edit(Notation $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notation  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notation $note)
    {
        $request->validate(["note" => "required"]);
        $note;
 
        return [ "status" => 1, "data" => $note, "msg" => "Note updated!"];

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notation  $notation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notation $note)
    {
        $note->delete();
        return[ "status" => 1, "data" => $note, "msg" => "Note has been deleted!"];
    }
}
