from django.conf import settings
from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cover = models.ImageField(default='covers/default.jpg', upload_to='covers')

    def __str__(self):
        return self.title + ', ' + self.author


class Text(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    chapter = models.CharField(max_length=255, blank=True)
    text = models.TextField()
    # text_dict = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.text = self.text.replace('\r', '')
        super(Text, self).save(*args, **kwargs)

    def __str__(self):
        return self.text[:30] + '... ' + f'Length: {len(self.text)}'
