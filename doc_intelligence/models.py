from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


class Document(models.Model):
    title = models.CharField(max_length=500, blank=True)
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    raw_text = models.TextField(blank=True)
    analysis_result = models.JSONField(null=True, blank=True)
    overall_risk = models.CharField(max_length=20, blank=True, default='LOW')
    document_type = models.CharField(max_length=100, blank=True, default='Unknown')

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self) -> str:
        return self.title or f"Document {self.id}"


@receiver(post_delete, sender=Document)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.file and instance.file.storage.exists(instance.file.name):
        instance.file.delete(save=False)

