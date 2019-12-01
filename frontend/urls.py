from django.urls import path
from . import views
urlpatterns = [
  path('', views.index, name="home"),
  path('register/', views.index, name='home'),
  path('profile/', views.index, name='home'),
  path('new-circle/', views.index, name='home'),
  path('circle/<int:pk>/<str:circleName>/<int:id>/', views.circleIndex, name='home'),
]