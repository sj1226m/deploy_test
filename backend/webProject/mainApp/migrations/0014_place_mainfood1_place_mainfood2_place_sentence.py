# Generated by Django 4.2 on 2023-10-09 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0013_alter_place_x_coor_alter_place_y_coor'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='mainFood1',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='place',
            name='mainFood2',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='place',
            name='sentence',
            field=models.CharField(max_length=50, null=True),
        ),
    ]