<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::orderBy('sort_order')->orderByDesc('year')->get();

        return Inertia::render('Admin/Projects', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'year' => 'required|string|size:4',
            'link' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|max:5120',
            'sort_order' => 'nullable|integer',
            'is_published' => 'nullable',
        ]);

        $validated['sort_order'] ??= Project::max('sort_order') + 1;
        $validated['is_published'] = filter_var($validated['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $images = [];
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $images[] = '/storage/' . $file->store('projects', 'public');
            }
        }
        $validated['images'] = $images;

        unset($validated['new_images']);

        Project::create($validated);

        return back();
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'year' => 'required|string|size:4',
            'link' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|max:5120',
            'sort_order' => 'nullable|integer',
            'is_published' => 'nullable',
        ]);

        $validated['is_published'] = filter_var($validated['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        // Keep existing images that weren't removed
        $existingImages = $validated['existing_images'] ?? [];

        // Delete removed images from storage
        $oldImages = $project->images ?? [];
        foreach ($oldImages as $oldImage) {
            if (!in_array($oldImage, $existingImages)) {
                $path = str_replace('/storage/', '', $oldImage);
                Storage::disk('public')->delete($path);
            }
        }

        // Upload new images
        $newImages = [];
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $newImages[] = '/storage/' . $file->store('projects', 'public');
            }
        }

        $validated['images'] = array_merge($existingImages, $newImages);

        unset($validated['existing_images'], $validated['new_images']);

        $project->update($validated);

        return back();
    }

    public function destroy(Project $project)
    {
        // Clean up images
        if ($project->images) {
            foreach ($project->images as $image) {
                $path = str_replace('/storage/', '', $image);
                Storage::disk('public')->delete($path);
            }
        }

        $project->delete();

        return back();
    }
}
