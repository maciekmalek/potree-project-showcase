from django.contrib import admin
from .models import ConvertedFile

# Register your models here.
class ConvertedFileAdmin(admin.ModelAdmin):
    pass


admin.site.register(ConvertedFile, ConvertedFileAdmin)
