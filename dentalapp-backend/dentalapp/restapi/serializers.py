from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import Doctor, DoctorDetails, Order, OrderStepType, OrderStatus, OrderStep, OrderColor

# ModelSerializer is from django rest framework


def validateNumber(number):
    if(len(str(number)) != 10 or len(str(number)) != 6):
        raise serializers.ValidationError(
            "Cannot add Doctor. Reason: Phone number is not valid! Number format: xxxx xxx xxx).")


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


class DoctorDetailsSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = DoctorDetails
        fields = [
            'id', 'doctorId', 'cabinet', 'phone', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]


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


class OrderSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    doctorName = serializers.CharField(
        source='doctor.__str__', read_only=True)

    # patientName = serializers.CharField(
    #     source='patient.__str__', read_only=True)

    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'doctor', 'doctorName', 'patientName', 'redo', 'paid', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]


class OrderStepTypeSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    # Validating data
    stepType = serializers.CharField(validators=[UniqueValidator(queryset=OrderStepType.objects.all(
    ), message="Cannot add order step type. Reason: Order step type already exists.")])
    

    class Meta:
        model = OrderStepType
        fields = [
            'id', 'stepType', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'stepType': {
                'read_only': False,
                'required': True,
            },

            'color': {
                'required': False,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }


class OrderColorSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    # Validating data
    color = serializers.CharField(validators=[UniqueValidator(queryset=OrderColor.objects.all(
    ), message="Cannot add order color. Reason: Order color already exists.")])

    class Meta:
        model = OrderStatus
        fields = [
            'id', 'color', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'color': {
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


class OrderStatusSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    # Validating data
    status = serializers.CharField(
        validators=[
            UniqueValidator(queryset=OrderStatus.objects.all(), 
            message="Cannot add order status. Reason: Order status already exists.")
        ]
    )

    class Meta:
        model = OrderStatus
        fields = [
            'id', 'status', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'status': {
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


class OrderStepSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the stepeName, stepPPU and statusName

    stepName = serializers.CharField(
        source='step.__str__', read_only=True
    )

    stepPPU = serializers.CharField(
        source='step.ppu', read_only=True
    )

    statusName = serializers.CharField(
        source='status.__str__', read_only=True
    )

    colorName = serializers.CharField(
        source='color.__str__', read_only=True)

    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = OrderStep
        fields = [
            'id', 'order', 'stepType', 'stepName', 'stepPPU', 'color', 'colorName', 'status', 'statusName', 'unitCount', 'warranty', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'order': {
                'read_only': False,
                'required': True,
            },

            'color': {
                'required': True,
            },

            'step': {
                'required': True,
            },

            'status': {
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }

        validators = [
            UniqueTogetherValidator(
                queryset=OrderStep.objects.all(), fields=['order', 'stepType'], message="Cannot add Step. Reason: Order step already exists."
            )
        ]
