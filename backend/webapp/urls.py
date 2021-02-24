from django.contrib import admin
from django.urls import path
from webapp import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('api/employee/', views.employee_list),
    path('api/employee/<int:id>', views.employee_details),
    path('api/register/', views.register),
    path('api/login/',  csrf_exempt(views.login)),
    path('api/logout/',  csrf_exempt(views.logout))
]