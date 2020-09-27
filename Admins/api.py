from Admins.models import AdminUsers
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt

@require_POST
@csrf_exempt
def admin_login(request):
    data = request.POST.dict()
    username = data.get('username')
    password = data.get('password')
    _admin = AdminUsers.objects.filter(username__iexact=username).first()

    if not _admin:
        return JsonResponse({'code': 1, 'message' :'Invalid Username Given'})
    
    if not password == _admin.password:
        return JsonResponse({'code': 1, 'message' :'Wrong Password Given'})
    
    return JsonResponse({'code': 0, 'message' :'Logged In!', 'admin_id' : _admin.id})