from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import EmployeeDepartmentViewSet, EmployeeDepartmentAOWViewSet, EmployeeDepartmentUserViewSet

router = routers.DefaultRouter()
router.register('employee_departments', EmployeeDepartmentViewSet, basename="Employee Departments")
router.register('employee_departments_groups', EmployeeDepartmentAOWViewSet, basename="Employee Department AOWs")
router.register('employee_departments_group_users', EmployeeDepartmentUserViewSet, basename="Employee Department Users")

urlpatterns = [
    path('', include(router.urls)),
]
