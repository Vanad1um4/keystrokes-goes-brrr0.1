# Generated by Django 4.1.1 on 2022-10-10 20:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0003_text_chapter'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='user',
            new_name='creator',
        ),
    ]
