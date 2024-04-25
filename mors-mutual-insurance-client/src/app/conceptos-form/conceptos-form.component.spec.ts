import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosFormComponent } from './conceptos-form.component';

describe('ConceptosFormComponent', () => {
  let component: ConceptosFormComponent;
  let fixture: ComponentFixture<ConceptosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConceptosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
