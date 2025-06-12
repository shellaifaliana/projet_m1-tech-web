from rest_framework import serializers
from app_tech_web.models.purchage import Purchase
from app_tech_web.serializers.product_serializer import ProductSerializer
from app_tech_web.serializers.cart_serializer import CartSerializer

class PurchaseSerializer(serializers.ModelSerializer):
    product = ProductSerializer(source='product_id', read_only=True)
    cart = CartSerializer(source='cart_id', read_only=True)

    class Meta:
        model = Purchase
        fields = ['purchase_id', 'quantity', 'sub_total', 'status', 'product', 'cart']