# Generated by Django 4.2 on 2024-05-10 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0016_alter_place_sentence'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='x_coor',
            field=models.DecimalField(decimal_places=5, max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='y_coor',
            field=models.DecimalField(decimal_places=5, max_digits=15, null=True),
        ),
    ]
