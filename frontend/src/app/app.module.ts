import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ResearchNoteTableComponent } from './research-note-table/research-note-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MdRenderModule } from '@nvxme/ngx-md-render';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatDatepicker,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { CreateIssueDialogComponent } from './create-issue-dialog/create-issue-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateResearchNoteDialogComponent } from './create-research-note-dialog/create-research-note-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ResearchNoteTableComponent,
    CreateIssueDialogComponent,
    CreateResearchNoteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    NgxDatatableModule,
    MdRenderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  entryComponents: [
    CreateIssueDialogComponent,
    CreateResearchNoteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
