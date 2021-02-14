from django.contrib import admin
from django.urls import path
from webapp import views

urlpatterns = [
    path('api/employee/', views.employee_list),
    path('api/employee/<int:id>', views.employee_details)
]