from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Circle, Content, Comments
# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Circle)
admin.site.register(Content)
admin.site.register(Comments)
