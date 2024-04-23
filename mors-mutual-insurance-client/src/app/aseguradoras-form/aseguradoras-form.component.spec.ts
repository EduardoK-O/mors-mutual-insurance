import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradorasFormComponent } from './aseguradoras-form.component';

describe('AseguradorasFormComponent', () => {
  let component: AseguradorasFormComponent;
  let fixture: ComponentFixture<AseguradorasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AseguradorasFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AseguradorasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
