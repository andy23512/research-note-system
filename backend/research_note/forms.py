from django.forms import ModelForm
from .models import Issue, ResearchNote


class IssueForm(ModelForm):
    class Meta:
        model = Issue
        fields = ('date', 'link')


class ResearchNoteForm(ModelForm):
    class Meta:
        model = ResearchNote
        fields = ('title', 'issue', 'content')


class ResearchNoteWrittenForm(ModelForm):
    class Meta:
        model = ResearchNote
        fields = ('written_date',)
