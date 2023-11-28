import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  submitForm: any = {};
  @Output() submitSuccess: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.submitForm.value);
    this.submitSuccess.emit(this.submitForm.value);
  }
}
