from django.shortcuts import render
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .permissions import ReadOnly
from .serializers import OrderSerializer, OrderStepTypeSerializer, OrderStepTypeGroupSerializer, OrderStepTypeGroupOrderStepTypeSerializer, OrderStatusSerializer, OrderColorSerializer, OrderStepSerializer
from .models import Order, OrderStepType, OrderStepTypeGroup, OrderStepTypeGroupOrderStepType, OrderStatus, OrderColor, OrderStep

# Creating Orders Filters

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


class OrderStepTypeGroupFilter(django_filters.FilterSet):
    """
    Filter class for the OrderStepTypeGroup model.
    """

    class Meta:
        model = OrderStepTypeGroup
        fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains'],
        }


class OrderStepTypeGroupOrderStepTypeFilter(django_filters.FilterSet):
    """
    Filter class for the OrderStepTypeGroup model.
    """

    class Meta:
        model = OrderStepTypeGroupOrderStepType
        fields = {
            'id': ['exact'],
            'orderStepTypeGroup': ['exact'],
            'orderStepType': ['exact'],
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

# Creating Orders ViewSets


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


class OrderStepTypeGroupViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing order step type group entries.
    """

    queryset = OrderStepTypeGroup.objects.all()
    serializer_class = OrderStepTypeGroupSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStepTypeGroupFilter
    filterset_fields = ['id', 'name', 'orderStepType']
    # authentication_classes = [TokenAuthentication, ]


class OrderStepTypeGroupOrderStepTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing order step type group entries.
    """

    queryset = OrderStepTypeGroupOrderStepType.objects.all()
    serializer_class = OrderStepTypeGroupOrderStepTypeSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStepTypeGroupOrderStepTypeFilter
    filterset_fields = ['id', 'orderStepTypeGroup', 'orderStepType']
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
