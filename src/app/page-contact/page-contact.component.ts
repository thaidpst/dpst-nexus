import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { } from '@types/googlemaps';
import { NgForm } from '@angular/forms';

import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.css']
})
export class PageContactComponent extends TranslateComponent implements OnInit {

  // @ViewChild('gmap') gmapElement: any;
  // private map: google.maps.Map;

  constructor(
    settings: SettingService
  ) {
    super(settings);
  }

  ngOnInit() {
    // var mapOption = {
    //   center: new google.maps.LatLng(13.719155, 100.582247),
    //   zoom: 7
    // };
    // var styleArray = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#228ae6"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#228ae6"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#228ae6"}]}];
    // mapOption['options'] = {
    //    styles: styleArray
    // };

    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOption);
    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(13.719155, 100.582247),
    //     map: this.map,
    //     title: 'Snazzy!'
    // });
  }

  sendMessage(form: NgForm) {
    // TODO
    console.log(form.value);
    form.resetForm();
  }

}
