# Generated by Django 2.2.7 on 2019-11-29 00:12

from django.db import migrations
import django.utils.timezone
import encrypted_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('stay_close', '0002_auto_20191129_0007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='circle',
            name='created_at',
            field=encrypted_fields.fields.EncryptedDateField(default=django.utils.timezone.now),
        ),
    ]
