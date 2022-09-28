from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import DoctorViewSet, DoctorDetailsViewSet, OrderViewSet, OrderStepTypeViewSet, OrderStatusViewSet, OrderColorViewSet, OrderStepViewSet

router = routers.DefaultRouter()
router.register('doctors', DoctorViewSet, basename="Doctors")
router.register('doctors_details', DoctorDetailsViewSet, basename="Doctors Details")
# router.register('patients', PatientViewSet)
# router.register('patients_details', PatientDetailsViewSet, basename="Patients Details")
router.register('orders', OrderViewSet)
router.register('order_step_types', OrderStepTypeViewSet)
router.register('order_status', OrderStatusViewSet)
router.register('order_colors', OrderColorViewSet)
router.register('order_steps', OrderStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
