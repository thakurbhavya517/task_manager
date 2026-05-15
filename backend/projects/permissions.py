from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_admin()

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_admin()
        
    def has_object_permission(self, request, view, obj):
        # Admin can do anything
        if request.user.is_admin():
            return True
        # Member cannot DELETE
        if request.method == 'DELETE':
            return False
        return True
