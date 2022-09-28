from django.urls import path
from django.conf.urls import include
from rest_framework import routers
# from .views import PatientViewSet, PatientDetailsViewSet

router = routers.DefaultRouter()
# router.register('patients', PatientViewSet)
# router.register('patients_details', PatientDetailsViewSet, basename="Patients Details")

urlpatterns = [
    path('', include(router.urls)),
]
