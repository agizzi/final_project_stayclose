from .models import User, Circle, Content, Comments, Invite
from rest_framework import viewsets
from .serializers import UserSerializer, CircleSerializer, ContentSerializer, CommentsSerializer, InviteSerializer

class UserViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows users to be viewed or edited.
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer

class CircleViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows circles to be viewed or edited.
  """
  queryset = Circle.objects.all()
  serializer_class = CircleSerializer

class ContentViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows content to be viewed or edited.
  """
  queryset = Content.objects.all()
  serializer_class = ContentSerializer

class CommentsViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows comments to be viewed or edited.
  """
  queryset = Comments.objects.all()
  serializer_class = CommentsSerializer

class InviteViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows invites to be viewed or edited.
  """
  queryset = Invite.objects.all()
  serializer_class = InviteSerializer