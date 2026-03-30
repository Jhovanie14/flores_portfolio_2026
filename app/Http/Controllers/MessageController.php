<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $messages = Message::latest()->get();

        return Inertia::render('Admin/Messages', [
            'messages' => $messages,
            'unreadCount' => Message::unread()->count(),
        ]);
    }

    public function markRead(Message $message)
    {
        $message->update(['read_at' => now()]);

        return back();
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return back();
    }
}
