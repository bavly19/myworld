from django.shortcuts import render
from .models import Tasks

# Create your views here.

def tasks(request):
    return render(request, 'tasks/tasks.html' , {'task' : Tasks.objects.all()} )

def task(request):
    return render(request, 'tasks/task.html' )