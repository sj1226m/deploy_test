# Generated by Django 4.2.4 on 2023-10-08 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0012_alter_place_x_coor_alter_place_y_coor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='x_coor',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='y_coor',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
    ]