from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['id', 'content', 'created_at', 'updated_at']