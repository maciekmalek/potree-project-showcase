from rest_framework import serializers
from .models import ConvertedFile

# File serializer
class ConvertedFileSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()
    since_added = serializers.SerializerMethodField()

    class Meta:
        model = ConvertedFile
        fields = ("file_id", "converted_file", "since_added", "name")

    def get_name(self, obj):
        file_name = ""
        if obj.converted_file and hasattr(obj.converted_file, "name"):
            file_name = obj.converted_file.name
            file_name = file_name.split(".")[0]
        return file_name.split("/")[-1]

    def get_since_added(self, obj):
        date_added = obj.date_created
        return date_added

