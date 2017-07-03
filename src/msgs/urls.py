from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.msgs_list, name='msgs_list'),
    url(r'^add$', views.msg_create, name='msg_create'),
    url(r'^edit/(?P<pk>\d+)$', views.msg_edit, name='msg_edit'),
    url(r'^del/(?P<pk>\d+)$', views.msg_del, name='msg_del'),
]