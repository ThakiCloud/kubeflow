import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule as KfFormModule, SnackBarService } from 'kubeflow';
import { FormServiceTypeComponent } from './form-service-type.component';
import { CommonModule } from '@angular/common';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getServiceTypes: () => of(['ClusterIP', 'LoadBalancer']),
};

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('FormServiceTypeComponent', () => {
  let component: FormServiceTypeComponent;
  let fixture: ComponentFixture<FormServiceTypeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormServiceTypeComponent],
        imports: [
          CommonModule,
          KfFormModule,
          NoopAnimationsModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
        ],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: SnackBarService, useValue: SnackBarServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormServiceTypeComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      serviceType: new FormGroup({
        type: new FormControl(),
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have service type options', () => {
    expect(component.serviceTypeOptions).toBeDefined();
    expect(component.serviceTypeOptions.length).toBeGreaterThan(0);
  });


}); 