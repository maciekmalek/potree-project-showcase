from files.models import File
from rest_framework import serializers, status
from converted.models import ConvertedFile, converter_path, post_converted_file
from converted.serializers import ConvertedFileSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import FileSerializer
from converted.api import ConvertedFileViewset
import subprocess
import time
import os
from Potree.page_template.template_path import PATH_TO_TEMPLATE

# File Viewset


class FileViewset(viewsets.ModelViewSet):

    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.files.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = super(FileViewset, self).get_object()
        instance_converted = ConvertedFileViewset.get_object(self)
        path = instance.path()
        path_to_converted = converter_path(instance_converted)
        serilizer = self.get_serializer(instance)
        name = serilizer.get_name(instance)
        p = subprocess.Popen(
            [
                "PotreeConverter",
                path,
                "-o",
                path_to_converted,
                "-p",
                name,
                "--overwrite",
                "--page-template",
                PATH_TO_TEMPLATE,
            ]
        )
        path_to_converted = (
            instance_converted.owner.username + "/converted/" + name + ".html"
        )

        timeout = time.time() + 60 * 30
        while True:
            poll = p.poll()
            if poll != None:
                if poll == 0:
                    post_converted_file(path_to_converted, self.request.user)
                    return Response(ConvertedFileSerializer(ConvertedFile()).data)
                else:
                    try:
                        serilizer.is_valid(raise_exception=True)
                    except:

                        return Response(
                            serilizer.data, status=status.HTTP_404_NOT_FOUND
                        )

            elif time.time() > timeout:
                p.terminate()

            else:

                continue

