from django.shortcuts import render
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import Http404

# 기본 페이지
def index(request):
    return render(request, 'index.html')

# 장소 목록 get 할 때 사용
class PlaceList(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args):
            # 전송된 데이터를 파싱하여 여러 객체를 생성합니다.
            serializer = self.get_serializer(data=request.data,many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 좋아하는 장소 저장 시 필요
class PutData(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, username):
        user = User.objects.get(username=username)
        place_name = request.data['like_place']['name']
        place_to_add = Place.objects.get(name=place_name)
        if user.like_place.filter(pk=place_to_add.pk).exists():
            user.like_place.remove(place_to_add)
        else:
            user.like_place.add(place_to_add)
        return Response(status=status.HTTP_200_OK)
