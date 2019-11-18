from .models import User, Circle, Content, Comments, Invite
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

class CircleSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Circle
    fields = '__all__'

class ContentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Content
    fields = '__all__'

class CommentsSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Comments
    fields = '__all__'

class InviteSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Invite
    fields = '__all__'

    