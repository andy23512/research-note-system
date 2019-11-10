import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IssueType } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private apollo: Apollo) {
  }

  public ngOnInit() {
    this.apollo.query<IssueType[]>({
      query: gql`
      query ISSUES {
        issues {
          id
          date
          link
        }
      }
      `
    }).subscribe(console.log);
  }
}
