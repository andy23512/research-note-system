# Generated by Django 2.2.7 on 2019-11-12 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('research_note', '0005_auto_20191112_2255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='researchnote',
            name='is_written',
        ),
    ]