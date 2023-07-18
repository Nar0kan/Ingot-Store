from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('store.urls')),
    path('api/products/', include('store.urls.product_urls')),
    path('api/users/', include('store.urls.user_urls')),
    path('api/orders/', include('store.urls.order_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
