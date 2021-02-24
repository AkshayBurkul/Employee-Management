from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employees
from .serializers import employeesSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import User,auth


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE':
        employee.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT) 

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        user=User.objects.create(username=request.data.get('username'))
        user.set_password(request.data.get('password'))
        user.save()
        return Response()

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username=request.data.get('username')
        password=request.data.get('password')
        user=auth.authenticate(username=username,password=password)

        if user is not None:
            auth.login(request,user)
            msg="Login Succesfully"
        else:
            msg="Invalid credintials"
    return Response(msg)  


@api_view(['POST'])
def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        msg='Logout'
    return Response(msg)


# class EmployeeList(APIView):
#     def get(self, request, format=None):
#         employees1=employees.objects.all()
#         serializer=employeesSerializer(employees1,many="True")
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = employeesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


# class EmployeeDetail(APIView):

#     def get_object(self, id):
#         employee = employees.objects.get(id=id)

#     def put(self, request, id, format=None):
#         employee = self.get_object(id)
#         serializer = employeesSerializer(employee,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUES)  

#     def delete(self, request, id, format=None):
#         employee = self.get_object(id)
#         employee.delete() 
#         return Response(status=status.HTTP_204_NO_CONTENT)

  