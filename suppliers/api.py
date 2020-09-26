
import json
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from suppliers.models import *
from suppliers.serializers import *

@require_POST
def add_edit_supplier(request):
    try:
        args = json.loads(request.body)
        if not args:
            return HttpResponseServerError('Invalid Data Found')
        
        if args.get('id'):
            supplier = Suppliers.objects.get(id = args.get('id'))
        else:
            supplier = Suppliers()
        
        [ setattr(supplier, key, args.get(key)) for key in args.keys() ]
        supplier.save()

        return JsonResponse({'data' : SupplierSerializer(supplier, many=False).data, 'message' : 'Success'})
    except Exception as e:
        return HttpResponseServerError('Server Error - {}'.format(str(e)))

@require_POST
def add_edit_product(request):
    try:
        args = json.loads(request.body)
        if not args:
            return HttpResponseServerError('Invalid Data Found')
        
        if args.get('id'):
            product = Products.objects.get(id = args.get('id'))
        else:
            product = Products()
        
        [ setattr(product, key, args.get(key)) for key in args.keys() ]
        product.save()

        return JsonResponse({'data' : ProductSerializer(product, many=False).data, 'message' : 'Success'})
    except Exception as e:
        return HttpResponseServerError('Server Error - {}'.format(str(e)))


@require_POST
def supplier_login(request):
    data = request.POST.dict()
    email = data.get('email')
    password = data.get('password')
    supplier = Suppliers.objects.filter(email__iexact=email).first()

    if not supplier:
        return HttpResponseServerError('Invalid Email Id found')
    
    if not password == supplier.password:
        return HttpResponseServerError('Wrong Password Given')
    
    request.session['is_supplier_login'] = True
    return HttpResponse('Success')

@require_GET
def get_products_by_supplier(request, s_id):
    result = Products.objects.filter(supplier_id=s_id, is_deleted=False)
    return JsonResponse({'data': ProductSerializer(result, many=True).data })

@require_GET
def get_supplier(request, s_id):
    result = Suppliers.objects.get(id=s_id)    
    return JsonResponse({'data': SupplierSerializer(result, many=True).data })








