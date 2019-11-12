from django.db import models

# Create your models here.


class Issue(models.Model):
    date = models.DateField()
    link = models.CharField(max_length=500)

    def __str__(self):
        return self.link


class ResearchNote(models.Model):
    title = models.CharField(max_length=50)
    issue = models.ForeignKey(Issue, related_name='research_notes', on_delete=models.CASCADE)
    content = models.CharField(max_length=1000, blank=True, null=True)
    is_written = models.BooleanField(blank=True, default=False)
    written_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title
