from django.db import models
from django.utils import timezone
from potreeproject.settings import MEDIA_ROOT
import datetime
import os
from django.contrib.auth.models import User


def converter_path(instance):
    return os.path.join(MEDIA_ROOT, instance.owner.username, "converted")


class ConvertedFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    converted_file = models.FileField(null=True, max_length=256)
    date_created = models.DateTimeField(
        default=datetime.datetime.now()  # .strftime("%Y-%m-%d %X")
    )
    owner = models.ForeignKey(
        User, related_name="convertedFiles", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return str(self.converted_file.name)

    def path(self):
        return str(self.converted_file.path)

    def delete(self, *args, **kwargs):
        self.converted_file.delete()
        super().delete(*args, **kwargs)


def post_converted_file(path, ownero):
    my_file = ConvertedFile()
    my_file.converted_file.name = path
    my_file.owner = ownero
    my_file.save()

