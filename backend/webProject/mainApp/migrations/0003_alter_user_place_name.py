# Generated by Django 4.2.5 on 2023-09-27 08:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0002_remove_place_coor_remove_place_name_place_emotion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='place_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.place'),
        ),
    ]