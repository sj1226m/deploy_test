from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, )
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]