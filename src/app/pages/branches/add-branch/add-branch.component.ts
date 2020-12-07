import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationForms } from 'src/app/utils/validations-forms';

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent extends ValidationForms implements OnInit {

  index = 0;
  branchForm: FormGroup;

  // ======= STEP MAP ======== 
  // google maps zoom level
  zoom = 16;
  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;
  currentMarker: Marker = {
    lat: 18.462859841665864,
    lng: -97.39279966871719,
    draggable: false
  };



  constructor(private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.branchForm = this.fb.group(
      {
        name: [null, Validators.required],
        manager: [null, Validators.required],
        username: [null, Validators.required],
        password: [null, Validators.required]
      }
    );
  }

  setMarkerMap($event) {
    this.currentMarker.lat = $event.coords.lat;
    this.currentMarker.lng = $event.coords.lng;
    this.currentMarker.draggable = true;
  }

  onIndexChange(event: number): void {
    return;
    this.index = event;
  }

  getStatusStep(index): string {

    if (this.index == index) {
      return 'process';
    }

    if (index < this.index) {
      return 'finish';
    }
    return 'wait';
  }

  // Funcion recursiva para validar los pasos anteriores
  validPreviousSteps(index): boolean {
    if ((index - 1) === 0) {
      return true;
    }

    const valid = this.isValidStep(index - 1);
    if (!valid) {
      return false;
    }

    return this.validPreviousSteps(index - 1);

  }

  // Saber si es valido el paso
  isValidStep(index): boolean {

    if (index == 0) {
      return this.validStepOne();
    }
    return true;

  }

  validStepOne() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return false;
    }

    return true;

  }

  nextStep() {

    if (this.isValidStep(this.index)) {
      this.index = this.index + 1;
    }

  }

  previousStep() {
    this.index = this.index - 1;
  }

  getValue(field) {
    return this.branchForm.get(field).value;
  }

  saveData() {

  }

}
