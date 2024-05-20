from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('place_list/', views.PlaceList.as_view()),
    path('put_data/<username>', views.PutData.as_view()),
]