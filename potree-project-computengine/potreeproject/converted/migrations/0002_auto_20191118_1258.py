# Generated by Django 3.0a1 on 2019-11-18 11:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('converted', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='convertedfile',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 18, 12, 58, 0, 884772)),
        ),
    ]
