# Generated by Django 4.1.1 on 2022-10-18 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0007_remove_book_stats_remove_text_stats'),
    ]

    operations = [
        migrations.AddField(
            model_name='text',
            name='text_dict',
            field=models.TextField(blank=True),
        ),
    ]