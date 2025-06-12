from rest_framework import serializers
from app_tech_web.models.cart import Cart

class CartSerializer(serializers.ModelSerializer):
    subtotal_sum = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['cart_id', 'shipping_delivery', 'tax', 'discount', 'total', 'subtotal_sum']

    def get_subtotal_sum(self, obj):
        return obj.subtotal_sum