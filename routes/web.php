<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public ──────────────────────────────────────────────────────────────────

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/work',    [PortfolioController::class, 'work']   )->name('work');
Route::get('/about',   [PortfolioController::class, 'about']  )->name('about');
Route::get('/skills',  [PortfolioController::class, 'skills'] )->name('skills');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [PortfolioController::class, 'send']  )->name('contact.send');

// ── Authenticated ────────────────────────────────────────────────────────────

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'messages' => Message::count(),
                'unread'   => Message::unread()->count(),
                'skills'   => Skill::count(),
            ],
        ]);
    })->name('dashboard');

    // Projects
    Route::get('/admin/projects',              [ProjectController::class, 'index']  )->name('admin.projects');
    Route::post('/admin/projects',             [ProjectController::class, 'store']  )->name('admin.projects.store');
    Route::put('/admin/projects/{project}',    [ProjectController::class, 'update'] )->name('admin.projects.update');
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

    // Messages
    Route::get('/admin/messages',                  [MessageController::class, 'index']    )->name('admin.messages');
    Route::patch('/admin/messages/{message}/read', [MessageController::class, 'markRead'] )->name('admin.messages.read');
    Route::delete('/admin/messages/{message}',     [MessageController::class, 'destroy']  )->name('admin.messages.destroy');

    // Skills
    Route::get('/admin/skills',              [SkillController::class, 'index']  )->name('admin.skills');
    Route::post('/admin/skills',             [SkillController::class, 'store']  )->name('admin.skills.store');
    Route::put('/admin/skills/{skill}',      [SkillController::class, 'update'] )->name('admin.skills.update');
    Route::delete('/admin/skills/{skill}',   [SkillController::class, 'destroy'])->name('admin.skills.destroy');

    // Profile
    Route::get('/profile',    [ProfileController::class, 'edit']   )->name('profile.edit');
    Route::patch('/profile',  [ProfileController::class, 'update'] )->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
