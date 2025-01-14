# Generated by Django 5.0.6 on 2024-05-14 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Teachers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teacher_name', models.CharField(max_length=100)),
                ('teacher_email', models.EmailField(max_length=100)),
                ('teacher_password', models.CharField(max_length=100)),
                ('isTeacher', models.BooleanField(default=True)),
            ],
        ),
    ]
