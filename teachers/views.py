from django.shortcuts import render
from .models import Teachers

# Create your views here.

def teachers(request):
    return render(request, 'teachers/teachers.html' , {'teacher' : Teachers.objects.all()} )

def teacher(request):
    return render(request, 'teachers/teacher.html' )