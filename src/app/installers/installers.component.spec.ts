import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallersComponent } from './installers.component';

describe('InstallersComponent', () => {
  let component: InstallersComponent;
  let fixture: ComponentFixture<InstallersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
