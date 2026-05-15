from rest_framework import viewsets, permissions, exceptions
from django.db.models import Q
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from .permissions import IsAdminUserOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin():
            return Project.objects.all()
        return Project.objects.filter(Q(members=user) | Q(owner=user)).distinct()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin():
            return Task.objects.all()
        return Task.objects.filter(Q(project__members=user) | Q(project__owner=user)).distinct()

    def perform_destroy(self, instance):
        if not self.request.user.is_admin():
            raise exceptions.PermissionDenied("You are not authorised to perform this action")
        instance.delete()
