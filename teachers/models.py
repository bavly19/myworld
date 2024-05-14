from django.db import models

# Create your models here.

class Teachers(models.Model):
    teacher_name = models.CharField(max_length=100)
    teacher_email = models.EmailField(max_length=100)
    teacher_password = models.CharField(max_length=100)
    isTeacher = models.BooleanField(default=True)