import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IssueType, ResearchNoteType } from 'src/models';
import { TableColumn } from '@swimlane/ngx-datatable';
import { MdRenderService } from '@nvxme/ngx-md-render';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { UpdateResearchNoteWrittenDialogComponent } from '../update-research-note-written-dialog/update-research-note-written-dialog.component';

@Component({
  selector: 'app-research-note-table',
  templateUrl: './research-note-table.component.html',
  styleUrls: ['./research-note-table.component.sass']
})
export class ResearchNoteTableComponent implements OnInit {
  @ViewChild('myTable', { static: true }) table: any;
  @ViewChild('actionTemplate', { static: true })
  public actionTemplate: TemplateRef<any>;
  @ViewChild('issueLinkTemplate', { static: true })
  public issueLinkTemplate: TemplateRef<any>;
  @ViewChild('expandTemplate', { static: true })
  public expandTemplate: TemplateRef<any>;
  public data$: Observable<{
    issues: IssueType[];
    researchNotes: ResearchNoteType[];
  }>;
  public columns: TableColumn[];
  public expanded: any = {};

  constructor(
    private data: DataService,
    private mdRenderService: MdRenderService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.data$ = this.data
      .watchQueryAllData()
      .valueChanges.pipe(map(d => d.data));
    this.columns = [
      { width: 50, cellTemplate: this.expandTemplate },
      { width: 50, name: 'Action', cellTemplate: this.actionTemplate },
      { width: 300, prop: 'title', name: 'Title' },
      {
        width: 300,
        prop: 'issue.link',
        name: 'Issue Link',
        cellTemplate: this.issueLinkTemplate
      },
      { prop: 'issue.date', name: 'Issue Date' },
      { prop: 'writtenDate', name: 'Written Date' }
    ];
  }

  public parseMd(markdown: string) {
    return markdown.match(/\[(.*)\]\((.*)\)/);
  }

  public toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  public openUpdateResearchNoteWrittenDialog(id: string) {
    this.dialog.open(UpdateResearchNoteWrittenDialogComponent, { data: id });
  }
}
