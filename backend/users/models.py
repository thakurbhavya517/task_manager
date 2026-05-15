from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Member', 'Member'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Member')

    def is_admin(self):
        return self.role == 'Admin'

    def __str__(self):
        return f"{self.username} ({self.role})"
