import { Component, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const ANGULAR_SWITCHERY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularSwitcheryComponent),
  multi: true
};

@Component({
  selector: 'angular-switchery',
  styleUrls: ['./angular-switchery.component.scss'],
  template: `<span (keydown)="onKeyDown($event)" tabindex="0" [class]="className" (click)="onClick()" [class.disabled]="isDisabled()">
  <small [ngClass]="{'checked': checked}"></small></span>`,
  providers: [ANGULAR_SWITCHERY_CONTROL_VALUE_ACCESSOR]
})
export class AngularSwitcheryComponent implements ControlValueAccessor {
  private _disabled: boolean;
  public checked = false;

  @Input() public className = 'switchery';

  @Input() set disabled(value: boolean) {
    this._disabled = value !== false;
  };

  @Output() change = new EventEmitter<boolean>();

  constructor() { }

  onKeyDown(event: KeyboardEvent) {
    //"ArrowRight"
    if(event.keyCode === 39) {
      this.checked = true;
    }
    //"ArrowLeft"
    if(event.keyCode === 37) {
      this.checked = false;
    }
    //"space"
    if(event.keyCode === 32) {
      this.checked = !this.checked;
    }
  }

  private onTouchedCallback = (v: any) => { }
  private onChangeCallback = (v: any) => { }

  public isDisabled() {
    return this._disabled;
  }

  public writeValue(obj: any): void {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }


  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public onClick = function () {
    if (this.isDisabled()) {
      return;
    }
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
  }
}
