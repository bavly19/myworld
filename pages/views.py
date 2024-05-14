from django.shortcuts import render
from .models import *


# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def AboutUs(request):
    return render(request,'pages/AboutUs.html')

def WhyTaskTrax(request):
    return render(request,'pages/WhyTaskTrax.html')

def ContactUs(request):
    return render(request,'pages/ContactUs.html')

def LogIn(request):
    return render(request,'pages/LogIn.html')

def SignUp(request):
    return render(request,'pages/SignUp.html')

def ViewTaskDetails(request):
    return render(request,'pages/ViewTaskDetails.html')

def ViewTeacherTasks(request):
    return render(request,'pages/ViewTeacherTasks.html')

def TeacherHome(request):
    return render(request,'pages/TeacherHome.html')


