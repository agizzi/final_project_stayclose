from .models import User, Circle, Content, Comments
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.utils import timezone
from rest_framework.parsers import FileUploadParser, MultiPartParser
from django.http import HttpResponse
from rest_framework.views import APIView
from .serializers import UserSerializer, CircleSerializer, ContentSerializer, CommentsSerializer
from django.db.models import Q

class LoggedInUserView(APIView):
  def get(self, request, format=None):
    current_user = self.request.user

    return Response(UserSerializer(current_user).data)


class UserViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows users to be viewed or edited.
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [
    permissions.AllowAny
  ]

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
    permissions.AllowAny
  ]

  def partial_update(self, request, pk):
    content = Content.objects.get(pk=pk)
    content.updated_at = timezone.now()
    content.text_post = request.data['text_post']
    content.save()
    return Response(status=200)



class CommentsViewSet(viewsets.ModelViewSet):
  """
  API Endpoint that allows comments to be viewed or edited.
  """
  queryset = Comments.objects.all()
  serializer_class = CommentsSerializer
  permission_classes = [
    permissions.AllowAny
  ]

  def partial_update(self, request, pk):
    comment = Comments.objects.get(pk=pk)
    comment.updated_at = timezone.now()
    comment.comment = request.data['comment']
    comment.save()
    return Response(status=200)

class UsersByCircle(APIView):
  def get(self, request, format=None):
    circle = request.query_params.get('id')
    users = User.objects.filter(pk__in=Circle.objects.filter(pk=circle).values('members'))
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

class ContentByCircle(APIView):
  def get(self, request, format=None):
    circle = request.query_params.get('id')
    content = Content.objects.filter(circle=circle).order_by('created_at')
    serializer = ContentSerializer(content, many=True)
    return Response(serializer.data)

class CurrentUserByUsername(APIView):
  def get(self, request, format=None):
    username = request.query_params.get('username')
    user = User.objects.filter(username=username)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

class CirclesByUser(APIView):
  def get(self, request, format=None):
      current_user = self.request.user
      admin_circles = Circle.objects.filter(admin=self.request.user)
      member_circles = Circle.objects.filter(members__pk = self.request.user.id)
      circles = member_circles.difference(admin_circles)
      circles = circles.union(admin_circles)
      serializer = CircleSerializer(circles, many=True)
      return Response(serializer.data)

class PendingCirclesByUser(APIView):
  def get(self, request, format=None):
      current_user = self.request.user
      pending_circles = Circle.objects.filter(pending_members__pk = self.request.user.id)
      serializer = CircleSerializer(pending_circles, many=True)
      return Response(serializer.data)

class AdminOfPendingCircle(APIView):
  def get(self, request, format=None):
    current_user = self.request.user
    admin_user = Users.objects.filter(admin=self.request.user)

class UserByUsername(APIView):
  def get(self, request, format=None):
    usernames = request.query_params.get("entered_usernames")
    usernames = usernames.split(" ")
    queryset = User.objects.none()
    for username in usernames:
      user = User.objects.filter(username = username)
      if user:
        queryset = queryset.union(user)
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)

class RemoveUserFromCircle(APIView):
  def get(self, request, format=None):
    userId = request.query_params.get('userId')
    circleId = request.query_params.get('circleId')
    user = User.objects.get(pk=userId)
    circle = Circle.objects.get(pk=circleId)
    circle.members.remove(user)
    return HttpResponse(status=200)

class CommentsByContent(APIView):
  def get(self, request, format=None):
    contentId = request.query_params.get('contentId')
    comments = Comments.objects.filter(content=contentId).order_by('-created_at')
    serializer = CommentsSerializer(comments, many=True)
    return Response(serializer.data)

class AddOrDeleteLikeContent(APIView):
  def get(self, request, format=None):
    userId = request.query_params.get('userId')
    contentId = request.query_params.get('contentId')
    content = Content.objects.get(pk=contentId)
    likes = Content.objects.filter(pk=contentId).values_list('likes', flat=True)
    user = User.objects.get(pk=userId)
    if user.id in likes:
      content.likes.remove(user)
    else:
      content.likes.add(user)
    serializer = ContentSerializer(content)
    return Response(serializer.data)

class AddOrDeleteLikeComment(APIView):
  def get(self, request, format=None):
    userId = request.query_params.get('userId')
    commentId = request.query_params.get('commentId')
    comment = Comments.objects.get(pk=commentId)
    likes = Comments.objects.filter(pk=commentId).values_list('likes', flat=True)
    user = User.objects.get(pk=userId)
    if user.id in likes:
      comment.likes.remove(user)
    else:
      comment.likes.add(user)
    serializer = CommentsSerializer(comment)
    return Response(serializer.data)

class InviteMember(APIView):
  def get(self, request, format=None):
    currentUser = self.request.user
    userId = request.query_params.get('userId')
    circleId = request.query_params.get('circleId')
    circle = Circle.objects.get(pk=circleId)
    user = User.objects.get(pk=userId)
    print(currentUser)
    if user != currentUser:
      circle.pending_members.add(user)
    serializer = CircleSerializer(circle)
    return Response(serializer.data)

class AcceptCircleInvite(APIView):
  def get(self, request, format=None):
    userId = request.query_params.get('userId')
    circleId = request.query_params.get('circleId')
    circle = Circle.objects.get(pk=circleId)
    user = User.objects.get(pk=userId)
    circle.pending_members.remove(user)
    circle.members.add(user)
    serializer = CircleSerializer(circle)
    return Response(serializer.data)

class DeclineCircleInvite(APIView):
  def get(self, request, format=None):
    userId = request.query_params.get('userId')
    circleId = request.query_params.get('circleId')
    circle = Circle.objects.get(pk=circleId)
    user = User.objects.get(pk=userId)
    circle.pending_members.remove(user)
    serializer = CircleSerializer(circle)
    return Response(serializer.data)

class UploadUserAvatar(APIView):
  parser_classes = [MultiPartParser,]
  def put(self, request, format=None):
    file = request.data['file']
    print(file)

    user = User.objects.get(id=request.user.id)
    user.avatar.save(file.name, file, save=True)

    return Response(status=201)

class AddImageToContent(APIView):
  parser_classes = [MultiPartParser,]
  def put(self, request, format=None, *args, **kwargs):
    id = kwargs.get('pk')
    file = request.data['file']
    print(file)

    content = Content.objects.get(id=id)
    content.img_post.save(file.name, file, save=True)

    return Response(status=201)


