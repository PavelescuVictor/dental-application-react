from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import OrderViewSet, OrderStepTypeViewSet, OrderStepTypeGroupViewSet, OrderStepTypeGroupOrderStepTypeViewSet, OrderStatusViewSet, OrderColorViewSet, OrderStepViewSet

router = routers.DefaultRouter()
router.register('orders', OrderViewSet)
router.register('order_step_types', OrderStepTypeViewSet)
router.register('order_step_type_groups', OrderStepTypeGroupViewSet)
router.register('order_step_type_group_order_step_type', OrderStepTypeGroupOrderStepTypeViewSet)
router.register('order_status', OrderStatusViewSet)
router.register('order_colors', OrderColorViewSet)
router.register('order_steps', OrderStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
