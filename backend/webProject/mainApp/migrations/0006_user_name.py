# Generated by Django 4.2.5 on 2023-09-27 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0005_remove_place_name_remove_user_like_place_place_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]