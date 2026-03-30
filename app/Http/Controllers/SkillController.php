<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        $skills = Skill::ordered()->get();

        return Inertia::render('Admin/Skills', [
            'skills' => $skills,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'category'   => 'required|string|max:100',
            'level'      => 'required|integer|min:0|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['sort_order'] ??= Skill::max('sort_order') + 1;

        Skill::create($validated);

        return back();
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'category'   => 'required|string|max:100',
            'level'      => 'required|integer|min:0|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        $skill->update($validated);

        return back();
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return back();
    }
}
