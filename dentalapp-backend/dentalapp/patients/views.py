from django.shortcuts import render

# Creating Patient Filter

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

# Creating Patient ViewSet

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