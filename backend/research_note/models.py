from django.db import models

# Create your models here.


class Issue(models.Model):
    date = models.DateField()
    link = models.CharField(max_length=500)

    def __str__(self):
        return self.link


class ResearchNote(models.Model):
    title = models.CharField(max_length=50)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
    is_written = models.BooleanField()
    written_date = models.DateField()

    def __str__(self):
        return self.title
