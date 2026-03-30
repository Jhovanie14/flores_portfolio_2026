<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
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
        $projects = Project::published()->ordered()->get();

        return Inertia::render('Work', [
            'projects' => $projects,
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function skills(): Response
    {
        $skills = Skill::ordered()->get();

        return Inertia::render('Skills', [
            'skills' => $skills,
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function send(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Message::create($validated);

        return back()->with('success', 'Your message has been sent!');
    }
}
