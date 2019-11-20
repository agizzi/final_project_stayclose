from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from stay_close import api

router = routers.DefaultRouter()
router.register(r'users', api.UserViewSet, basename='User')
router.register(r'circles', api.CircleViewSet, basename='Circle')
router.register(r'content', api.ContentViewSet, basename='Content')
router.register(r'comments', api.CommentsViewSet, basename='Comments')
router.register(r'invites', api.InviteViewSet, basename='Invites')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth', include('knox.urls')),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', include('frontend.urls')),
    path('register/', include('frontend.urls')),
    path('profile/', include('frontend.urls')),
]
