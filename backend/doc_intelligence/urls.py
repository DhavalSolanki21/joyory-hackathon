from django.urls import path
from . import views

urlpatterns = [
    path('', views.document_collection_view, name='document-collection'),
    path('upload/', views.document_collection_view, name='document-upload'),
    path('<int:pk>/', views.document_detail_view, name='document-detail'),
    path('<int:pk>/confirm/', views.document_confirm_view, name='document-confirm'),
    path('chat/', views.company_chat_view, name='company-chat'),
]
