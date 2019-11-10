import graphene

from graphene.types import Field
from graphene_django.types import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation


from .forms import IssueForm, ResearchNoteForm
from .models import Issue, ResearchNote


class IssueType(DjangoObjectType):
    class Meta:
        model = Issue


class ResearchNoteType(DjangoObjectType):
    class Meta:
        model = ResearchNote


class Query:
    issues = graphene.List(IssueType)
    research_notes = graphene.List(ResearchNoteType)

    def resolve_issues(self, info, **kwargs):
        return Issue.objects.prefetch_related('research_notes').all()

    def resolve_research_notes(self, info, **kwargs):
        return ResearchNote.objects.select_related('issue').all()


class IssueMutation(DjangoModelFormMutation):
    issue = Field(IssueType)

    class Meta:
        form_class = IssueForm


class ResearchNoteMutation(DjangoModelFormMutation):
    research_note = Field(ResearchNoteType)

    class Meta:
        form_class = ResearchNoteForm


class Mutations:
    update_issue = IssueMutation.Field()
    update_research_note = ResearchNoteMutation.Field()