import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IssueType } from 'src/models';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo) { }

  public watchQueryAllData() {
    return this.apollo.watchQuery<IssueType[]>({
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
}
