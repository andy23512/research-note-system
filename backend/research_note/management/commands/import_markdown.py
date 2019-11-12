from django.core.management.base import BaseCommand
import re
from research_note.models import Issue, ResearchNote


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('./markdown.md') as f:
            content = f.read()
        for line in content.split('\n'):
            if line.startswith('###'):
                match = re.match(r'### ([0-9]{8}) (.*)', line)
                date, link = match.groups()
                date = date[0:4] + '-' + date[4:6] + '-' + date[6:]
                issue = Issue.objects.create(
                    date=date,
                    link=link
                )
            elif line.startswith('-'):
                title = line.replace('- ', '')
            elif line.startswith('  -'):
                content = line.replace('  - ', '')
                ResearchNote.objects.create(
                    title=title,
                    issue=issue,
                    content=content
                )
