from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import EmployeeDepartmentSerializer, EmployeeDepartmentAOWSerializer, EmployeeDepartmentUserSerializer
from .models import EmployeeDepartment, EmployeeDepartmentAOW, EmployeeDepartmentUser
from .permissions import ReadOnly
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

# Creating filtet sets.


class EmployeeDepartmentFilter(django_filters.FilterSet):
    """
    Filter class for the EmployeeDepartment model.
    """

    class Meta:
        model = EmployeeDepartment
        fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains'],
        }


class EmployeeDepartmentAOWFilter(django_filters.FilterSet):
    """
    Filter class for the EmployeeDepartmentAOW model.
    """

    class Meta:
        model = EmployeeDepartmentAOW
        fields = {
            'id': ['exact'],
            'employeeDepartment': ['exact'],
            'orderStepType': ['exact'],
        }


class EmployeeDepartmentUserFilter(django_filters.FilterSet):
    """
    Filter class for the EmployeeDepartmentUser model.
    """

    class Meta:
        model = EmployeeDepartmentUser
        fields = {
            'id': ['exact'],
            'employeeDepartment': ['exact'],
            'user': ['exact'],
        }



# Creating view sets.


class EmployeeDepartmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing the employee department entries
    """

    queryset = EmployeeDepartment.objects.all()
    serializer_class = EmployeeDepartmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = EmployeeDepartmentFilter
    filterset_fields = ['id', 'name']
    # authentication_classes = [TokenAuthentication, ]


class EmployeeDepartmentAOWViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing the employee department aows entries
    """

    queryset = EmployeeDepartmentAOW.objects.all()
    serializer_class = EmployeeDepartmentAOWSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = EmployeeDepartmentAOWFilter
    filterset_fields = ['id', 'employeeDepartment', 'orderStepType']
    # authentication_classes = [TokenAuthentication, ]


class EmployeeDepartmentUserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing the employee department aows entries
    """

    queryset = EmployeeDepartmentUser.objects.all()
    serializer_class = EmployeeDepartmentUserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = EmployeeDepartmentUserFilter
    filterset_fields = ['id', 'employeeDepartment', 'user']
    # authentication_classes = [TokenAuthentication, ]
