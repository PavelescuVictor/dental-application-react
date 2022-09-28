from django.db import models
from userauth.models import User
from phonenumber_field.modelfields import PhoneNumberField

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