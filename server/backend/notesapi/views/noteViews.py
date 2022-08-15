from datetime import datetime
from time import clock_getres
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..serializers import NoteSerializer
from ..models import Note


class ListNotes(ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.filter(author=request.user.id).order_by('-date_published').all()
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return


class NoteDetail(RetrieveAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, id):

        # only own notes can be returned
        note = Note.objects.filter(author=request.user.id).get(id=id)
        serializer = self.get_serializer(note, many=False)
        return Response(serializer.data)


class CreateNote(CreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(author=self.request.user)

        return Response(serializer.data)


class UpdateNote(UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        note = Note.objects.filter(author=request.user.id).get(id=id)
        serializer = self.get_serializer(instance=note, data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)


class DeleteNote(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):

        note = Note.objects.filter(author=request.user.id).get(id=id)

        note.delete()

        return Response("Note has been deleted.")
