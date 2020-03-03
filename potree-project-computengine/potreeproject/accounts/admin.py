from django.contrib import admin
from .forms import RegisterForm
from django.contrib.auth.admin import UserAdmin

from django.contrib.auth.models import User, Group


# Register your models here.


class PotreeAdmin(UserAdmin):
    # change_password_form = ChangeForm
    add_form = RegisterForm
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2"),
            },
        ),
    )
    list_display = ("id", "username", "email", "password")


admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.register(User, PotreeAdmin)
admin.site.site_header = "Potree Administration Panel"

