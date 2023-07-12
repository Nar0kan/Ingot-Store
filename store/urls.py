from django.contrib import admin
from django.urls import path
from .views import home

app_name = "store"

urlpatterns = [
    path('', home, name="landing"),
]
