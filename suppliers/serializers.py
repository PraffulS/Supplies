from rest_framework import serializers
from suppliers.models import Suppliers, Products

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suppliers
        fields = ('id', 'business_name', 'business_address', 'primary_repr_name', 'primary_email', \
            'primary_contact', 'secondary_repr_name', 'secondary_email', 'secondary_contact', \
            'created_at', 'last_updated_at')

class SupplierBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suppliers
        fields = ('id', 'business_name')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id', 'name', 'description', 'price_per_unit', 'currency', 'discount_percentage', \
            'min_units_for_discount', 'other_notes', 'code', 'supplier', 'last_updated_at')

class ProductWithSupplierNameSerializer(serializers.ModelSerializer):
    supplier = SupplierBasicSerializer()
    class Meta:
        model = Products
        fields = '__all__'
