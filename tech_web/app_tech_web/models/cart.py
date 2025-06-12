from django.db import models

class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    shipping_delivery = models.IntegerField(default=20)
    tax = models.IntegerField(default=6)
    discount = models.IntegerField(default=6)
    total = models.IntegerField(default=0, editable=False)

    @property
    def subtotal_sum(self):
        purchases = self.purchase_set.all()
        return sum(purchase.sub_total for purchase in purchases)

    def calculate_total(self):
        if not self.pk:
            return 0
        purchases = self.purchase_set.all()
        subtotal_sum = sum(purchase.sub_total for purchase in purchases)
        return subtotal_sum + self.shipping_delivery + self.tax - self.discount
    
    def save(self, *args, **kwargs):
        self.total = self.calculate_total()
        super().save(*args, **kwargs)