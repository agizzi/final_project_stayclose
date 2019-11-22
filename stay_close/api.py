from .models import User, Circle, Content, Comments, Invite
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, CircleSerializer, ContentSerializer, CommentsSerializer, InviteSerializer

class UserViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows users to be viewed or edited.
  """
  serializer_class = UserSerializer
  permission_classes = [
    permissions.AllowAny
  ]

  def get_queryset(self):
    return User.objects.filter(id=self.request.user.id)

class CircleViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows circles to be viewed or edited.
  """
  queryset = Circle.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = CircleSerializer

class ContentViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows content to be viewed or edited.
  """
  queryset = Content.objects.all()
  serializer_class = ContentSerializer
  permission_classes = [
    permissions.IsAuthenticated
  ]


class CommentsViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows comments to be viewed or edited.
  """
  queryset = Comments.objects.all()
  serializer_class = CommentsSerializer
  permission_classes = [
    permissions.AllowAny
  ]

class InviteViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows invites to be viewed or edited.
  """
  queryset = Invite.objects.all()
  serializer_class = InviteSerializer
  permission_classes = [
    permissions.AllowAny
  ]