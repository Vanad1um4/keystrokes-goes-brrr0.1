from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


# https://youtu.be/q4jPR-M0TAQ?t=2051
class UserRegisterFrom(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
