import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConfigAccountService } from 'src/app/services/config-account.service';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { StationModel } from 'src/app/models/station.model';
import { UpdateInfoStationModel } from 'src/app/models/update_info.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/models/merchant.model';
import { Coordinate } from 'src/app/models/coordinate';


// just an interface for type safety.
export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-wizard-profile',
  templateUrl: './wizard-profile.component.html',
  styleUrls: ['./wizard-profile.component.scss']
})
export class WizardProfileComponent implements OnInit, AfterContentInit {

  merchant: Merchant;
  // Forms
  addressForm: FormGroup;
  ratesServicesForm: FormGroup;
  generalForm: FormGroup;
  // Data of services
  schedules: Array<ScheduleModel>;
  scheduleSelected = [];
  // Loaders
  loadingUpdateConfig: boolean;

  // Object to send update info
  merchantConfig: UpdateInfoStationModel = new UpdateInfoStationModel();
  steps = [
    {
      id: 1,
      text: 'General',
      icon: 'fas fa-camera',
      component: 'div-general',
      form: null
    },
    {
      id: 2,
      text: 'Dirección',
      icon: 'fas fa-map',
      component: 'div-map',
      form: null
    },
    {
      id: 3,
      text: 'Horario',
      icon: 'far fa-clock',
      component: 'div-config',
      form: null

    },
  ];

  // ======= WIZARD ELEMENTS ========
  iconsWizardLength = 0;
  currentIndex = 0;
  listOfElementLi: NodeListOf<HTMLElement>;
  previousLi: HTMLElement;
  previousDiv: HTMLElement;
  hasNext: boolean;
  hasPrevious: boolean;

  // ======= END WIZARD ELEMENTS ========

  // ======= STEP ONE ========
  binaryString;
  imageTemp;
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  // STEP 3
  // google maps zoom level
  zoom = 14;
  currentMarker: Marker = {
    lat: 18.462859841665864,
    lng: -97.39279966871719,
    draggable: false
  };

  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  // Step Config
  assignDeliveryManually = true;
  allowCancellations = true;

  constructor(private configService: ConfigAccountService, private router: Router,
              private _formBuilder: FormBuilder, private alertService: AlertsService) { }

