from django.urls import path

from .views import home, addPost, editPost

urlpatterns = [
  path("", home, name='home'),
  path("add_post/", addPost, name='add_post'),
  path("edit/<int:id>", editPost, name='edit_post')
]