import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

/** Error when invalid control (or its parent's invalid control) is touched or dirty. */
export class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && (control.touched || control.dirty) && (control.invalid || control.parent.invalid));
  }
}

class School {
  constructor(
    public name: string,
    public district: string,
    public province: string
  ) { }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ttitles = [
    { value: 'เด็กชาย' },
    { value: 'เด็กหญิง' },
    { value: 'นาย' },
    { value: 'นางสาว' },
  ];
  titles = [
    { value: 'Mr.' },
    { value: 'Ms.' },
  ];
  parentTitles = [
    { value: 'นาย' },
    { value: 'นางสาว' },
    { value: 'นาง' },
  ];
  provinces = [
    'กระบี่',
    'กรุงเทพมหานคร',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'บึงกาฬ',
    'บุรีรัมย์',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พะเยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'ภูเก็ต',
    'มหาสารคาม',
    'มุกดาหาร',
    'ยะลา',
    'ยโสธร',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ร้อยเอ็ด',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระบุรี',
    'สระแก้ว',
    'สิงห์บุรี',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'สุโขทัย',
    'หนองคาย',
    'หนองบัวลำภู',
    'อำนาจเจริญ',
    'อุดรธานี',
    'อุตรดิตถ์',
    'อุทัยธานี',
    'อุบลราชธานี',
    'อ่างทอง',
    'เชียงราย',
    'เชียงใหม่',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'เลย',
    'แพร่',
    'แม่ฮ่องสอน',
  ];
  townPrefixes = [
    { value: 'ตำบล' },
    { value: 'แขวง' },
  ];
  districtPrefixes = [
    { value: 'อำเภอ' },
    { value: 'เขต' },
  ];
  schools: School[] = [
    new School('บดินทรเดชา (สิงห์ สิงหเสนี)', 'วังทองหลาง', 'กรุงเทพมหานคร'),
    new School('พระปฐมวิทยาลัย', 'เมือง', 'นครปฐม'),
    new School('พิษณุโลกพิทยาคม', 'เมือง', 'พิษณุโลก'),
    new School('ยุพราชวิทยาลัย', 'เมือง', 'เชียงใหม่'),
    new School('ศรีบุณยานนท์', 'เมือง', 'นนทบุรี'),
    new School('สามเสนวิทยาลัย', 'พญาไท', 'กรุงเทพมหานคร'),
    new School('สุรนารีวิทยา', 'เมือง', 'นครราชสีมา'),
    new School('หาดใหญ่วิทยาลัย', 'หาดใหญ่', 'สงขลา'),
    new School('เบญจมราชูทิศ นครศรีธรรมราช', 'เมือง', 'นครศรีธรรมราช'),
    new School('แก่นนครวิทยาลัย', 'เมือง', 'ขอนแก่น'),

    new School('บุญวาทย์วิทยาลัย', 'เมือง', 'ลำปาง'),
    new School('บุรีรัมย์พิทยาคม', 'เมือง', 'บุรีรัมย์'),
    new School('พรหมานุสรณ์จังหวัดเพชรบุรี', 'เมือง', 'เพชรบุรี'),
    new School('พัทลุง', 'เมือง', 'พัทลุง'),
    new School('มหาไถ่ศึกษาภาคตะวันออกเฉียงเหนือ', 'เมือง', 'ขอนแก่น'),
    new School('ระยองวิทยาคม', 'เมือง', 'ระยอง'),
    new School('สวนกุหลาบวิทยาลัย', 'พระนคร', 'กรุงเทพมหานคร'),
    new School('อุดรพิทยานุกูล', 'เมือง', 'อุดรธานี'),
    new School('เตรียมอุดมศึกษา', 'ปทุมวัน', 'กรุงเทพมหานคร'),
    new School('เบญจมราชูทิศ ราชบุรี', 'เมือง', 'ราชบุรี'),
    new School('เบ็ญจะมะมหาราช', 'เมือง', 'อุบลราชธานี'),
  ];

  profileForm: FormGroup;

  startDate = new Date(2000, 0, 1);
  instantMatcher = new InstantErrorStateMatcher();

  filteredProvinces: Observable<string[]>;

