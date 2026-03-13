<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Welcome');
    }
 
    public function work(): Response
    {
        return Inertia::render('Work');
    }
 
    public function about(): Response
    {
        return Inertia::render('About');
    }
 
    public function skills(): Response
    {
        return Inertia::render('Skills');
    }
 
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }
}
