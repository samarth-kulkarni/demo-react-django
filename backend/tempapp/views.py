from django.shortcuts import render
from rest_framework import viewsets
from tempapp.serializers import GroupSerializer
from .models import Group


class GroupsViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
