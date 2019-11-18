from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from stay_close import api

router = routers.DefaultRouter()
router.register(r'users', api.UserViewSet)
router.register(r'circles', api.CircleViewSet)
router.register(r'content', api.ContentViewSet)
router.register(r'comments', api.CommentsViewSet)
router.register(r'invites', api.InviteViewSet)


urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
