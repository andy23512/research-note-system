import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { IssueType } from 'src/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-research-note-dialog',
  templateUrl: './create-research-note-dialog.component.html',
  styleUrls: ['./create-research-note-dialog.component.sass']
})
export class CreateResearchNoteDialogComponent implements OnInit {
  public form: FormGroup;
  public issues$: Observable<IssueType[]>;

  constructor(
    private dialogRef: MatDialogRef<CreateResearchNoteDialogComponent>,
    private dataService: DataService
  ) {}

  public ngOnInit() {
    this.issues$ = this.dataService
      .watchQueryAllData()
      .valueChanges.pipe(map(data => data.data.issues));
    this.form = new FormGroup({
      title: new FormControl(''),
      issue: new FormControl(''),
      content: new FormControl('')
    });
  }

  public onSubmit() {
    this.dataService.createResearchNote(this.form.value).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
