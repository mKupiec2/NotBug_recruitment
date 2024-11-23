from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import messages

from .models import Post

# Create your views here.

def home(request):
  posts = Post.objects.all()

  return render(request, "mainView.html", {"posts": posts})


def addPost(request):
  if request.method == "POST":
    title = request.POST.get("title")
    content = request.POST.get("content")
    print(title, content)
    new_post = Post(title=title, content=content, user=request.user)
    new_post.save()
    messages.success(request, f"Successfully created post {title}")

    return HttpResponseRedirect("/")

  return render(request, "addPost.html", {})


def editPost(request, id):
  try:
    post = Post.objects.get(id=id)
    if post.user == request.user:
      if request.method == "GET":
        return render(request, "editPost.html", {"post": post})
    else:
      messages.error(request, f"You don't have permissions to edit this post!")
  except Post.DoesNotExist:
    messages.error(request, f"Post with id {id} does not exist")
  
  if request.method == "POST":
    if "save" in request.POST:
      post.title = request.POST.get("title")
      post.content = request.POST.get("content")
      post.save()
      messages.success(request, f"Successfully edited post {post.title}")
    else:
      post.delete()
      messages.success(request, f"Successfully removed post {post.title}")

  return HttpResponseRedirect("/")