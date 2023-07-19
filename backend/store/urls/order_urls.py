from django.urls import path
from store.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
]
