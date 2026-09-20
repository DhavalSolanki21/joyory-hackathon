from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'title',
            'file',
            'uploaded_at',
            'raw_text',
            'category',
            'document_type',
            'status',
            'summary',
            'metadata_fields',
            'missing_fields',
        ]
        read_only_fields = ['uploaded_at', 'raw_text', 'category', 'document_type', 'summary', 'metadata_fields', 'missing_fields']


class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'title',
            'file',
            'uploaded_at',
            'category',
            'document_type',
            'status',
            'summary',
            'missing_fields',
        ]


class AskQuestionSerializer(serializers.Serializer):
    question = serializers.CharField(required=True, min_length=1, max_length=2000)
