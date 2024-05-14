# Generated by Django 5.0.6 on 2024-05-14 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ID', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('teacherName', models.CharField(max_length=100)),
                ('priority', models.IntegerField(choices=[(1, 'High'), (2, 'Medium'), (3, 'Low')], default=0)),
                ('description', models.TextField(max_length=1000)),
                ('createdBy', models.CharField(max_length=100)),
                ('status', models.BooleanField(choices=[(True, 'Completed'), (False, 'uncompleted')], default=False)),
            ],
        ),
    ]
