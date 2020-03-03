from rest_framework import routers
from .api import ConvertedFileViewset

router = routers.DefaultRouter()
router.register("api/convertedFiles", ConvertedFileViewset, "convertedFiles")
router.register("api/potree", ConvertedFileViewset, "convertedFiles")

urlpatterns = router.urls