  ngOnInit(): void {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
    this.getSchedules();
    this.buildRateServicefForm();
    this.buildAddressForm();
    this.buildGeneralForm();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data: Position) => {
          let cord: Coordinate = Coordinate.fromGeoposition(data);
          this.currentMarker.lat = cord.latitude;
          this.currentMarker.lng = cord.longitude;
          this.currentMarker.label = this.merchant.merchant_name;
          this.currentMarker.draggable = false;
          console.log(cord);
        }
      );
    }
  }


  getSchedules() {
    this.configService.getSchedules()
      .subscribe((data: any) => this.schedules = data.data);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  ngAfterContentInit() {
    this.initWizard();
  }

  // ======= FUNCTIONS FOR STEP ONE ========

  onFileSelected(evt: any) {
    const file = evt.target.files[0];

    if (!file) {
      this.imageTemp = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {

      this.myInputVariable.nativeElement.value = '';
      this.showMessageError('El archivo seleccionado no es una imagen');
      this.binaryString = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  handleReaderLoaded(e) {
    this.binaryString = 'data:image/png;base64,' + btoa(e.target.result);
  }

  // Builds forms
  buildRateServicefForm() {
    this.ratesServicesForm = this._formBuilder.group({
      services: this._formBuilder.array([], Validators.required),
    });
  }

  buildAddressForm() {
    this.addressForm = this._formBuilder.group({
      full_address: [null, Validators.required]
    });

  }

  buildGeneralForm() {
    this.generalForm = this._formBuilder.group({
      merchant_name: [this.merchant.merchant_name, Validators.required],
      description: [null],
      from_preparation_time: [null, Validators.required],
      to_preparation_time: [null, Validators.required]
    });
  }


  deleteRateService(serviceId: any) {
    const rates = this.ratesServicesForm.get('services') as FormArray;
    const index = rates.controls.findIndex((control) => {
      return control.get('service_id').value === serviceId;
    });
    rates.removeAt(index);
  }

  setMarkerMap($event) {
    this.currentMarker.lat = $event.coords.lat;
    this.currentMarker.lng = $event.coords.lng;
    this.currentMarker.draggable = true;
  }

  addSchedule(schedule) {
    if (schedule.checked) {
      const index = this.scheduleSelected.findIndex((schedu) =>
      schedu.schedule_id === schedule.schedule_id);

      // If exist schedule, then update it
      delete schedule.checked;
      if (index >= 0) {
        this.scheduleSelected[index] = {...schedule};
        return;
      }
      // If not exist schedule, then add in array
      this.scheduleSelected.push({
        ...schedule
      });
    } else {
      this.deleteSchedule(schedule.schedule_id);
    }
  }

  deleteSchedule(scheduleId) {
    const index = this.scheduleSelected.findIndex((schedule) => schedule.schedule_id === scheduleId);
    if (index >= 0) {
      this.scheduleSelected.splice(index, 1);
    }
  }

  saveConfig() {
    if (!(this.validateStepByIndex(this.currentIndex))) {
      return;
    }
    this.loadingUpdateConfig = true;
    this.configService.updateInfo(this.merchantConfig)
      .subscribe((data: any) => {
        localStorage.setItem('information_is_complete', 'true');
        this.loadingUpdateConfig = false;
        this.router.navigate(['/dashboard']);
      }, (err) => {
        this.loadingUpdateConfig = false;
        this.alertService.openErrorDialog(null, 'Oppss..', JSON.stringify(err.errors.message));
      });
  }

  // ======= END FUNCTIONS FOR STEP ONE ========

  // WIZARD EVENTS

  onNext(element: HTMLElement = null) {

    if (element) {
      const index = element.getAttribute('data-index');
      if (!(this.validPreviousSteps(index))) {
        return;
      }
      this.selectStep(element);
    } else {
      if (!(this.validateStepByIndex(this.currentIndex))) {
        return;
      }
      this.currentIndex += 1;
      this.showAndHideButtons();
      this.selectStep(this.listOfElementLi[this.currentIndex - 1]);

    }

  }

  // Verify that the previous steps are valid
  // If the return value is False it is because some previous step is not valid
  // Recursive function
  validPreviousSteps(index): boolean {
    if ((index - 1) === 0) {
      return true;
    }

    const valid = this.validateStepByIndex(index - 1);
    if (!valid) {
      return false;
    }

    return this.validPreviousSteps(index - 1);

  }

  onPrevious() {
    this.currentIndex -= 1;
    this.showAndHideButtons();
    this.selectStep(this.listOfElementLi[this.currentIndex - 1]);

  }

  validateStepByIndex(index): boolean {
    switch (index) {
      case 1:
        return this.validateStepImage();
      case 2:
        return this.validateStepAddress();
      case 3:
        return this.validateStepConfig();
      default:
        return false;
    }
  }

  validateStepImage(): boolean {
    if (this.generalForm.invalid) {
      this.generalForm.markAllAsTouched();
      return false;
    }
    if (!this.binaryString) {
      this.showMessageInfo('Por favor elige una imagen');
      return false;
    }
    const general = this.generalForm.value;
    general.approximate_preparation_time = general.from_preparation_time + '-' + general.to_preparation_time;
    // Save in object to update info
    this.merchantConfig.general = {picture: this.binaryString, ...general};
    return true;
  }

  validateStepAddress(): boolean {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return false;
    }
    this.merchantConfig.address = {...this.addressForm.value,
       point: {lat: this.currentMarker.lat, lng: this.currentMarker.lng}};
    return true;
  }


  validateStepConfig(): boolean {
    if (this.scheduleSelected.length === 0) {
      this.showMessageInfo('Selecciona al menos un día');
      return false;
    }

    this.merchantConfig.schedules = this.scheduleSelected;
    return true;
  }

  showAndHideButtons() {
    this.hasNext = true;
    this.hasPrevious = false;
    if (this.currentIndex === this.listOfElementLi.length) {
      this.hasNext = false;
    }
    if (this.currentIndex > 1) {
      this.hasPrevious = true;
    }
  }

  selectStep(element: HTMLElement) {
    // Index of selected step
    const index = Number(element.getAttribute('data-index'));
    if (this.previousLi) {
      this.previousLi.classList.remove('active');
    }
    if (this.previousDiv) {
      // For show or hidden content
      this.previousDiv.classList.toggle('content-tab');
    }

    // Show component
    const component = String(element.getAttribute('data-component'));
    this.previousDiv = document.getElementById(component);
    this.previousDiv.classList.toggle('content-tab');

    // The selected step we add the class
    element.classList.add('active');
    element.querySelector('.icon-wizard').classList.add('checked');

    // We put the index of the selected step as the current index
    this.currentIndex = index;
    this.updateProgress(this.currentIndex);
    this.previousLi = element;
    this.showAndHideButtons();
  }


  initWizard() {
    setTimeout(() => {
      // Get all elements
      this.listOfElementLi = document.querySelectorAll('.li-wizard');
      // Number of elements li
      this.iconsWizardLength = this.listOfElementLi.length;
      // Update progress bar
      const progress = document.getElementById('progress-wizard');
      progress.style.width = `${(100 / this.iconsWizardLength) - 5}%`;

      // Get Ul for get the first element
      const ulWizard = document.querySelector('.ul-wizard');
      // Add class active and checked the first element li
      const firstStep = ulWizard.querySelector('li');


      // Get index
      this.currentIndex = Number(firstStep.getAttribute('data-index'));
      // Show component of first li
      const component = String(firstStep.getAttribute('data-component'));

      // Hide previous div
      this.previousDiv = document.getElementById(component);
      this.previousDiv.classList.toggle('content-tab');

      // Assign previous li
      this.previousLi = firstStep;
      this.previousLi.classList.add('active');
      this.previousLi.querySelector('.icon-wizard').classList.add('checked');
      this.showAndHideButtons();
    }, 200);

  }

  updateProgress(index) {
    const progress = document.getElementById('progress-wizard');
    let moveDistance = 100 / this.iconsWizardLength;
    moveDistance = (moveDistance * (index) - 10);
    progress.style.width = `${moveDistance}%`;
  }

  showMessageError(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#e74a3b',

    });
  }

  showMessageInfo(message) {
    Swal.fire({
      type: 'info',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#4e73df',

    });
  }

  isFieldInvalid(form: FormGroup, field: string) {
    /*     console.log(form.get(field).valid);
        console.log(form.get(field).value);
        console.log(form.get(field).touched); */
    return (
      (!form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldValid(form: FormGroup, field: string) {
    return (
      (form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldHasError(form: FormGroup, field: string, error: string) {
    return (
      (form.get(field).hasError(error))
    );
  }

}
