import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() classeCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() control;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  constructor() {}

  // Responsável por setar o valor (ex: nomeDoCampo.value)
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  // Responsável por disparar um evento toda vez que o valor muda
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  // Responsável por disparar um evento toda vez que o campo tiver foco
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  // Quando o campo está desabilitado
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
