from rest_framework import serializers
from app_tech_web.models.product import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'label', 'price', 'description', 'short_description', 'prime_image', 'second_image']