from django.db import models

# Create your models here.

class Tasks(models.Model):
    priority_book = [
        (1, 'High'),
        (2, 'Medium'),
        (3, 'Low'),

    ]
    status_book = [
        (True, 'Completed'),
        (False, 'uncompleted'),
    ]
    task_ID = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    teacherName = models.CharField(max_length=100)
    priority = models.IntegerField(default=0 , choices = priority_book)
    description = models.TextField(max_length=1000)
    createdBy = models.CharField(max_length=100)
    status = models.BooleanField(default=False , choices = status_book)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['priority']
    
    