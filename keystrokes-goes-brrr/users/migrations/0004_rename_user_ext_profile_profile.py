# Generated by Django 4.1.1 on 2022-10-14 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_rename_userextended_profile_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='user_ext',
            new_name='profile',
        ),
    ]
