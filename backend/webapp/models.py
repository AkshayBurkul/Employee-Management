from django.db import models

# Create your models here.
class employees(models.Model):
    firstname=models.CharField(max_length=10)
    lastname=models.CharField(max_length=10)
    emp_id=models.IntegerField()
    email=models.TextField(max_length=50)
    password=models.TextField(max_length=20)
    address=models.CharField(max_length=100)
    dob=models.TextField(max_length=20)
    mobile=models.IntegerField()
    city=models.CharField(max_length=20)
    company=models.CharField(max_length=50)


    def __str__(self):
        return self.firstname