import {Component, Inject, OnInit} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../model/distance-model/distance";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {GeneralUtils, RegistrationType} from "../../utils/general.utils";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {RegistrationUserModel} from "../../model/registration-user-model/registration-user-model";
import {Shirt} from "../../model/shirt-model/shirt-model";
import {Countries} from "../../data-storage/country-data/country-data-model/country-data-model";
import {countries} from "../../data-storage/country-data/country-data";
import {BillingDetails} from "../../model/billingDetails-model/billingDetails.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  templateUrl:'registration.page.html',
  selector:'registration-page',
  styleUrls:['registration.page.css']
})
export class RegistrationPage implements OnInit{teamForm = {} as FormGroup;
  isValidFormSubmitted: boolean | null = null;
  registrationUserModels: RegistrationUserModel[] = []
  tourEvent: TourEvent = new TourEvent()
  distancesList: Distance[] = []
  expansionPanelStep: number = 0;
  selectedBillingUser: RegistrationUserModel;
  tourEventId: any;
  distanceId: any;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder, public generalUtils: GeneralUtils, private globalService: GlobalService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(event => {
      this.tourEventId = event['tourEventId'];
      this.distanceId = event['tourEventId'];

    });
    this.initAutoComplete()
    if(this.tourEventId){
      this.globalService.tourEventService.get(this.tourEventId).subscribe(value => {
        this.tourEvent = value;
        var shirt: Shirt = {
          gender: 'MALE',
          price: 1500,
          type:'TECHNICAL',
          size:'L',
          color:'Piros'
        }
        var shirt2: Shirt = {
          gender: 'FEMALE',
          price: 1500,
          type:'TECHNICAL',
          size:'S',
          color:'Piros'
        }
        var shirt3: Shirt = {
          gender: 'FEMALE',
          price: 2500,
          type:'SIMPLE',
          size:'L',
          color:'Kék'
        }
        var shirt4: Shirt = {
          gender: 'MALE',
          price: 3000,
          type:'TECHNICAL',
          size:'XL',
          color:'Piros'
        }
        var shirts: Shirt[] = []
        shirts.push(shirt)
        shirts.push(shirt2)
        shirts.push(shirt3)
        shirts.push(shirt4)
        this.tourEvent.shirts = shirts
        this.tourEvent.finishFoodAvailable = true;
        this.tourEvent.finishFoodPrice = 500;
        this.tourEvent.tourEventDistances?.forEach(tourEventDistance => {
          if(tourEventDistance.distance){
            this.distancesList.push(tourEventDistance?.distance)
          }
        })
        this.loading = false;
      })
    }
    this.refreshTeamForm()
  }
  billingDetailsFormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber:['',[Validators.required]],
    zipCode:['',[Validators.required]],
    city:['',[Validators.required]],
    address:['',[Validators.required]],
    billingType:['',[Validators.required]],
    taxNumber:['',[]],
    country:[undefined,[Validators.required]]

  });
  summaryFormGroup = this.formBuilder.group({
    acceptFirs: [undefined, [Validators.required,Validators.requiredTrue]],
    acceptSecound: [undefined,  [Validators.required,Validators.requiredTrue]],
  });


  createEmpFormGroup() {
    return this.formBuilder.group({
      firstName: ['Povazsanyecz', [Validators.required]],
      lastName: ['Tamás', [Validators.required]],
      email: ['tamas.pova@gmail.com', [Validators.required, Validators.email]],
      phoneNumber:['36209651002',[Validators.required]],
      birthDay:['1990-07-07',[Validators.required]],
      livingPlace:['Nyíregyházas',[Validators.required]],
      distance:[undefined,[Validators.required]],
      needShirt:[false, [Validators.required]],
      shirt:[undefined],
      needFinishFood:[false],
      finishFoodPrice:[undefined]
    })
  }

  countryFilteredOptions: Observable<Countries[]>;
  countries:Countries[] = countries
  displayCountryFn(user: Countries): string {
    return user && user.name ? (user.name + " ("+user.code3+")") : '';
  }

  initAutoComplete(){
    this.countryFilteredOptions = this.billingDetailsFormGroup.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value+"";
        return name ? this.countryFilter(name as string) : this.countries.slice();
      }),
    );
  }
  private countryFilter(name: string): Countries[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter(countries => (countries.name + " ("+countries.code3+")").toLowerCase().includes(filterValue));
  }

  sumPrices(){
    var sum = 0;
    this.registrationUserModels.forEach(registrationUserModel => {
      if(registrationUserModel.distance?.price){
        sum += registrationUserModel.distance?.price
      }
    })
    return sum
  }

  sumShirtsPrices(){
    var sum = 0;
    this.registrationUserModels.forEach(registrationUserModel => {
      if(registrationUserModel.shirt?.price){
        sum += registrationUserModel.shirt?.price
      }
    })
    return sum
  }

  sumFoodPrices(){
    var sum = 0;
    this.registrationUserModels.forEach(registrationUserModel => {
      if(registrationUserModel?.needFinishFood && registrationUserModel.finishFoodPrice){
        sum += registrationUserModel.finishFoodPrice
      }
    })
    return sum
  }

  sumFull(){
    var sum = 0;
    this.registrationUserModels.forEach(registrationUserModel => {
      if(registrationUserModel){
        sum += this.sumRow(registrationUserModel)
      }
    })
    return sum
  }

  getShirtText(s?: Shirt){
    if(s){
      return s.gender + " "+ s.type + " "+s.size + " - "+s.price+" Ft"
    }
    return ''
  }

  getBillingData(s:string){
    return this.billingDetailsFormGroup.get(s)?.value
  }

  controllerByName(i:number, name:string){
    return this.employees.controls[i].get(name)

  }
  hasError(i:number){
    return !this.employees.controls[i].invalid
  }
  getExpansionPanelStyle(i:number){
    return this.hasError(i) ? 'background-color: #e5535363' : 'background-color:: unset'
  }
  getControls(i: number){
    return this.employees.controls[i]
  }
  getControllerValue(i:number, name:string){
    var value = this.controllerByName(i, name)
    if(value){
      return value.value
    }
  }

  getName(i:number){
    var result: string = ''
    if(this.getControllerValue(i, 'lastName') ){
      result += (this.getControllerValue(i, 'lastName'))
    }
    if(this.getControllerValue(i, 'firstName')){
      result += " "+this.getControllerValue(i, 'firstName')
    }
    if(this.getControllerValue(i, 'birthDay')){
      result += (" ("+this.getControllerValue(i, 'birthDay')+")")
    }
    return result
  }
  get teamName() {
    return this.teamForm.get('teamName');
  }
  get employees(): FormArray {
    return this.teamForm.get('employees') as FormArray;
  }
  addEmployee() {
    let fg = this.createEmpFormGroup();
    this.employees.push(fg);
  }
  deleteEmployee(idx: number) {
    this.employees.removeAt(idx);
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.teamForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.refreshRegistrationUserModels()
  }


  validateSummary(){
    if(this.summaryFormGroup.invalid){
      return
    }
    this.refreshBillingDetails()
    this.refreshRegistrationUserModels()
    console.log(JSON.stringify(this.registrationUserModels))
    console.log(JSON.stringify(this.billingDetails))
  }

  resetSubForm(i:number){
    this.getControls(i).reset()
  }
  resetTeamForm() {
    this.teamForm.reset();
  }

  deleteAllTeamMember(){
    this.refreshTeamForm()
  }

  refreshTeamForm(){
    this.teamForm = this.formBuilder.group({
      /*      teamName: ['', Validators.required],*/
      employees: this.formBuilder.array(
        [this.createEmpFormGroup()],
        [Validators.required, Validators.min(1)])
    })
  }

  private refreshRegistrationUserModels() {
    this.registrationUserModels = []
    this.employees.controls.forEach((value, index) => {
      var controllerValue = value.value
      var registrationUserModel = {
        firstName: controllerValue.firstName,
        lastName:controllerValue.lastName,
        email: controllerValue.email,
        phoneNumber: controllerValue.phoneNumber,
        birthDay: controllerValue.birthDay,
        livingPlace: controllerValue.livingPlace,
        distance: controllerValue.distance,
        needShirt: controllerValue.needShirt,
        shirt:controllerValue.shirt,
        needFinishFood:controllerValue.needFinishFood,
        finishFoodPrice:this.tourEvent.finishFoodPrice
      }
      this.registrationUserModels.push(registrationUserModel)
    })
  }

  billingDetails: BillingDetails = new BillingDetails()
  private refreshBillingDetails(){
    var billingDetails: BillingDetails = {
      firstName: <string>this.billingDetailsFormGroup.controls?.firstName?.value,
      lastName:   <string>this.billingDetailsFormGroup.controls?.lastName?.value,
      billingType:   <string>this.billingDetailsFormGroup.controls?.billingType?.value,
      address:   <string>this.billingDetailsFormGroup.controls?.address?.value,
      city:  <string>this.billingDetailsFormGroup.controls?.city?.value,
      country:  JSON.stringify(this.billingDetailsFormGroup.controls?.country.value),
      taxNumber:  <string>this.billingDetailsFormGroup.controls?.taxNumber?.value,
      zipCode:  <string>this.billingDetailsFormGroup.controls?.zipCode?.value,
      email:  <string>this.billingDetailsFormGroup.controls?.email?.value,
      phoneNumber:  <string>this.billingDetailsFormGroup.controls?.phoneNumber?.value
    }
    this.billingDetails = billingDetails
  }

  sumRow(item: RegistrationUserModel) {
    var sum: number = 0
    if(item?.distance?.price){
      sum += item?.distance?.price
    }
    if(item?.shirt?.price){
      sum +=item?.shirt?.price
    }
    if(item?.needFinishFood && item.finishFoodPrice){
      sum += item.finishFoodPrice
    }
    return sum
  }

  setStep(i: number) {

  }

  changeSelectedBillingUser(item: any) {
    var selected: RegistrationUserModel = item.value
    if(selected.firstName)    this.billingDetailsFormGroup.controls.firstName.setValue(selected.firstName)
    if(selected.lastName)     this.billingDetailsFormGroup.controls.lastName.setValue(selected.lastName)
    if(selected.email)     this.billingDetailsFormGroup.controls.email.setValue(selected.email)
    if(selected.phoneNumber)     this.billingDetailsFormGroup.controls.phoneNumber.setValue(selected.phoneNumber)
  }

  changeTypeSelection() {
    if(this.billingDetailsFormGroup.get('billingType')?.value == 'COMPATY'){
      this.billingDetailsFormGroup.get("taxNumber")?.setValidators(Validators.required)
    }
    else{
      this.billingDetailsFormGroup.get("taxNumber")?.setValidators(null)
      this.billingDetailsFormGroup.controls.taxNumber.setValue(null)
    }
  }
}
