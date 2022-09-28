# class PatientSerializer(serializers.ModelSerializer):
#     # Getting the names of the users that created and updated the model and the doctor and patient name
#     createdByName = serializers.CharField(
#         source='createdBy.__str__', read_only=True
#     )
    
#     updatedByName = serializers.CharField(
#         source='updatedBy.__str__', read_only=True)
        
#     class Meta:
#         model = Patient
#         fields = [
#             'id', 'firstName', 'lastName', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
#         ]
#         validators = [
#             UniqueTogetherValidator(
#                 queryset=Patient.objects.all(), fields=['firstName', 'lastName'], message="Cannot add patient. Reason:  Patient already exists!"
#             )
#         ]


# class PatientDetailsSerializer(serializers.ModelSerializer):
#     # Getting the names of the users that created and updated the model and the doctor and patient name
#     createdByName = serializers.CharField(
#         source='createdBy.__str__', read_only=True
#     )
    
#     updatedByName = serializers.CharField(
#         source='updatedBy.__str__', read_only=True)

#     class Meta:
#         model = Patient
#         fields = [
#             'id', 'patientId', 'phone', 'details', 'createdBy', 'createdByName', 'updatedBy', 'updateByName', 'createdAt', 'updatedAt'
#         ]