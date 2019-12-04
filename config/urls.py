from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from rest_framework import routers
from stay_close import api
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'users', api.UserViewSet, basename='User')
router.register(r'circles', api.CircleViewSet, basename='Circle')
router.register(r'content', api.ContentViewSet, basename='Content')
router.register(r'comments', api.CommentsViewSet, basename='Comments')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/users-by-circle/', api.UsersByCircle.as_view()),
    path('api/content-by-circle/', api.ContentByCircle.as_view()),
    path('api/current-user/', api.CurrentUserByUsername.as_view()),
    path('api/user/', api.LoggedInUserView.as_view()),
    path('api/circles-by-user/', api.CirclesByUser.as_view()),
    path('api/pending-circles-by-user/', api.PendingCirclesByUser.as_view()),
    path('api/user-by-username/', api.UserByUsername.as_view()),
    path('api/comments-by-content/', api.CommentsByContent.as_view()),
    path("api/add-or-delete-like-content/", api.AddOrDeleteLikeContent.as_view()),
    path("api/add-or-delete-like-comment/", api.AddOrDeleteLikeComment.as_view()),
    path('api/remove-user-from-circle/', api.RemoveUserFromCircle.as_view()),
    path('api/invite-member/', api.InviteMember.as_view()),
    path('api/accept-circle-invite/', api.AcceptCircleInvite.as_view()),
    path('api/decline-circle-invite/', api.DeclineCircleInvite.as_view()),
    path('api/upload-user-avatar/', api.UploadUserAvatar.as_view()),
    path('api/add-image-to-content/<int:pk>/', api.AddImageToContent.as_view()),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/rest-auth/login/', jwt_views.TokenObtainPairView.as_view(), name='rest_login'),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', include('frontend.urls')),
    path('register/', include('frontend.urls')),
    path('profile/', include('frontend.urls')),
    path('new-circle/', include('frontend.urls')),
    path('circle/<int:pk>/<str:circleName>/<int:id>/', include('frontend.urls')),
    path('post/<int:circleId>/<str:circleName>/<int:userId>/<str:memberName>', include('frontend.urls'))
]
