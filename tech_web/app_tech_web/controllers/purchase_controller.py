from rest_framework.decorators import api_view
from django.http import JsonResponse
from app_tech_web.models import Purchase, Product, Cart
from app_tech_web.serializers.purchase_serializer import PurchaseSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    operation_description="Récuperer tous les achats",
    responses={200: PurchaseSerializer(many=True)},
)
@api_view(['GET'])
def get_all_purchase(request):
    try:
        purchases = Purchase.objects.all()
        serializer = PurchaseSerializer(purchases, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='get',
    operation_description="Récuperer une achat à partir du Panier",
    responses={200: PurchaseSerializer()},
)  
@api_view(['GET'])
def get_purchase(request, cart_id):
    try:
        purchase = Purchase.objects.filter(cart_id=cart_id, status=True).order_by('purchase_id')
        serializer = PurchaseSerializer(purchase, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Purchase.DoesNotExist:
        return JsonResponse({'error': 'Purchase non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='post',
    operation_description="Ajout d'une achat",
    request_body=PurchaseSerializer,
    responses={201: PurchaseSerializer()},
)
@api_view(['POST'])
def create_purchase(request):
    try:
        data=request.data

        try:
            product = Product.objects.get(pk=data.get("product_id"))
            cart = Cart.objects.get(pk=data.get("cart_id"))
        except Exception as e:
            return {"error": str(e)}

        purchase = Purchase.objects.create(
            quantity=data.get('quantity'),
            status=True,
            product_id = product,
            cart_id = cart
        )

        serializer = PurchaseSerializer(purchase)
        return JsonResponse(serializer.data, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method="put",
    operation_description="Mettre à jour un achat à partir de son ID",
    request_body=PurchaseSerializer,
    manual_parameters=[
        openapi.Parameter(
            'purchase_id',
            openapi.IN_PATH,
            description="ID de l'achat à mettre à jour",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response("Achat mis à jour avec succès", PurchaseSerializer),
        400: "Erreur de requête",
        404: "Achat non trouvé"
    }
)   
@api_view(["PUT"])
def update_purchase(request, purchase_id):
    try:
        purchase = Purchase.objects.get(purchase_id=purchase_id)
        data = request.data
        purchase.quantity = data.get("quantity", purchase.quantity)
        purchase.save()

        serializer = PurchaseSerializer(purchase)
        return JsonResponse(serializer.data, status=200)
    except Purchase.DoesNotExist:
        return JsonResponse({'error': 'Purchase non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@swagger_auto_schema(
    method='put',
    operation_description="Mettre à jour le statut d'un achat",
    responses={
        200: openapi.Response("Statut mis à jour avec succès"),
        400: "Erreur de requête"
    }
)
@api_view(["PUT"])
def update_status_purchase(request):
    try:
        purchase = Purchase.objects.filter(status=True).update(status=False)
        return JsonResponse({'message': f'{purchase} achats mis à jour'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    

@swagger_auto_schema(
    method='delete',
    operation_description="Supprimer un achat à partir de son ID",
    manual_parameters=[
        openapi.Parameter(
            'purchase_id',
            openapi.IN_PATH,
            description="ID de l'achat à supprimer",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: "Achat supprimé avec succès",
        404: "Achat non trouvé",
        400: "Erreur de requête"
    }
)
@api_view(['DELETE'])
def delete_purchase(request, purchase_id):
    try:
        purchase = Purchase.objects.get(purchase_id=purchase_id)
        purchase.delete()
        return JsonResponse({'message': 'Purchase supprimer avec succès'}, status=200)
    except Purchase.DoesNotExist:
        return JsonResponse({'error': 'Purchase non trouvé'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
        

        