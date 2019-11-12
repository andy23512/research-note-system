import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-research-note-written-dialog',
  templateUrl: './update-research-note-written-dialog.component.html',
  styleUrls: ['./update-research-note-written-dialog.component.sass']
})
export class UpdateResearchNoteWrittenDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: string,
    private dialogRef: MatDialogRef<UpdateResearchNoteWrittenDialogComponent>,
    private dataService: DataService
  ) {}

  public ngOnInit() {
    this.form = new FormGroup({
      writtenDate: new FormControl('')
    });
  }

  public onSubmit() {
    const data = this.form.value;
    const convertedData: any = {};
    Object.keys(data).forEach(field => {
      const value = data[field];
      if (typeof value === 'string') {
        convertedData[field] = value;
      } else if (value instanceof Date) {
        convertedData[field] = `${value.getFullYear()}-${(
          '0' +
          (value.getMonth() + 1)
        ).substr(-2)}-${('0' + value.getDate()).substr(-2)}`;
      }
    });
    convertedData.id = this.id;
    this.dataService.updateResearchNoteWritten(convertedData).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
