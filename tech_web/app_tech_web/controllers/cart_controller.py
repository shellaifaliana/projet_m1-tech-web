from rest_framework.decorators import api_view
from django.http import JsonResponse
from app_tech_web.models import Cart
from app_tech_web.serializers.cart_serializer import CartSerializer

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    operation_description="Récuperer tous les paniers",
    responses={200: CartSerializer(many=True)}
)
@api_view(['GET'])
def get_all_cart(request):
    try:
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
@swagger_auto_schema(
    method='get',
    operation_description="Récuperer une panier à partir de son ID",
    responses={200: CartSerializer()}
)
@api_view(['GET'])
def get_cart_by_id(request, cart_id):
    try:
        cart = Cart.objects.get(cart_id=cart_id)
        serializer = CartSerializer(cart)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Cart.DoesNotExist:
        return JsonResponse({'error': 'Cart non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='post',
    operation_description="Crée une nouvelle panier",
    request_body=CartSerializer,
    responses={201: CartSerializer()}
)
@api_view(['POST'])
def create_cart(request):
    try:
        data=request.data
        
        cart = Cart.objects.create(
            shipping_delivery=20,
            tax=6,
            discount=6,
        )

        serializer = CartSerializer(cart)
        return JsonResponse(serializer.data, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@swagger_auto_schema(
    method='delete',
    operation_description="Supprimer un panier par son ID",
    manual_parameters=[
        openapi.Parameter(
            'cart_id',
            openapi.IN_PATH,
            description="ID du panier à supprimer",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response(description="Panier supprimer avec succès"),
        404: openapi.Response(description="Panier non trouvé"),
        400: openapi.Response(description="Erreur lors de la suppression")
    }
)
@api_view(['DELETE'])
def delete_cart(request, cart_id):
    try:
        cart = Cart.objects.get(cart_id=cart_id)
        cart.delete()
        return JsonResponse({'message': 'Cart supprimer avec succès'}, status=200)
    except Cart.DoesNotExist:
        return JsonResponse({'error': 'Cart non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)