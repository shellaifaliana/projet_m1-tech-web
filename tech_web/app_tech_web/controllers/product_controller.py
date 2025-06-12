from rest_framework.decorators import api_view
from django.http import JsonResponse
from app_tech_web.models import Product
from app_tech_web.serializers.product_serializer import ProductSerializer

from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    method='get',
    operation_description="Récuperer tous les produits",
    responses={200: ProductSerializer(many=True)}
)
@api_view(['GET'])
def get_all_product(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='get',
    operation_description="Récuperer un produit par son ID",
    responses={200: ProductSerializer()}
)
@api_view(['GET'])
def get_product_by_id(request, product_id):
    try:
        product = Product.objects.get(product_id=product_id)
        serializer = ProductSerializer(product)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Produit non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='post',
    operation_description="Crée un nouveau produit",
    request_body=ProductSerializer,
    responses={201: ProductSerializer()}
)
@api_view(['POST'])
def create_product(request):
    try:
        data = request.data
        files = request.FILES

        product = Product.objects.create(
            name=data.get("name"),
            label=data.get("label"),
            price=data.get("price"),
            description=data.get("description"),
            short_description=data.get("short_description"),
            prime_image=files.get("prime_image"),
            second_image=files.get("second_image")
        )

        serializer = ProductSerializer(product)
        return JsonResponse(serializer.data, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
