# Generated by Django 4.1.1 on 2022-10-18 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0008_text_text_dict'),
    ]

    operations = [
        migrations.AlterField(
            model_name='text',
            name='chapter',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
