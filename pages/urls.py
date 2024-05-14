from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('AboutUs', views.AboutUs, name='AboutUs'),
    path('WhyTaskTrax', views.WhyTaskTrax, name='WhyTaskTrax'),
    path('ContactUs', views.ContactUs, name='ContactUs'),
    path('LogIn', views.LogIn, name='LogIn'),
    path('SignUp', views.SignUp, name='SignUp'),
    path('ViewTeacherTasks', views.ViewTeacherTasks, name='ViewTeacherTasks'),
    path('ViewTaskDetails', views.ViewTaskDetails, name='ViewTaskDetails'),
    path('TeacherHome', views.TeacherHome, name='TeacherHome'),
]