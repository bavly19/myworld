# Generated by Django 5.0.6 on 2024-05-14 11:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tasks',
            options={'ordering': ['priority']},
        ),
    ]
