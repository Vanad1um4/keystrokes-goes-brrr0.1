# Generated by Django 4.1.1 on 2022-10-11 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0004_rename_user_book_creator'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cover',
            field=models.ImageField(default='default.jpg', upload_to='covers'),
        ),
    ]
