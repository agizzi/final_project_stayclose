from .models import User, Circle, Content, Comments, Invite
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, CircleSerializer, ContentSerializer, CommentsSerializer, InviteSerializer

class UserViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows users to be viewed or edited.
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [
    permissions.IsAuthenticated
  ]

  def perform_create(self, serializer_class):
    serializer_class.save(owner=self.request.user)

class CircleViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows circles to be viewed or edited.
  """
  permission_classes = [
    permissions.IsAuthenticated
  ]
  serializer_class = CircleSerializer

  def get_queryset(self):
    return self.request.user.Circle.all()

  def perform_create(self, serializer_class):
    serializer_class.save(owner=self.request.user)

class ContentViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows content to be viewed or edited.
  """
  serializer_class = ContentSerializer
  permission_classes = [
    permissions.IsAuthenticated
  ]

  def perform_create(self, serializer_class):
    serializer_class.save(owner=self.request.user)

class CommentsViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows comments to be viewed or edited.
  """
  serializer_class = CommentsSerializer
  permission_classes = [
    permissions.IsAuthenticated
  ]

  def perform_create(self, serializer_class):
    serializer_class.save(owner=self.request.user)

class InviteViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows invites to be viewed or edited.
  """
  serializer_class = InviteSerializer
  permission_classes = [
    permissions.IsAuthenticated
  ]

  def perform_create(self, serializer_class):
    serializer_class.save(owner=self.request.user)