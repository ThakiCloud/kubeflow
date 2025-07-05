import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { Config } from 'src/app/types/config';

export interface ServiceTypeOption {
  value: string;
  label: string;
  description: string;
}



@Component({
  selector: 'app-form-service-type',
  templateUrl: './form-service-type.component.html',
  styleUrls: ['./form-service-type.component.scss'],
})
export class FormServiceTypeComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() config: Config;

  private serviceTypeCtrl: FormGroup;
  public serviceTypeOptions: ServiceTypeOption[] = [];
  subscriptions = new Subscription();



  constructor(public backend: JWABackendService) {}

  ngOnInit() {
    this.serviceTypeCtrl = this.parentForm.get('serviceType') as FormGroup;
    this.loadServiceTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue) {
      this.loadServiceTypes();
    }
  }

  private loadServiceTypes() {
    // Get available service types from config
    if (this.config && this.config.serviceConfig && this.config.serviceConfig.options) {
      this.serviceTypeOptions = this.config.serviceConfig.options.map(option => ({
        value: option.value,
        label: option.displayName || option.value,
        description: option.description || '',
      }));
    }
  }

  // Service type handling
  public serviceTypeTooltip(serviceType: ServiceTypeOption) {
    return serviceType.description || '';
  }

  // Custom Validation
  public getServiceTypeError() {
    const typeCtrl = this.parentForm.get('serviceType').get('type');
    if (typeCtrl.hasError('required')) {
      return 'You must specify a service type';
    }
  }
} 