from django.db import models
from doctors.models import Doctor
from userauth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

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


class OrderStepTypeGroup(models.Model):
    name = models.TextField(null=False, blank=True, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Order Step Type Group"
        verbose_name_plural = "Order Step Type Groups"
        unique_together = [['name']]


class OrderStepTypeGroupOrderStepType(models.Model):
    orderStepTypeGroup = models.ForeignKey(OrderStepTypeGroup, on_delete=models.PROTECT)
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
        ordering = ['orderStepTypeGroup', 'orderStepType']
        verbose_name = "Order Step Type Group Order Step Type"
        verbose_name_plural = "Order Step Type Group Order Step Types"
        unique_together = [['orderStepTypeGroup', 'orderStepType']]


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
    STATUS_CHOICES = (
        ('ready-for-work', 'Ready for work'),
        ('currently-in-work', 'Currently in work'),
        ('finished-working', 'Finished Working')
    )
    # status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT)
    status = models.TextField(choices=STATUS_CHOICES, blank=False, null=False, default='ready-for-work')
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
        unique_together = [['order', 'stepType'], ['stepType', 'stepOrder'], ['order', 'stepOrder']]