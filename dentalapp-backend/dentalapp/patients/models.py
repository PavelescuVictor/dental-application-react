from django.db import models

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