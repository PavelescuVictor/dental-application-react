from django.contrib import admin
from django import forms
# from .models import Patient, PatientDetails


# class PatientAdmin(admin.ModelAdmin):
#     fields = [
#         'firstName', 'lastName'
#     ]
#     list_display = [
#         'id', 'fullName', 'firstName', 'lastName', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
#     ]
#     search_fields = [
#         'firstName', 'lastName', 'createdBy__username'
#     ]

#     def getCreatedByName(self, obj):
#         return obj.createdBy.__str__()

#     getCreatedByName.admin_order_field = 'createdBy__name'
#     getCreatedByName.short_description = 'Created By Name'
    
#     def getUpdatedByName(self, obj):
#         return obj.updatedBy.__str__()

#     getUpdatedByName.admin_order_field = 'updatedBy__name'
#     getUpdatedByName.short_description = 'Updated By Name'

#     def save_model(self, request, obj, form, change):
#         obj.createdBy = request.user
#         obj.updatedBy = request.user
#         super().save_model(request, obj, form, change)


# class PatientDetailsAdmin(admin.ModelAdmin):
#     fields = [
#         'phone', 'details'
#     ]
#     list_display = [
#         'id', 'patient', 'phone', 'details', 'createdBy', 'getCreatedByName', 'createdAt', 'updatedBy', 'getUpdatedByName', 'updatedAt'
#     ]
#     search_fields = [
#         'phone', 'createdBy__username'
#     ]

#     def getCreatedByName(self, obj):
#         return obj.createdBy.__str__()

#     getCreatedByName.admin_order_field = 'createdBy__name'
#     getCreatedByName.short_description = 'Created By Name'
    
#     def getUpdatedByName(self, obj):
#         return obj.updatedBy.__str__()

#     getUpdatedByName.admin_order_field = 'updatedBy__name'
#     getUpdatedByName.short_description = 'Updated By Name'

#     def save_model(self, request, obj, form, change):
#         obj.createdBy = request.user
#         obj.updatedBy = request.user
#         super().save_model(request, obj, form, change)


# admin.site.register(Patient, PatientAdmin)
# admin.site.register(PatientDetails, PatientDetailsAdmin)