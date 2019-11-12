import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IssueType, ResearchNoteType } from 'src/models';
import gql from 'graphql-tag';

const allDataQuery = gql`
  query AllData {
    issues {
      id
      date
      link
    }
    researchNotes {
      id
      title
      issue {
        id
        date
        link
      }
      content
      isWritten
      writtenDate
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apollo: Apollo) {}

  public watchQueryAllData() {
    return this.apollo.watchQuery<{
      issues: IssueType[];
      researchNotes: ResearchNoteType[];
    }>({
      query: allDataQuery
    });
  }

  public createIssue(data: IssueType) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateIssue($input: IssueMutationInput!) {
          updateIssue(input: $input) {
            issue {
              id
            }
          }
        }
      `,
      refetchQueries: [
        {
          query: allDataQuery
        }
      ],
      variables: {
        input: data
      }
    });
  }

  public createResearchNote(data: ResearchNoteType) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateResearchNote($input: ResearchNoteMutationInput!) {
          updateResearchNote(input: $input) {
            researchNote {
              id
            }
          }
        }
      `,
      refetchQueries: [
        {
          query: allDataQuery
        }
      ],
      variables: {
        input: data
      }
    });
  }
}
