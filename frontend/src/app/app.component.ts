import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateIssueDialogComponent } from './create-issue-dialog/create-issue-dialog.component';
import { CreateResearchNoteDialogComponent } from './create-research-note-dialog/create-research-note-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}
  public openCreateIssueDialog() {
    this.dialog.open(CreateIssueDialogComponent);
  }

  public openCreateResearchNoteDialog() {
    this.dialog.open(CreateResearchNoteDialogComponent);
  }
}
