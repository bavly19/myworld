from django.urls import path
from . import views

urlpatterns = [
    path('teacher',views.teacher,name='teacher'),
    path('',views.teachers,name='teachers'),
]