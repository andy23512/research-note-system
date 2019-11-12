import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { IssueType } from 'src/models';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.sass']
})
export class CreateIssueDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateIssueDialogComponent>,
    private dataService: DataService
  ) {}

  public ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(''),
      link: new FormControl('')
    });
  }

  public onSubmit() {
    const data = this.form.value;
    const convertedData = {};
    Object.keys(data).forEach(field => {
      const value = data[field];
      if (typeof value === 'string') {
        convertedData[field] = value;
      } else if (value instanceof Date) {
        convertedData[field] = `${value.getFullYear()}-${(
          '0' +
          (value.getMonth() + 1)
        ).substr(-2)}-${('0' + (value.getDate() + 1)).substr(-2)}`;
      }
    });
    this.dataService.createIssue(convertedData as IssueType).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
