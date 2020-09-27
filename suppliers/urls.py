from django.urls import path
from django.conf.urls import url

from suppliers.api import *

suppliers_urlpatterns = [
    url(r'^save/$', add_edit_supplier),
    url(r'^get/(?P<s_id>\w+)$', get_supplier),
    url(r'^get/$', get_supplier),
    url(r'^login/$', supplier_login)
]

products_urlpatterns = [
    url(r'^save/$', add_edit_product),
    url(r'^get/(?P<s_id>\w+)$', get_products_by_supplier),
    url(r'^delete/(?P<p_id>\w+)$', delete_product),
]