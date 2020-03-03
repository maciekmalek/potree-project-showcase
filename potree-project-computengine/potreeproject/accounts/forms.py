from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.forms import (
    UserCreationForm,
    UserChangeForm,
    AdminPasswordChangeForm,
)


class RegisterForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.fields["email"] = forms.EmailField(label=("E-mail"), max_length=75)

