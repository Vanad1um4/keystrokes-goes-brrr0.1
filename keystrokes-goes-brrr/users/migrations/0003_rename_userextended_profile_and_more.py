# Generated by Django 4.1.1 on 2022-10-12 13:58

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('client', '0007_remove_book_stats_remove_text_stats'),
        ('users', '0002_userextstats'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserExtended',
            new_name='Profile',
        ),
        migrations.RenameModel(
            old_name='UserExtStats',
            new_name='TextStats',
        ),
    ]
