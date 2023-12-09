import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() submitForm = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onSubmit(data: { fullName: string; address: string; creditCard: string }) {
    this.submitForm.emit(data);
  }
}
