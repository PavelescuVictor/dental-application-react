from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import Order, OrderStepType, OrderStepTypeGroup, OrderStepTypeGroupOrderStepType, OrderStatus, OrderStep, OrderColor


class OrderSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the doctor and patient name
    doctorName = serializers.CharField(
        source='doctor.__str__', read_only=True)

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


class OrderStepTypeGroupSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the stepeName, stepPPU and statusName

    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = OrderStep
        fields = [
            'id', 'name', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'name': {
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }


class OrderStepTypeGroupOrderStepTypeSerializer(serializers.ModelSerializer):
    # Getting the names of the users that created and updated the model and the stepeName, stepPPU and statusName

    orderStepTypeGroupName = serializers.CharField(
        source='orderStepTypeGroup.__str__', read_only=True
    )

    orderStepTypeName = serializers.CharField(
        source='orderStepType.__str__', read_only=True
    )

    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )

    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = OrderStep
        fields = [
            'id', 'orderStepTypeGroupName', 'orderStepTypeName', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'orderStepTypeGroup': {
                'required': True,
            },

            'orderStepType': {
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
                queryset=OrderStep.objects.all(), fields=['orderStepTypeGrpup', 'orderStepType'], message="Cannot add order step type group. Reason: Order step type group already exists."
            ),
        ]



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
            'id', 'order', 'stepOrder', 'stepType', 'stepName', 'stepPPU', 'color', 'colorName', 'status', 'statusName', 'unitCount', 'warranty', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
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
                queryset=OrderStep.objects.all(), fields=['order', 'stepType', 'stepOrder'], message="Cannot add Step. Reason: Order step already exists."
            ),
        ]