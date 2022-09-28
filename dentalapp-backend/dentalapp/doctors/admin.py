from django.contrib import admin
from django import forms
from .models import Doctor, DoctorDetails

class DoctorAdmin(admin.ModelAdmin):
    fields = [
        'firstName', 'lastName'
    ]

    list_display = [
        'id', 'fullName', 'firstName', 'lastName', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]

    search_fields = [
        'firstName', 'lastName', 'createdBy__email'
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


class DoctorDetailsAdmin(admin.ModelAdmin):
    fields = [
        'doctor', 'cabinet', 'phone'
    ]

    list_display = [
        'id', 'doctor', 'cabinet', 'phone', 'createdBy', 'getCreatedByName', 'createdAt',  'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]

    search_fields = [
        'cabinet', 'phone', 'createdBy__email'
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


admin.site.register(Doctor, DoctorAdmin)
admin.site.register(DoctorDetails, DoctorDetailsAdmin)