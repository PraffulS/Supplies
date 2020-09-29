from django.db import models

class Suppliers(models.Model):
    id = models.AutoField(primary_key=True)
    business_name = models.CharField(max_length=100)
    business_address = models.CharField(max_length=500,  blank=True)

    primary_repr_name = models.CharField(max_length=100)
    primary_email = models.CharField(max_length=100, unique=True)
    primary_contact = models.CharField(max_length=20)

    secondary_repr_name = models.CharField(max_length=100)
    secondary_email = models.CharField(max_length=100)
    secondary_contact = models.CharField(max_length=20)

    password = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now_add=True)

    auth_key = models.CharField(max_length=100, default=None, null=True)

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price_per_unit = models.FloatField(default=0.0)
    currency = models.CharField(max_length=3)
    discount_percentage = models.FloatField(default=0.0)
    min_units_for_discount = models.FloatField(default=0.0)
    other_notes = models.CharField(max_length=500, null=True)

    code = models.CharField(max_length=10, null=False)
    supplier = models.ForeignKey(Suppliers, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now_add=True)

    is_deleted = models.BooleanField(default=False)