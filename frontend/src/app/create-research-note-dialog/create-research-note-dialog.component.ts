import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { IssueType, ResearchNoteType } from 'src/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-research-note-dialog',
  templateUrl: './create-research-note-dialog.component.html',
  styleUrls: ['./create-research-note-dialog.component.sass']
})
export class CreateResearchNoteDialogComponent implements OnInit {
  public form: FormGroup;
  public issues$: Observable<IssueType[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public researchNote: ResearchNoteType,
    private dialogRef: MatDialogRef<CreateResearchNoteDialogComponent>,
    private dataService: DataService
  ) {}

  public ngOnInit() {
    this.issues$ = this.dataService
      .watchQueryAllData()
      .valueChanges.pipe(map(data => data.data.issues));
    this.form = new FormGroup({
      title: new FormControl(this.researchNote ? this.researchNote.title : ''),
      issue: new FormControl(
        this.researchNote ? this.researchNote.issue.id : ''
      ),
      content: new FormControl(
        this.researchNote ? this.researchNote.content : ''
      )
    });
  }

  public onSubmit() {
    const additionalData = this.researchNote
      ? { id: this.researchNote.id }
      : {};
    this.dataService
      .createResearchNote({
        ...this.form.value,
        ...additionalData
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
