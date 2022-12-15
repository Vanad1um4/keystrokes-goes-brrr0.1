# Generated by Django 4.1.1 on 2022-10-12 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0007_remove_book_stats_remove_text_stats'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExtStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stats', models.TextField(blank=True)),
                ('text', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='client.text')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userextended')),
            ],
        ),
    ]