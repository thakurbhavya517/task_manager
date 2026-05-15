from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count, Q
from django.utils import timezone
from .models import Project, Task

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        if user.is_admin():
            projects = Project.objects.all()
            tasks = Task.objects.all()
        else:
            projects = Project.objects.filter(Q(members=user) | Q(owner=user)).distinct()
            tasks = Task.objects.filter(Q(project__members=user) | Q(project__owner=user)).distinct()

        now = timezone.now().date()
        
        data = {
            'total_projects': projects.count(),
            'total_tasks': tasks.count(),
            'tasks_by_status': {
                'Todo': tasks.filter(status='Todo').count(),
                'In Progress': tasks.filter(status='In Progress').count(),
                'Review': tasks.filter(status='Review').count(),
                'Done': tasks.filter(status='Done').count(),
            },
            'overdue_tasks': tasks.filter(due_date__lt=now).exclude(status='Done').count(),
        }
        
        return Response(data)
