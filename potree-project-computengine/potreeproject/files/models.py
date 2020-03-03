from django.db import models
from django.utils import timezone
import datetime
import os
from django.contrib.auth.models import User
from google.cloud import storage


def get_upload_path(instance, filename):
    return os.path.join(instance.owner.username, filename)


class File(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(null=True, max_length=256, upload_to=get_upload_path)
    date_created = models.DateTimeField(
        default=datetime.datetime.now()  # .strftime("%Y-%m-%d %X")
    )
    owner = models.ForeignKey(
        User, related_name="files", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return str(self.file.name)

    def path(self):
        return str(self.file.path)

    def delete(self, *args, **kwargs):
        self.file.delete()
        super().delete(*args, **kwargs)
