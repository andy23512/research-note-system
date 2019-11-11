import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IssueType, ResearchNoteType } from 'src/models';
import gql from 'graphql-tag';

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
      query: gql`
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
      `
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
      variables: {
        input: data
      }
    });
  }
}
