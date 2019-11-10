import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNoteTableComponent } from './research-note-table.component';

describe('ResearchNoteTableComponent', () => {
  let component: ResearchNoteTableComponent;
  let fixture: ComponentFixture<ResearchNoteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchNoteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchNoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
