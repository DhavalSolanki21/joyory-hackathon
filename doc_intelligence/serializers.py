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
            'analysis_result',
            'overall_risk',
            'document_type',
        ]
        read_only_fields = ['uploaded_at', 'raw_text', 'analysis_result', 'overall_risk', 'document_type']


class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'title',
            'file',
            'uploaded_at',
            'overall_risk',
            'document_type',
        ]
        read_only_fields = ['uploaded_at', 'overall_risk', 'document_type']


class AskQuestionSerializer(serializers.Serializer):
    question = serializers.CharField(required=True, min_length=1, max_length=2000)


class CompareDocumentsSerializer(serializers.Serializer):
    doc1_id = serializers.IntegerField(required=False)
    doc2_id = serializers.IntegerField(required=False)

