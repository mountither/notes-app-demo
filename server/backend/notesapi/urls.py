from rest_framework.authtoken.views import obtain_auth_token

from .views.noteViews import CreateNote, DeleteNote, ListNotes, NoteDetail, UpdateNote

from .views.authViews import RegisterUserAPIView, SignOutAPIView
from django.urls import re_path, path

urlpatterns = [
    re_path(r'^auth/signin/$',
            obtain_auth_token,
            name='auth_user_signin',),
    re_path(r'^auth/signup/$',
            RegisterUserAPIView.as_view(),
            name='auth_user_create',),
    re_path(r'^auth/signout/$',
            SignOutAPIView.as_view(),
            name='auth_user_logout',),
    path('notes-list/',
         ListNotes.as_view(),
         name="notes_list"
         ),
    path('note-detail/<str:id>/',
         NoteDetail.as_view(),
         name="note_detail"
         ),

    path('note-create/',
         CreateNote.as_view(),
         name="note_create"
         ),
    path('note-update/<str:id>/',
         UpdateNote.as_view(),
         name="note_update"),
    path('note-delete/<str:id>/',
         DeleteNote.as_view(),
         name="note_delete"
         )
]
