from rest_framework import serializers
from suppliers.models import Suppliers, Products

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suppliers
        fields = ('id', 'business_name', 'business_address', 'primary_repr_name', 'primary_email', \
            'primary_contact', 'secondary_repr_name', 'secondary_email', 'secondary_contact', \
            'created_at', 'last_updated_at')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
    
