# Generated by Django 4.2.5 on 2023-09-27 08:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0003_alter_user_place_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='place',
            name='place_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='place_name',
        ),
        migrations.AddField(
            model_name='place',
            name='name',
            field=models.ManyToManyField(related_name='places', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='like_place',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.place'),
        ),
        migrations.AlterField(
            model_name='gu',
            name='places',
            field=models.ManyToManyField(related_name='gus', to='mainApp.place'),
        ),
        migrations.AlterField(
            model_name='place',
            name='gu',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.gu'),
        ),
    ]
