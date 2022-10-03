from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import DoctorViewSet, DoctorDetailsViewSet

router = routers.DefaultRouter()
router.register('doctors', DoctorViewSet, basename="Doctors")
router.register('doctor_details', DoctorDetailsViewSet, basename="Doctors Details")

urlpatterns = [
    path('', include(router.urls)),
]
