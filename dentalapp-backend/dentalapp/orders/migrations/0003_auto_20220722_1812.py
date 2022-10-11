# Generated by Django 3.1.2 on 2022-07-22 15:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0002_auto_20220722_1752'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='orderstep',
            unique_together={('order', 'stepType'), ('stepType', 'stepOrder'), ('order', 'stepOrder')},
        ),
        migrations.CreateModel(
            name='OrderStepTypeGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, unique=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('createdBy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('orderStepType', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.ordersteptype')),
                ('updatedBy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Order Step Type Group',
                'verbose_name_plural': 'Order Step Type Groups',
                'ordering': ['name', 'orderStepType'],
                'unique_together': {('name', 'orderStepType')},
            },
        ),
    ]