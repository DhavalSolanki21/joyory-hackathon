from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Document
from .serializers import (
    AskQuestionSerializer,
    CompareDocumentsSerializer,
    DocumentListSerializer,
    DocumentSerializer,
)
from .services import (
    analyze_document_with_groq,
    ask_document_with_groq,
    compare_documents_with_groq,
    extract_text_from_pdf,
)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def document_collection_view(request: Request) -> Response:
    if request.method == 'GET':
        documents = Document.objects.all()
        serializer = DocumentListSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded under key "file"'}, status=status.HTTP_400_BAD_REQUEST)

    file_obj = request.FILES['file']
    title = request.data.get('title', file_obj.name)

    if not file_obj.name.lower().endswith('.pdf'):
        return Response({'error': 'Only PDF files are supported.'}, status=status.HTTP_400_BAD_REQUEST)

    doc = Document.objects.create(title=title, file=file_obj)
    extracted_text = extract_text_from_pdf(doc.file.path)
    doc.raw_text = extracted_text

    analysis = analyze_document_with_groq(extracted_text)
    doc.analysis_result = analysis

    if isinstance(analysis, dict):
        doc.overall_risk = analysis.get('overall_risk_level', 'LOW')
        doc.document_type = analysis.get('document_type', 'Unknown Document')

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
@parser_classes([JSONParser])
def document_ask_view(request: Request, pk: int) -> Response:
    doc = get_object_or_404(Document, pk=pk)

    serializer = AskQuestionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    question = serializer.validated_data['question']
    if not doc.raw_text:
        return Response(
            {'error': 'Document contains no extracted text to search.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    response_data = ask_document_with_groq(doc.raw_text, question)
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def document_compare_view(request: Request) -> Response:
    doc1_text = ""
    doc2_text = ""

    if 'file1' in request.FILES and 'file2' in request.FILES:
        file1 = request.FILES['file1']
        file2 = request.FILES['file2']

        doc1 = Document.objects.create(title=file1.name, file=file1)
        doc2 = Document.objects.create(title=file2.name, file=file2)

        doc1_text = extract_text_from_pdf(doc1.file.path)
        doc2_text = extract_text_from_pdf(doc2.file.path)

        doc1.raw_text = doc1_text
        doc2.raw_text = doc2_text
        doc1.save()
        doc2.save()
    else:
        doc1_id = request.data.get('doc1_id')
        doc2_id = request.data.get('doc2_id')

        if not doc1_id or not doc2_id:
            return Response(
                {'error': 'Provide doc1_id & doc2_id in JSON body OR file1 & file2 in multipart form.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        doc1 = get_object_or_404(Document, pk=doc1_id)
        doc2 = get_object_or_404(Document, pk=doc2_id)

        doc1_text = doc1.raw_text
        doc2_text = doc2.raw_text

    comparison_result = compare_documents_with_groq(doc1_text, doc2_text)
    return Response(comparison_result, status=status.HTTP_200_OK)

