from rest_framework import serializers
from .models import Project, Task
from users.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    owner_details = UserSerializer(source='owner', read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('owner', 'created_at')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
