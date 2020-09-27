
import json
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from suppliers.models import *
from suppliers.serializers import *
from django.db import IntegrityError

@require_POST
@csrf_exempt
def add_edit_supplier(request):
    try:
        args = request.POST.dict()
        if not args:
            return HttpResponseServerError('Invalid Data Found')
        
        if args.get('id'):
            supplier = Suppliers.objects.get(id = args.get('id'))
        else:
            supplier = Suppliers()
        
        [ setattr(supplier, key, args.get(key)) for key in args.keys() ]
        supplier.save()

        return JsonResponse({'code': 1, 'data' : SupplierSerializer(supplier, many=False).data, 'message' : 'You\'ve successfully signed up. Please login to access your account.'})
    except IntegrityError:
        return JsonResponse({'code': 0, 'message' :'Email Id already exists'})
    except Exception as e:
        return JsonResponse({'code': 0, 'message' :'Internal Server Error'+str(e)})

@require_POST
@csrf_exempt
def add_edit_product(request):
    try:
        args = request.POST.dict()
        if not args:
            return HttpResponseServerError('Invalid Data Found')
        
        if args.get('id'):
            product = Products.objects.get(id = args.get('id'))
        else:
            product = Products()
        
        [ setattr(product, key, args.get(key)) for key in args.keys() ]
        product.save()

        return JsonResponse({'code': 1, 'data' : ProductSerializer(product, many=False).data, 'message' : 'Data saved successfully!'})
    except Exception as e:
        return JsonResponse({'code': 0, 'message' :'Some Server error occured. Please try again.'})


@require_POST
@csrf_exempt
def supplier_login(request):
    data = request.POST.dict()
    username = data.get('username')
    password = data.get('password')
    supplier = Suppliers.objects.filter(primary_email__iexact=username).first()

    if not supplier:
        return JsonResponse({'code': 1, 'message' :'Invalid Email Id found'})
    
    if not password == supplier.password:
        return JsonResponse({'code': 1, 'message' :'Wrong Password Given'})
    
    return JsonResponse({'code': 0, 'message' :'Logged In!', 'supplier_id' : supplier.id})

@require_GET
@csrf_exempt
def get_products_by_supplier(request, s_id):
    result = Products.objects.filter(supplier_id=s_id, is_deleted=False)
    return JsonResponse({'data': ProductSerializer(result, many=True).data })

@require_GET
@csrf_exempt
def get_supplier(request, s_id=None):
    if s_id:
        result = Suppliers.objects.get(id=s_id)
    else:
        result = Suppliers.objects.all()

    return JsonResponse({'data': SupplierSerializer(result, many=False if s_id else True).data })

@require_GET
@csrf_exempt
def delete_product(request, p_id):
    Products.objects.filter(id=p_id).update(is_deleted=True)
    return JsonResponse({'code': 1, 'message': 'Product deleted successfully!'})






