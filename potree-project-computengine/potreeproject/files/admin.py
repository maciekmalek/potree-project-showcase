from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import File

# Register your models here.
class FileAdmin(admin.ModelAdmin):
    pass


admin.site.register(File, FileAdmin)
