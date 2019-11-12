import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResearchNoteWrittenDialogComponent } from './update-research-note-written-dialog.component';

describe('UpdateResearchNoteWrittenDialogComponent', () => {
  let component: UpdateResearchNoteWrittenDialogComponent;
  let fixture: ComponentFixture<UpdateResearchNoteWrittenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResearchNoteWrittenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResearchNoteWrittenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
