import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResearchNoteDialogComponent } from './create-research-note-dialog.component';

describe('CreateResearchNoteDialogComponent', () => {
  let component: CreateResearchNoteDialogComponent;
  let fixture: ComponentFixture<CreateResearchNoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResearchNoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResearchNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
