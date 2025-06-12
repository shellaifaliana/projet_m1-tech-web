from django.db import models
from .product import Product
from .cart import Cart

class Purchase(models.Model):
    purchase_id = models.AutoField(primary_key=True)
    quantity = models.IntegerField()
    sub_total = models.IntegerField()
    status = models.BooleanField(default=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.product_id and self.quantity:
            self.sub_total = self.quantity * self.product_id.price
        super().save(*args, **kwargs)

        self.cart_id.total = self.cart_id.calculate_total()
        self.cart_id.save()