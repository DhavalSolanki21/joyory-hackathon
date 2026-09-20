from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Document
from .serializers import (
    AskQuestionSerializer,
    DocumentListSerializer,
    DocumentSerializer,
)
from .services import (
    ask_company_knowledge_base,
    classify_and_enrich_document,
    extract_text_from_pdf,
)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def document_collection_view(request: Request) -> Response:
    if request.method == 'GET':
        status_filter = request.query_params.get('status')
        if status_filter:
            documents = Document.objects.filter(status=status_filter)
        else:
            documents = Document.objects.all()
        serializer = DocumentListSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded under key "file"'}, status=status.HTTP_400_BAD_REQUEST)

    file_obj = request.FILES['file']
    title = request.data.get('title', file_obj.name)

    if not file_obj.name.lower().endswith('.pdf'):
        return Response({'error': 'Only PDF files are supported currently.'}, status=status.HTTP_400_BAD_REQUEST)

    # 1. Save document first to get local file path
    doc = Document.objects.create(
        title=title,
        file=file_obj,
        status='PENDING_VERIFICATION'
    )

    # 2. Extract text from PDF
    extracted_text = extract_text_from_pdf(doc.file.path)
    doc.raw_text = extracted_text

    # 3. Perform Semantic Classification & Missing Value Analysis
    enrichment = classify_and_enrich_document(extracted_text)

    if isinstance(enrichment, dict):
        doc.category = enrichment.get('category', 'General')
        doc.document_type = enrichment.get('document_type', 'Unclassified')
        doc.summary = enrichment.get('summary', 'Document uploaded into system.')
        doc.metadata_fields = enrichment.get('metadata_fields', {})
        doc.missing_fields = enrichment.get('missing_fields', [])

    doc.save()

    serializer = DocumentSerializer(doc, context={'request': request})
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE'])
def document_detail_view(request: Request, pk: int) -> Response:
    doc = get_object_or_404(Document, pk=pk)

    if request.method == 'GET':
        serializer = DocumentSerializer(doc, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    doc.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def document_confirm_view(request: Request, pk: int) -> Response:
    """Confirm & index document into the company data directory."""
    doc = get_object_or_404(Document, pk=pk)
    doc.status = 'INDEXED'
    doc.save()
    serializer = DocumentSerializer(doc, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([JSONParser])
def company_chat_view(request: Request) -> Response:
    """General Purpose Personalized AI Company Chatbot endpoint."""
    serializer = AskQuestionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    question = serializer.validated_data['question']

    # Fetch all documents (prefer INDEXED, fallback to all)
    docs = Document.objects.filter(status='INDEXED')
    if not docs.exists():
        docs = Document.objects.all()

    indexed_docs_data = [
        {
            "id": d.id,
            "title": d.title,
            "category": d.category,
            "text": d.raw_text
        }
        for d in docs if d.raw_text
    ]

    response_data = ask_company_knowledge_base(question, indexed_docs_data)
    return Response(response_data, status=status.HTTP_200_OK)
