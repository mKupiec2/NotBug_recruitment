from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Post(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=600)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  last_modified = models.DateTimeField(auto_now=True)