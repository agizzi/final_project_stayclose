from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import date
from encrypted_fields import fields
from django_encrypted_filefield.fields import EncryptedFileField, EncryptedImageField




# Create your models here.
class User(AbstractUser):
  joined_on = models.DateField(default = date.today)
  avatar = models.ImageField(upload_to='images', blank=True, null=True)
  birthday = fields.EncryptedDateField(blank=True, null=True)

  def __str__(self):
    return self.username

class Circle(models.Model):
  name = fields.EncryptedCharField(max_length = 100)
  admin = models.ForeignKey(to="User", related_name="is_admin", on_delete=models.CASCADE)
  members = models.ManyToManyField(to="User", related_name="mates", blank=True)
  pending_members = models.ManyToManyField(to="User", related_name="pending", blank=True)
  created_at = fields.EncryptedDateField(default = date.today)


  def __str__(self):
    return self.name

class Content(models.Model):
  member = models.ForeignKey(to="User", related_name="poster", on_delete=models.CASCADE)
  author = models.CharField(max_length=255, blank=True, null=True)
  circle = models.ForeignKey(to="Circle", related_name="posts", on_delete=models.CASCADE)
  text_post = fields.EncryptedTextField(blank=True, null=True)
  img_post = EncryptedImageField(blank=True, null=True)
  caption = fields.EncryptedCharField(max_length=200, blank=True, null=True)
  created_at = fields.EncryptedDateTimeField(default = timezone.now)
  updated_at = fields.EncryptedDateTimeField(default=timezone.now)
  likes = fields.EncryptedIntegerField(default=0)
  tags = models.ForeignKey(to="User", related_name="tagged", on_delete=models.CASCADE, blank=True, null=True)

  def __str__(self):
    return self.text_post

class Comments(models.Model):
  author = models.ForeignKey(to="User", related_name="comments", on_delete=models.CASCADE)
  comment = fields.EncryptedTextField()
  content = models.ForeignKey(to="Content", related_name="commented_stuff", on_delete=models.CASCADE)
  created_at = fields.EncryptedDateTimeField(default = timezone.now)
  updated_at = fields.EncryptedDateTimeField(default=timezone.now)

  def __str__(self):
    return self.comment
