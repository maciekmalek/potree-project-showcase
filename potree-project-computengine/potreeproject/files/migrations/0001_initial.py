# Generated by Django 2.2.7 on 2019-11-18 11:43

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import files.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(max_length=256, null=True, upload_to=files.models.get_upload_path)),
                ('date_created', models.DateTimeField(default=datetime.datetime(2019, 11, 18, 12, 43, 47, 613393))),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='files', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
