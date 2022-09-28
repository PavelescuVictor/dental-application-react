from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import Doctor, DoctorDetails

class DoctorSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'firstName', 'lastName', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Doctor.objects.all(), fields=['firstName', 'lastName'], message="Cannot add doctor. Reason:  Doctor already exists!"
            )
        ]
        extra_kwargs = {
            'firstName': {
                'required': True,
            },

            'lastName': {
                'required': False,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }


class DoctorDetailsSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    # Validating data
    doctorId = serializers.CharField(validators=[UniqueValidator(queryset=DoctorDetails.objects.all(),
        message="Cannot add doctor details. Reason: Doctor details for this doctor already exists."
    )])
    

    class Meta:
        model = DoctorDetails
        fields = [
            'id', 'doctorId', 'cabinet', 'phone', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'doctorId': {
                'read_only': False,
                'required': True,
            },

            'cabinet': {
                'required': False,
            },

            'phone': {
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }