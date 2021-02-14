# Generated by Django 3.0.6 on 2021-02-13 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0004_auto_20210213_0345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='address',
            field=models.CharField(default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='employees',
            name='city',
            field=models.CharField(default='-', max_length=20),
        ),
        migrations.AlterField(
            model_name='employees',
            name='company',
            field=models.CharField(default='-', max_length=50),
        ),
        migrations.AlterField(
            model_name='employees',
            name='dob',
            field=models.CharField(default='-', max_length=20),
        ),
        migrations.AlterField(
            model_name='employees',
            name='email',
            field=models.CharField(default='-', max_length=50),
        ),
        migrations.AlterField(
            model_name='employees',
            name='emp_id',
            field=models.IntegerField(default='-'),
        ),
        migrations.AlterField(
            model_name='employees',
            name='firstname',
            field=models.CharField(default='-', max_length=10),
        ),
        migrations.AlterField(
            model_name='employees',
            name='lastname',
            field=models.CharField(default='-', max_length=10),
        ),
        migrations.AlterField(
            model_name='employees',
            name='mobile',
            field=models.IntegerField(default='-'),
        ),
        migrations.AlterField(
            model_name='employees',
            name='password',
            field=models.CharField(default='-', max_length=20),
        ),
    ]