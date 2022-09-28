from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import DoctorSerializer, DoctorDetailsSerializer, OrderSerializer, OrderStepTypeSerializer, OrderStatusSerializer, OrderColorSerializer, OrderStepSerializer
from .models import Doctor, DoctorDetails, Order, OrderStepType, OrderStatus, OrderColor, OrderStep
from .permissions import ReadOnly
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

# Creating filtet sets.


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


# class PatientFilter(django_filters.FilterSet):
#     """
#     Filter class for the Patient model.
#     """

#     class Meta:
#         model = Patient
#         fields = {
#             'id': ['exact'],
#             'firstName': ['exact', 'icontains'],
#             'lastName': ['exact', 'icontains'],
#         }

# class PatientDetailsFilter(django_filters.FilterSet):
#     """
#     Filter class for the Patient Details model.
#     """

#     class Meta:
#         model = PatientDetails
#         fields = {
#             'id': ['exact'],
#             'patientId': ['exact'],
#             'phone': ['exact'],
#         }


class OrderFilter(django_filters.FilterSet):
    """
    Filter class for the Order model.
    """

    class Meta:
        model = Order
        fields = {
            'id': ['exact'],
            'doctor': ['exact'],
            'patientName': ['exact'],
            'redo': ['exact'],
            'paid': ['exact'],
        }


class OrderStepTypeFilter(django_filters.FilterSet):
    """
    Filter class for the OrderStepType model.
    """

    class Meta:
        model = OrderStepType
        fields = {
            'id': ['exact'],
            'stepType': ['exact', 'icontains'],
        }


class OrderStatusFilter(django_filters.FilterSet):
    """
    Filter class for the OrderStatus model.
    """

    class Meta:
        model = OrderStatus
        fields = {
            'id': ['exact'],
            'status': ['exact', 'icontains'],
        }


class OrderColorFilter(django_filters.FilterSet):
    """
    Filter class for the OrderColor model.
    """

    class Meta:
        model = OrderColor
        fields = {
            'id': ['exact'],
            'color': ['exact', 'icontains'],
        }


class OrderStepFilter(django_filters.FilterSet):
    """
    Filter class for the OrderStep model.
    """

    class Meta:
        model = OrderStep
        fields = {
            'id': ['exact'],
            'order': ['exact'],
            'color': ['exact'],
            'stepType': ['exact'],
            'status': ['exact'],
            'warranty': ['exact'],
            'ppu': ['exact'],
        }


# Creating view sets.


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


# class PatientViewSet(viewsets.ModelViewSet):
#     """
#     ViewSet for viewing and editing patients.
#     """

#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = PatientFilter
#     filterset_fields = ['id', 'firstName', 'lastName']
#     # authentication_classes = [TokenAuthentication, ]


# class PatientDetailsViewSet(viewsets.ModelViewSet):
#     """
#     ViewSet for viewing and editing patients details.
#     """

#     queryset = PatientDetails.objects.all()
#     serializer_class = PatientDetailsSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = PatientDetailsFilter
#     filterset_fields = ['id', 'patientId', 'phone']
#     # authentication_classes = [TokenAuthentication, ]


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing order entries
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter
    filterset_fields = ['id', 'doctor', 'patientName', 'paid', 'redo']
    # authentication_classes = [TokenAuthentication, ]

    # def list(self, request):
    #     print("list")
    #     queryset = Order.objects.all()
    #     serializer = OrderSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     print("list1")
    #     queryset = Order.objects.all()
    #     order = get_object_or_404(queryset, pk=pk)
    #     serializer = OrderSerializer(order)
    #     return Response(serializer.data)


class OrderStepTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing order step type entries.
    """

    queryset = OrderStepType.objects.all()
    serializer_class = OrderStepTypeSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStepTypeFilter
    filterset_fields = ['id', 'stepType']
    # authentication_classes = [TokenAuthentication, ]


class OrderStatusViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing order status entries
    """

    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStatusFilter
    filterset_fields = ['id', 'status']
    # authentication_classes = [TokenAuthentication, ]


class OrderColorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing order color entries
    """

    queryset = OrderColor.objects.all()
    serializer_class = OrderColorSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderColorFilter
    filterset_fields = [
        'id', 'color'
    ]
    # authentication_classes = [TokenAuthentication, ]


class OrderStepViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing order step entries
    """

    queryset = OrderStep.objects.all()
    serializer_class = OrderStepSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStepFilter
    filterset_fields = [
        'id', 'order', 'step', 'stepOrder', 'status', 'warranty', 'ppu', 'unitCount'
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # authentication_classes = [TokenAuthentication, ]
    """
    def list(self, request):
        print("list")
        queryset = Order.objects.all()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("list1")
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    """
    """
    def create(self, request):
        print("create")

    def update(self, request, pk=None):
        print("update")

    def partial_update(self, request, pk=None):
        print("list")

    def destroy(self, request, pk=None):
        print("destroy")
    """
