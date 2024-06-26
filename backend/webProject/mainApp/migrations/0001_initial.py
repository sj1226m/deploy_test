# Generated by Django 4.2.5 on 2023-09-16 09:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
                ('pict', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
                ('coor', models.IntegerField(null=True)),
                ('tag', models.CharField(max_length=20, null=True)),
                ('gu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.gu')),
            ],
        ),
        migrations.AddField(
            model_name='gu',
            name='places',
            field=models.ManyToManyField(blank=True, default=None, related_name='gus', to='mainApp.place'),
        ),
    ]
