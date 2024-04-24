import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradosFormComponent } from './asegurados-form.component';

describe('AseguradosFormComponent', () => {
  let component: AseguradosFormComponent;
  let fixture: ComponentFixture<AseguradosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AseguradosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AseguradosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
