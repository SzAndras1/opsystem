import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInstalledComponent } from './application-installed.component';

describe('ApplicationInstalledComponent', () => {
  let component: ApplicationInstalledComponent;
  let fixture: ComponentFixture<ApplicationInstalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationInstalledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationInstalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
