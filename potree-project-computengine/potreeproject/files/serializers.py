from rest_framework import serializers
from files.models import File
from .size_converter import converter

# File serializer
class FileSerializer(serializers.ModelSerializer):

    size = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    filetype = serializers.SerializerMethodField()
    since_added = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ("file_id", "file", "since_added", "size", "name", "filetype")

    def get_size(self, obj):
        file_size = ""
        if obj.file and hasattr(obj.file, "size"):
            file_size = obj.file.size
        return converter(file_size, 2)

    def get_name(self, obj):
        file_name = ""
        if obj.file and hasattr(obj.file, "name"):
            file_name = obj.file.name
            file_name = file_name.split(".")[0]
        return file_name.split("/")[-1]

    def get_filetype(self, obj):
        file_type = ""
        if obj.file and hasattr(obj.file, "name"):
            file_type = obj.file.name
        return str("." + file_type.split(".")[-1])

    def get_since_added(self, obj):
        date_added = obj.date_created
        return date_added
