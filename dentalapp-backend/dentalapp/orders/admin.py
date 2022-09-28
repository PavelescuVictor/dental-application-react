from django.contrib import admin
from django import forms
from django.forms.models import BaseInlineFormSet
from .models import Order, OrderStepType, OrderStepTypeGroup, OrderStepTypeGroupOrderStepType, OrderStatus, OrderColor, OrderStep

class OrderStepInline(admin.TabularInline):
    model = OrderStep
    # Using extra to display and exact amount of extra field forms for the OrderStep in the creation form of a model.
    extra = 1
    fields = [
        'order', 'stepType', 'status', 'unitCount', 'warranty', 'ppu'
    ]

class OrderAdmin(admin.ModelAdmin):
    fields = [
        'doctor', 'patientName', 'paid', 'redo'
    ]
    list_display = [
        'id', 'getDoctorName', 'getPatientName', 'paid', 'redo', 'createdBy', 'getCreatedByName', 'getCreatedAt', 'updatedBy', 'getUpdatedByName', 'getUpdatedAt'
    ]
    search_fields = [
        'doctor__firstName', 'doctor__lastName', 'patientName', 'createdBy__email'
    ]

    inlines = [OrderStepInline]

    def getDoctorName(self, obj):
        return obj.doctor;
    
    getDoctorName.short_description = 'Doctor Name'

    def getPatientName(self, obj):
        return obj.patientName;
    
    getPatientName.short_description = 'Patient Name'

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'

    def getCreatedAt(self, obj):
        return obj.createdAt;

    getCreatedAt.admin_order_field = 'createdAt'
    getCreatedAt.short_description = 'Created At'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def getUpdatedAt(self, obj):
        return obj.updatedAt;

    getUpdatedAt.admin_order_field = 'updatedAt'
    getUpdatedAt.short_description = 'Updated At'

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        pre_instance = form.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for instance in instances:
            if request.method == "POST":
                if (change == False):
                    instance.createdBy = request.user
                    instance.updatedBy = request.user
                else:
                    instance.createdBy = request.user
                    instance.updatedBy = request.user
            instance.save()
        formset.save_m2m()

    def getDoctor(self, obj):
        return obj.fullName()

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStepTypeAdmin(admin.ModelAdmin):
    fields = [
        'stepType'
    ]
    list_display = [
        'id', 'stepType', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'stepType', 'createdBy__email'
    ]

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStepTypeGroupAdmin(admin.ModelAdmin):
    fields = [
        'name'
    ]
    list_display = [
        'id', 'name', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'name', 'createdBy__email'
    ]

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStepTypeGroupOrderStepTypeAdmin(admin.ModelAdmin):
    fields = [
        'orderStepTypeGroup', 'orderStepType'
    ]
    list_display = [
        'id', 'getOrderStepTypeGroupName', 'getOrderStepTypeName', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'orderStepTypeGroup__name', 'orderStepType__stepType', 'createdBy__email'
    ]

    def getOrderStepTypeGroupName(self, obj):
        return obj.orderStepTypeGroup.__str__()

    getOrderStepTypeGroupName.admin_order_field = 'orderStepTypeGroup__name'
    getOrderStepTypeGroupName.short_description = 'Order Step Type Group Name'

    def getOrderStepTypeName(self, obj):
        return obj.orderStepType.__str__()

    getOrderStepTypeGroupName.admin_order_field = 'orderStepType__stepType'
    getOrderStepTypeGroupName.short_description = 'Order Step Type Name'

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStatusAdmin(admin.ModelAdmin):
    fields = [
        'status'
    ]
    list_display = [
        'id', 'status', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'status', 'createdBy__email'
    ]

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderColorAdmin(admin.ModelAdmin):
    fields = [
        'color'
    ]
    list_display = [
        'id', 'color', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy','getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'color', 'createdBy__email'
    ]

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStepAdmin(admin.ModelAdmin):
    fields = [
        'order', 'color', 'stepType', 'stepOrder', 'status', 'unitCount', 'warranty', 'ppu'
    ]
    list_display = [
        'id', 'getOrderId', 'getOrderDoctor', 'getOrderPatient', 'getOrderStepType', 'stepOrder', 'color', 'stepType', 'status', 'unitCount', 'warranty', 'getPricePerUnit', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]
    search_fields = [
        'order', 'stepType__stepType', 'order__doctor__firstName', 'order__doctor__lastName', 'status__status', 'createdBy__email'
    ]

    def getCreatedByName(self, obj):
        return obj.createdBy.__str__()

    getCreatedByName.admin_order_field = 'createdBy__name'
    getCreatedByName.short_description = 'Created By Name'
    
    def getUpdatedByName(self, obj):
        return obj.updatedBy.__str__()

    getUpdatedByName.admin_order_field = 'updatedBy__name'
    getUpdatedByName.short_description = 'Updated By Name'

    def getOrderId(self, obj):
        return obj.order.id

    getOrderId.admin_order_field = 'order__id'
    getOrderId.short_description = 'Order Id'

    def getOrderDoctor(self, obj):
        return obj.order.doctor

    getOrderDoctor.admin_order_field = 'order__doctor'
    getOrderDoctor.short_description = 'Doctor'

    def getOrderPatient(self, obj):
        return obj.order.patientName

    getOrderPatient.admin_order_field = 'order__patientName'
    getOrderPatient.short_description = 'Patient'

    def getOrderStepType(self, obj):
        return obj.stepType.stepType

    def getPricePerUnit(self, obj):
        return obj.ppu

    getPricePerUnit.admin_order_field = 'ppu'
    getPricePerUnit.short_description = 'Price Per Unit'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStepType, OrderStepTypeAdmin)
admin.site.register(OrderStepTypeGroup, OrderStepTypeGroupAdmin)
admin.site.register(OrderStepTypeGroupOrderStepType, OrderStepTypeGroupOrderStepTypeAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
admin.site.register(OrderColor, OrderColorAdmin)
admin.site.register(OrderStep, OrderStepAdmin)
