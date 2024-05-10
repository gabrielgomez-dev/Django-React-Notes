from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="notes_list"),
    path("notes/<int:pk>/delete/", views.NoteDeleteView.as_view(), name="notes_delete"),
]
