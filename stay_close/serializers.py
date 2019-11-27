from .models import User, Circle, Content, Comments
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

class CircleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Circle
    fields = '__all__'

class ContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Content
    fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comments
    fields = '__all__'

