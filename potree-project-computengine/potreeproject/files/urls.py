from rest_framework import routers
from .api import FileViewset
from converted.api import ConvertedFileViewset

router = routers.DefaultRouter()
router.register("api/files", FileViewset, "files")
router.register("api/convertedFiles", ConvertedFileViewset, "convertedFiles")
urlpatterns = router.urls