  filteredSchools: Observable<School[]>;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    const personal = this.fb.group({
      ttitle: ['', Validators.required],
      tfirstname: ['', Validators.required],
      tlastname: ['', Validators.required],
      tnickname: ['', Validators.required],
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      nickname: ['', Validators.required],
      birthdate: ['', Validators.required],
      natlidno: ['', [
        Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(13), Validators.maxLength(13)
      ]],
    });
    const contact = this.fb.group({
      phone: ['', [
        Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(9), Validators.maxLength(10)
      ]],
      email: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          emailConf: ['', [Validators.required, Validators.email]],
        }, {
          validator: this.matchConfirmation
        })
    });
    const address = this.fb.group({
      province: ['', Validators.required],
      houseno: ['', Validators.required],
      villagename: '',
      villageno: '',
      lane: '',
      alley: '',
      road: '',
      townPrefix: ['ตำบล', Validators.required],
      town: ['', Validators.required],
      districtPrefix: ['อำเภอ', Validators.required],
      district: ['', Validators.required],
      postalcode: ['', [
        Validators.required, Validators.pattern('[0-9]*'),
        Validators.minLength(5), Validators.maxLength(5)
      ]],
    });
    const parents = this.fb.group({
      fatherTitle: ['', Validators.required],
      fatherFirstname: ['', Validators.required],
      fatherLastname: ['', Validators.required],
      motherTitle: ['', Validators.required],
      motherFirstname: ['', Validators.required],
      motherLastname: ['', Validators.required],
    });
    const school = this.fb.group({
      school: ['', Validators.required],
    });
    this.profileForm = this.fb.group({
      personal: personal,
      contact: contact,
      address: address,
      parents: parents,
      school: school,
    });
  }
  ngOnInit() {
    this.filteredProvinces = this.profileForm.controls['address'].get('province').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterProvinces(val))
      );
    this.filteredSchools = this.profileForm.controls['school'].get('school').valueChanges
      .pipe(
        startWith<string | School>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => this.filterSchools(name))
      );
  }

  handleTitle(ev: MatSelectChange): void {
    const ttitle = ev.value;
    const titleControl = this.profileForm.controls['personal'].get('title');
    switch (ttitle) {
      case 'เด็กชาย':
        titleControl.setValue('Mr.');
        break;
      case 'เด็กหญิง':
        titleControl.setValue('Ms.');
        break;
      case 'นาย':
        titleControl.setValue('Mr.');
        break;
      case 'นางสาว':
        titleControl.setValue('Ms.');
        break;
    }
  }

  matchConfirmation(group: FormGroup) {
    let fieldValue;
    let valid = true;
    for (const field of Object.keys(group.controls)) {
      if (fieldValue) {
        if (fieldValue !== group.controls[field].value)
          valid = false;
      } else
        fieldValue = group.controls[field].value;
    }
    return valid ? null : { 'mismatch': true };
  }

  filterProvinces(val: string): string[] {
    return this.provinces.filter(option =>
      val && option.startsWith(val));
  }

  handleProvince(ev: MatAutocompleteSelectedEvent) {
    const province = ev.option.value;
    const townPrefixControl = this.profileForm.controls['address'].get('townPrefix');
    const districtPrefixControl = this.profileForm.controls['address'].get('districtPrefix');
    if (province === 'กรุงเทพมหานคร') {
      townPrefixControl.setValue('แขวง');
      districtPrefixControl.setValue('เขต');
    } else {
      townPrefixControl.setValue('ตำบล');
      districtPrefixControl.setValue('อำเภอ');
    }
  }

  filterSchools(val: string): School[] {
    return this.schools.filter(option =>
      val && option.name.startsWith(val));
  }

  handleSchool(ev: MatAutocompleteSelectedEvent) {
    const school = ev.option.value;
  }

  schoolDisplay(user?: School): string | undefined {
    return user ? user.name : undefined;
  }

  schoolHint(): string | undefined {
    const school = this.profileForm.controls['school'].get('school').value;
    if (!school.name) return undefined;
    const districtPrefix = school.province === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ';
    return districtPrefix + school.district + ' จังหวัด' + school.province;
  }
}
