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

@NgModule({
  declarations: [
    AppComponent,
    ResearchNoteTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    NgxDatatableModule,
    MdRenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
