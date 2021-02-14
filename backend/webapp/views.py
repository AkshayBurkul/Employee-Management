from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employees
from .serializers import employeesSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def employee_list(request):
    if request.method == 'GET':
        employees1=employees.objects.all()
        serializer=employeesSerializer(employees1,many="True")
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = employeesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUES)  

@api_view(['GET', 'PUT', 'DELETE'])
def employee_details(request,id):
    employee = employees.objects.get(id=id)

    if request.method == 'PUT':
        serializer = employeesSerializer(employee,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUES)  

    elif request.method == 'DELETE':
        employee.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT)         