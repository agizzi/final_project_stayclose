# Generated by Django 2.2.7 on 2019-12-04 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stay_close', '0006_auto_20191203_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='stay_close/static/user.svg', upload_to='images'),
        ),
    ]
