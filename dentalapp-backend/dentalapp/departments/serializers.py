from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import EmployeeDepartment, EmployeeDepartmentAOW, EmployeeDepartmentUser

# ModelSerializer is from django rest framework

class EmployeeDepartmentSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True
    )

    # Validating data
    name = serializers.CharField(
        validators=[
            UniqueValidator(queryset=EmployeeDepartment.objects.all(), 
            message="Cannot add employee department. Reason: Employee department already exists.")
        ]
    )

    class Meta:
        model = EmployeeDepartment
        fields = [
            'id', 'name', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]


class EmployeeDepartmentAOWSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True
    )
        
    class Meta:
        model = EmployeeDepartmentAOW
        fields = [
            'id', 'employeeDepartment', 'orderStepType', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=EmployeeDepartmentAOW.objects.all(), fields=['employeeDepartment', 'orderStepType'], message="Cannot add employee department aow. Reason:  Employee department aow already exists!"
            )
        ]
        extra_kwargs = {
            'employeeDepartment': {
                'read_only': False,
                'required': True,
            },
            'orderStepType': {
                'read_only': False,
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }


class EmployeeDepartmentUserSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True
    )
        
    class Meta:
        model = EmployeeDepartmentAOW
        fields = [
            'id', 'employeeDepartment', 'user', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'employeeDepartment': {
                'read_only': False,
                'required': True,
            },
            'user': {
                'read_only': False,
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }