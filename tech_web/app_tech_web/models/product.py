from django.db import models

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    label = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField()
    short_description = models.TextField()
    prime_image = models.ImageField(upload_to='product_images/')
    second_image = models.ImageField(upload_to='product_images/')