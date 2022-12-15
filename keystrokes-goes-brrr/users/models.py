from django.contrib.auth.models import User
from django.utils.timezone import now
from client.models import Book, Text
from django.db import models


class Profile(models.Model):
    profile = models.OneToOneField(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book, blank=True)

    def __str__(self):
        return str(self.profile)


class TextStats(models.Model):
    text = models.ForeignKey(Text, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
    complete_time = models.DateTimeField(default=now, editable=False)
    stats_string = models.TextField(blank=True)

    chars = models.PositiveSmallIntegerField(default=0)
    words = models.PositiveSmallIntegerField(default=0)
    errors = models.PositiveSmallIntegerField(default=0)
    time = models.PositiveIntegerField(default=0)

    cpm = models.PositiveSmallIntegerField(default=0)
    wpm = models.PositiveSmallIntegerField(default=0)
    acc = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return str(self.text)
