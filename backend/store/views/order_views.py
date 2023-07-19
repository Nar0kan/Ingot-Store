from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from store.serializers import OrderSerializer
from store.models import *


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):

    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No order items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        # Create order

        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )

        # Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address = data['shippingAddress']['address'],
            postalCode = data['shippingAddress']['postalCode'],
            city = data['shippingAddress']['city'],
            country = data['shippingAddress']['country'],
        )

        # Create order items & set order to orderItem relationship

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # Update product stock
            product.countInStock -= item.qty
            product.save()
    
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
