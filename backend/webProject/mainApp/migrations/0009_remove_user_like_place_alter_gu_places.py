# Generated by Django 4.2.5 on 2023-09-27 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0008_alter_user_like_place'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='like_place',
        ),
        migrations.AlterField(
            model_name='gu',
            name='places',
            field=models.ManyToManyField(blank=True, default=None, related_name='gus', to='mainApp.place'),
        ),
    ]
