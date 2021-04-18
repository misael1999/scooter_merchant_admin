import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionsMerchantsService } from '../../../../services/promotions-merchants.service';
import { ValidationForms } from '../../../../utils/validations-forms';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.scss']
})
export class AddPromotionsComponent extends ValidationForms implements OnInit {
  formPromotions: FormGroup;
  loadingSave: boolean;
  loadingSchedule: boolean;
  schedules: Array<any> = [];
  tagsSelecteds: any[] = [];
  typePeriodicity: boolean;
  typeDiscountRate: boolean;

  constructor(private promotionsMerchants: PromotionsMerchantsService, private fb: FormBuilder) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.getSchedules();
  }



  tagsSelect(tagId, isDelete) {
    if (isDelete) {
      this.tagsSelecteds = this.tagsSelecteds.filter((tag) => tag !== tagId);
    } else {
      this.tagsSelecteds.push(tagId);
    }
    console.log(this.tagsSelecteds);
  }

  // Para saber si el tag esta en la lista que se agrego
  tagIndexOf(tagId) {
    return this.tagsSelecteds.indexOf(tagId);
  }






  // METHODS ADD PROMOTIONS ==========================================
  createPromotions() {
    // if (this.formPromotions.invalid) {
    //   this.formPromotions.markAllAsTouched();
    //   return;
    // }
    const promotion = this.formPromotions.value;
    console.log('Data form', promotion);
    this.loadingSave = true;
    this.addPromotions(promotion);
  }

  addPromotions(promotions) {
    this.promotionsMerchants.createPromotion(promotions)
      .subscribe((data) => {
        this.showSwalMessage('Promoción agregada correctamente');
        this.loadingSave = false;
      }, error => {
        this.showSwalMessage('Error al agregar la promocion');
        this.loadingSave = false;
      });
  }

  buildForm() {
    this.formPromotions = this.fb.group({
      name: ['Name promotion'],
      description: ['Description promotion'],
      from_date: [''],
      to_date: [''],
      promotion_type: [1],
      is_periodic: [null, [Validators.required]],
      has_limit_usage: [false],
      has_limit_discount_amount: [false],
      is_discount_percentage: [null, [Validators.required]],
      is_coupon_code: [false],
      minimum_order_price: ['', [Validators.required]],
      discount_amount: ['', [Validators.required]],
      limit_discount_amount: [0],
      usage_limit: [1],
      budget: [100],
      time_intervals: this.fb.array([this.createTimeIntervalsForm()], Validators.required)
    });
  }

  createTimeIntervalsForm(): FormGroup {
    return this.fb.group({
      from_time: ['15:00'],
      to_time: ['22:00'],
      schedule_ids: [this.tagsSelecteds],
    });
  }
  // =========================== END METHODS ADD PROMOTIONS


  // METHODS NECESSARY =======================
  getSchedules() {
    this.loadingSchedule = true;
    this.promotionsMerchants.getSchedules()
      .subscribe((data: any) => {
        this.schedules = data.data;
        console.log(this.schedules);
        this.loadingSchedule = false;
      }, error => {
        this.loadingSchedule = false;
      });
  }
  changeTypePeriodicity(value) {
    this.typePeriodicity = value === 'true' ? true : false;
    console.log(this.typePeriodicity);
  }
  changeTypeDiscountRate(value) {
    this.typeDiscountRate = value === 'true' ? true : false;
    console.log(this.typeDiscountRate);
  }
}
