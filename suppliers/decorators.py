from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from functools import wraps
from suppliers.models import *


def supplier_login_check():
    def decorator(func):
        def inner_decorator(request, *args, **kwargs):
            if request.META.get('HTTP_X_CSRFTOKEN'):
                is_valid = Suppliers.objects.filter(auth_key=request.META.get('HTTP_X_CSRFTOKEN')).exists()
                if  is_valid:
                    return func(request, *args, **kwargs)
                else:
                    return HttpResponseServerError('Invalid Token')
            else:
                return HttpResponseServerError('Invalid Token')
        return wraps(func)(inner_decorator)
    return decorator