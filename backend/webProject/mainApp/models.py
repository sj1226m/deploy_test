from django.db import models
from django.contrib.auth.models import AbstractUser

class Gu(models.Model):
    name = models.CharField(null=True, max_length=50)
    pict = models.ImageField(blank=True)
    places = models.ManyToManyField('Place', related_name='gus',blank=True,default=None)
    def __str__(self):
        return self.name
    
class Place(models.Model):
    name = models.CharField(null=True, max_length=50)
    gu = models.ForeignKey(Gu, on_delete=models.SET_NULL,null=True)
    tag = models.CharField(null = True, max_length=50)
    emotion = models.CharField(null=True, max_length=20)
    x_coor = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    y_coor = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    sentence = models.CharField(null = True,max_length=20) #말풍선 위치 때문에 11글자 제한
    mainFood1 = models.CharField(null = True,max_length=20)
    mainFood2 = models.CharField(null = True,max_length=20)

    def __str__(self):
        return str(self.name)

class User(AbstractUser):
    like_place = models.ManyToManyField(Place, blank=True)

    def __str__(self):
        return str(self.username)