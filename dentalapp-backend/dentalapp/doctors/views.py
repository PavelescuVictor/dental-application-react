from django.shortcuts import render
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Doctor, DoctorDetails
from .serializers import DoctorSerializer, DoctorDetailsSerializer

# Creating Doctor Filter

class DoctorFilter(django_filters.FilterSet):
    """
    Filter class for the Doctor model.
    """

    class Meta:
        model = Doctor
        fields = {
            'id': ['exact'],
            'firstName': ['exact', 'icontains'],
            'lastName': ['exact', 'icontains'],
        }


class DoctorDetailsFilter(django_filters.FilterSet):
    """
    Filter class for the Doctor Details model.
    """

    class Meta:
        model = DoctorDetails
        fields = {
            'id': ['exact'],
            'doctor': ['exact'],
            'cabinet': ['exact', 'icontains'],
            'phone': ['exact'],
        }
    

# Creating Doctor ViewSets

class DoctorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing the doctor entries
    """

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DoctorFilter
    filterset_fields = ['id', 'firstName', 'lastName']
    # authentication_classes = [TokenAuthentication, ]

class DoctorDetailsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing the doctor details entries
    """

    queryset = DoctorDetails.objects.all()
    serializer_class = DoctorDetailsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DoctorDetailsFilter
    filterset_fields = ['id', 'doctorId', 'cabinet', 'phone']
    # authentication_classes = [TokenAuthentication, ]