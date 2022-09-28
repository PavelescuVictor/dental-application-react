from django.contrib import admin
from django import forms
from .models import EmployeeDepartment, EmployeeDepartmentAOW, EmployeeDepartmentUser
from orders.models import OrderStep

class EmployeeDepartmentAdmin(admin.ModelAdmin):
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


class EmployeeDepartmentAOWAdmin(admin.ModelAdmin):
    fields = [
        'employeeDepartment', 'orderStepType'
    ]

    list_display = [
        'id', 'getEmployeeDepartmentName', 'getOrderStepTypeName', 'createdBy', 'getCreatedByName', 'createdAt',  'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]

    search_fields = [
        'employeeDepartment__name', 'orderStepType___stepType', 'createdBy__email'
    ]

    def getEmployeeDepartmentName(self, obj):
        return obj.employeeDepartment.__str__()

    getEmployeeDepartmentName.admin_order_field = 'employeeDepartment__name'
    getEmployeeDepartmentName.short_description = 'Employee Department Name'
    
    def getOrderStepTypeName(self, obj):
        return obj.orderStepType.__str__()

    getOrderStepTypeName.admin_order_field = 'orderStepType__stepType'
    getOrderStepTypeName.short_description = 'Order Step Type Name'

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


class EmployeeDepartmentUserAdmin(admin.ModelAdmin):
    fields = [
        'employeeDepartment', 'user'
    ]

    list_display = [
        'id', 'getEmployeeDepartmentName', 'getUserName', 'createdBy', 'getCreatedByName', 'createdAt',  'updatedBy', 'getUpdatedByName', 'updatedAt'
    ]

    search_fields = [
        'employeeDepartment__name', 'user___name', 'createdBy__email'
    ]

    def getEmployeeDepartmentName(self, obj):
        return obj.employeeDepartment.__str__()

    getEmployeeDepartmentName.admin_order_field = 'employeeDepartment__name'
    getEmployeeDepartmentName.short_description = 'Employee Department Name'
    
    def getUserName(self, obj):
        return obj.user.__str__()

    getUserName.admin_order_field = 'user__name'
    getUserName.short_description = 'User Name'

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


admin.site.register(EmployeeDepartment, EmployeeDepartmentAdmin)
admin.site.register(EmployeeDepartmentAOW, EmployeeDepartmentAOWAdmin)
admin.site.register(EmployeeDepartmentUser, EmployeeDepartmentUserAdmin)