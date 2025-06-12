from django.urls import path
from app_tech_web.controllers.product_controller import get_all_product, get_product_by_id,create_product
from app_tech_web.controllers.cart_controller import get_all_cart, get_cart_by_id, create_cart, delete_cart
from app_tech_web.controllers.purchase_controller import get_all_purchase, get_purchase, create_purchase, update_purchase, update_status_purchase, delete_purchase

urlpatterns = [
    path('get_all_product/', get_all_product, name='get_all_product'),
    path('create_product/', create_product, name='create_product'),
    path('get_product_by_id/<int:product_id>/', get_product_by_id, name='get_product_by_id'),

    path('get_all_cart/', get_all_cart, name='get_all_cart'),
    path('get_cart_by_id/<int:cart_id>/', get_cart_by_id, name='get_cart_by_id'),
    path('create_cart/', create_cart, name='create_cart'),
    path('delete_cart/<int:cart_id>/', delete_cart, name='delete_cart'),

    path('get_all_purchase/', get_all_purchase, name='get_all_purchase'),
    path('get_purchase/<int:cart_id>/', get_purchase, name='get_purchase'),
    path('create_purchase/', create_purchase, name='create_purchase'),
    path('update_purchase/<int:purchase_id>/', update_purchase, name='update_purchase'),
    path('update_status_purchase/', update_status_purchase, name='update_status_purchase'),
    path('delete_purchase/<int:purchase_id>/', delete_purchase, name='delete_purchase')
]