<?php

namespace App\Http\Controllers;

use App\Models\Stack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StackController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Stack', [
            'stacks' => Stack::ordered()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'image'      => 'nullable|image|max:2048',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['sort_order'] ??= Stack::max('sort_order') + 1;

        if ($request->hasFile('image')) {
            $validated['image'] = '/storage/' . $request->file('image')->store('stacks', 'public');
        }

        Stack::create($validated);

        return back();
    }

    public function update(Request $request, Stack $stack)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'image'      => 'nullable|image|max:2048',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($stack->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $stack->image));
            }
            $validated['image'] = '/storage/' . $request->file('image')->store('stacks', 'public');
        }

        $stack->update($validated);

        return back();
    }

    public function destroy(Stack $stack)
    {
        if ($stack->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $stack->image));
        }

        $stack->delete();

        return back();
    }
}
