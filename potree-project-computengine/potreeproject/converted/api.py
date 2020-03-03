from .models import ConvertedFile
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import ConvertedFileSerializer
import subprocess

# ConvertedFile Viewset


class ConvertedFileViewset(viewsets.ModelViewSet):

    serializer_class = ConvertedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.convertedFiles.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = super(ConvertedFileViewset, self).get_object()
        path = instance.path()
        serilizer = self.get_serializer(instance)
        name = serilizer.get_name(instance)

        return Response(serilizer.data)

