from django.db import models
from django.contrib.auth import get_user_model as user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

"""
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

"""
User = user_model()

class Doctor(models.Model):
    firstName = models.CharField(max_length=100, verbose_name="First Name")
    lastName = models.CharField(max_length=100, verbose_name="Last Name")
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering: ['fullName', 'firstName', 'lastName']
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    def fullName(self):
        return f'{self.firstName} {self.lastName}'

    def __str__(self):
        return self.fullName()



class DoctorDetails(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=False, related_name="+")
    cabinet = models.TextField(max_length=300, verbose_name="Cabinet")
    phone = PhoneNumberField(null=False, blank=False,
                             unique=True, verbose_name="Numar Telefon")
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['cabinet']
        verbose_name = "Doctor Details"
        verbose_name_plural = "Doctor Details"



# class Patient(models.Model):
#     firstName = models.CharField(max_length=80)
#     lastName = models.CharField(max_length=80)
#     createdBy = models.ForeignKey(User,
#                                   on_delete=models.SET_NULL, null=True,
#                                   related_name='+')
#     updatedBy = models.ForeignKey(User,
#                                   on_delete=models.SET_NULL, null=True,
#                                   related_name='+')
#     createdAt = models.DateTimeField(auto_now_add=True)
#     updatedAt = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering: ['firstName', 'lastName']
#         verbose_name = "Patient"
#         verbose_name_plural = "Patients"

#     def fullName(self):
#         return f'{self.firstName} {self.lastName}'

#     def __str__(self):
#         return self.fullName()
#
#
#
# class PatientDetails(models.Model):
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=False, related_name="+")
#     phone = PhoneNumberField(null=False, blank=False, unique=True)
#     details = models.TextField(max_length=300)
#     createdBy = models.ForeignKey(User,
#                                   on_delete=models.SET_NULL, null=True,
#                                   related_name='+')
#     updatedBy = models.ForeignKey(User,
#                                   on_delete=models.SET_NULL, null=True,
#                                   related_name='+')
#     createdAt = models.DateTimeField(auto_now_add=True)
#     updatedAt = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering: ['patientId']
#         verbose_name = "Patient Details"
#         verbose_name_plural = "Patient Details"



class Order(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    # patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    patientName = models.TextField(null=False, blank=False, unique=False)
    redo = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-createdAt']
        verbose_name = "Order"
        verbose_name_plural = "Orders"



class OrderColor(models.Model):
    color = models.TextField(null=False, blank=False, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.color

    class Meta:
        ordering = ['color']
        verbose_name = "Order Color"
        verbose_name_plural = "Order Colors"



class OrderStepType(models.Model):
    stepType = models.TextField(null=False, blank=False, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.stepType

    class Meta:
        ordering = ['stepType']
        verbose_name = "Order Step Type"
        verbose_name_plural = "Order Step Types"


class OrderStatus(models.Model):
    status = models.TextField(null=False, blank=True, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.status

    class Meta:
        ordering = ['status']
        verbose_name = "Order Status"
        verbose_name_plural = "Order Status"

class OrderStep(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    stepType = models.ForeignKey(OrderStepType, on_delete=models.PROTECT)
    stepOrder = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(1)], blank=False)
    status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT)
    color = models.ForeignKey(OrderColor, on_delete=models.PROTECT, null=True, blank=True)
    unitCount = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1)], null=False, blank=False)
    warranty = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0)], null=False, blank=False)
    ppu = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0)], null=False, blank=False)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'stepType', 'color', 'status']
        verbose_name = "Order Step"
        verbose_name_plural = "Order Steps"