from django.db import models
from django.contrib.auth import get_user_model as user_model
from orders.models import OrderStepType

# Create your models here.

User = user_model()

class EmployeeDepartment(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering: ['name']
        verbose_name = "Employee Department"
        verbose_name_plural = "Employee Departments"

    def __str__(self):
        return self.name


class EmployeeDepartmentAOW(models.Model):
    employeeDepartment = models.ForeignKey(EmployeeDepartment, on_delete=models.PROTECT)
    orderStepType = models.ForeignKey(OrderStepType, on_delete=models.PROTECT)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering: ['employeeDepartment', 'orderTypeType']
        verbose_name = "Employee Department AOW"
        verbose_name_plural = "Employee Department AOWs"
        unique_together = [['employeeDepartment', 'orderStepType']]


class EmployeeDepartmentUser(models.Model):
    employeeDepartment = models.ForeignKey(EmployeeDepartment, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering: ['employeeDepartment', 'user']
        verbose_name = "Employee Department User"
        verbose_name_plural = "Employee Department Users"
        unique_together = [['employeeDepartment', 'user']]
