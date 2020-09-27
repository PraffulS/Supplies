from django.urls import path
from django.conf.urls import url

from Admins.api import *

admin_urlpatterns = [
    url(r'^login/$', admin_login)
]