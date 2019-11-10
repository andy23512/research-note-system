import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IssueType, ResearchNoteType } from 'src/models';

@Component({
  selector: 'app-research-note-table',
  templateUrl: './research-note-table.component.html',
  styleUrls: ['./research-note-table.component.sass']
})
export class ResearchNoteTableComponent implements OnInit {
  public data$: Observable<{
    issues: IssueType[];
    researchNotes: ResearchNoteType[];
  }>;

  constructor(public data: DataService) {}

  public ngOnInit() {
    this.data$ = this.data
      .watchQueryAllData()
      .valueChanges.pipe(map(d => d.data));
  }
}
