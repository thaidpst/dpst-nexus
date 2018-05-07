webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-main-wrapper\">\n\n  <app-header-navbar></app-header-navbar>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Homepage'\">\n    <app-page-home></app-page-home>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Log in'\">\n    <app-page-login></app-page-login>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Register'\">\n    <app-page-register></app-page-register>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Contact'\">\n    <app-page-contact></app-page-contact>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Check status'\">\n    <app-page-check-status></app-page-check-status>\n  </ng-container>\n\n  <!-- Admin panel -->\n  <ng-container *ngIf=\"pageService.getPage()=='Admin panel' && userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().level>=8\">\n    <app-page-admin-panel></app-page-admin-panel>\n  </ng-container>\n  \n  <!-- <div>{{socketioService.getOnlineUsers()}}</div> -->  \n</div>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
core_1.enableProdMode();
var AppComponent = /** @class */ (function () {
    function AppComponent(socketioService, pageService, authenticationService, userinfoService, cookieService) {
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.authenticationService = authenticationService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketioService.connect();
        this.socketioService.getSocket().on('announce-account-status', function (userId) {
            if (this.userinfoService.getUserinfo() !== null && userId == this.userinfoService.getUserinfo()._id) {
                this.userinfoService.update();
                this.pageService.setPage('Check status');
            }
        }.bind(this));
        this.socketioService.getSocket().on('announce-account-delete', function (userId) {
            if (this.userinfoService.getUserinfo() !== null && userId == this.userinfoService.getUserinfo()._id) {
                this.socketioService.logout();
                this.userinfoService.setUserinfo(null);
                this.pageService.setPage('Homepage');
            }
        }.bind(this));
        // Check remember me login
        this.cookieService.checkRememberLogin()
            .then(function (result) {
            if (result.status) {
                _this.authenticationService.loginWithCookie(result.data)
                    .then(function (result2) {
                    if (result2.status) {
                        _this.socketioService.login(result2.data.username);
                        _this.userinfoService.setUserinfo(result2.data);
                    }
                });
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [socketio_service_1.SocketioService,
            page_service_1.PageService,
            authentication_service_1.AuthenticationService,
            userinfo_service_1.UserinfoService,
            cookie_service_1.CookieService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
// Services
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var admin_service_1 = __webpack_require__("./src/app/services/admin.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
// Components
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var header_navbar_component_1 = __webpack_require__("./src/app/header-navbar/header-navbar.component.ts");
var page_home_component_1 = __webpack_require__("./src/app/page-home/page-home.component.ts");
var page_login_component_1 = __webpack_require__("./src/app/page-login/page-login.component.ts");
var page_register_component_1 = __webpack_require__("./src/app/page-register/page-register.component.ts");
var page_contact_component_1 = __webpack_require__("./src/app/page-contact/page-contact.component.ts");
var footer_component_1 = __webpack_require__("./src/app/footer/footer.component.ts");
var page_check_status_component_1 = __webpack_require__("./src/app/page-check-status/page-check-status.component.ts");
var page_admin_panel_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-panel.component.ts");
var page_admin_user_table_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.ts");
var page_admin_statistic_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.ts");
var page_admin_email_blast_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_navbar_component_1.HeaderNavbarComponent,
                page_home_component_1.PageHomeComponent,
                page_login_component_1.PageLoginComponent,
                page_register_component_1.PageRegisterComponent,
                page_contact_component_1.PageContactComponent,
                footer_component_1.FooterComponent,
                page_check_status_component_1.PageCheckStatusComponent,
                page_admin_panel_component_1.PageAdminPanelComponent,
                page_admin_user_table_component_1.PageAdminUserTableComponent,
                page_admin_statistic_component_1.PageAdminStatisticComponent,
                page_admin_email_blast_component_1.PageAdminEmailBlastComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule
            ],
            providers: [
                socketio_service_1.SocketioService,
                page_service_1.PageService,
                setting_service_1.SettingService,
                authentication_service_1.AuthenticationService,
                userinfo_service_1.UserinfoService,
                admin_service_1.AdminService,
                cookie_service_1.CookieService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/footer/footer.component.css":
/***/ (function(module, exports) {

module.exports = ".political-footer-one {\r\n    padding-top: 0;\r\n    background: #0e0e0e;\r\n}"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer id=\"political-footer\" class=\"political-footer-one\">\n  <span class=\"political-footer-transparent\"></span>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"political-copyright\">\n          <ul class=\"political-team-social\">\n            <li><a href=\"https://www.facebook.com/sarun.seepun\" class=\"fa fa-facebook-square\" target=\"_blank\"></a></li>\n            <li><a href=\"https://www.linkedin.com/in/sseepun/\" class=\"fa fa-linkedin-square\" target=\"_blank\"></a></li>\n            <li><a href=\"http://bigdata300.com/\" class=\"fa fa-share-alt-square\" target=\"_blank\"></a></li>\n          </ul>\n          <p>\n            Copyright 2017-2018 \n            <span> - All Rights Reserved \n            <a href=\"https://www.facebook.com/sarun.seepun\" target=\"_blank\" style=\"color:#fff;\">\n              Sarun Seepun\n            </a></span>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</footer>"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            template: __webpack_require__("./src/app/footer/footer.component.html"),
            styles: [__webpack_require__("./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;


/***/ }),

/***/ "./src/app/globals.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ipHost = "http://localhost:7000";
// export const ipHost: string = "http://159.65.70.206:7000";
exports.testing = true;


/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.css":
/***/ (function(module, exports) {

module.exports = ".logo img {\r\n    width: 213px !important;\r\n}\r\n\r\n.political-main-header, .sub-menu.level-2 {\r\n    -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n            box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n}\r\n\r\n.sub-menu.level-2 {margin: 0;}\r\n\r\n.pen {color:orange !important; font-weight:600 !important;}\r\n\r\n@media screen and (max-width: 990px) {\r\n    .menu.navbar.navbar-default {\r\n        -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n                box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n    .logo {\r\n        padding: 25px 0 0 0;\r\n    }\r\n    .menu-link span {\r\n        margin: 20px 0;\r\n    }\r\n    .navbar {\r\n        top: 129px;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"political-header\" class=\"political-header-one\">\n    <div class=\"political-main-header\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <aside class=\"col-md-3\">\n                    <a (click)=\"pageService.setPage('Home')\" class=\"logo\"><img src=\"assets/img/logo/base.png\" alt=\"\"></a>\n                </aside>\n\n                <aside class=\"col-md-9\">\n                    <div class=\"political-navigation\">\n                        <a href=\"#menu\" class=\"menu-link active\" (click)=\"unactiveSubMenu()\">\n                            <span style=\"margin-right:0;\"></span>\n                        </a>\n                        <nav id=\"menu\" class=\"menu navbar navbar-default\" (mouseleave)=\"autoCloseNavbar()\">\n                            <ul class=\"level-1 navbar-nav\">\n\n                                <!-- Homepage -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Homepage'}\"><a (click)=\"pageService.setPage('Homepage'); unactive();\">\n                                    <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">หน้าแรก</ng-container>\n                                    <ng-container *ngIf=\"settingService.getLanguage()=='English'\">HomePage</ng-container>\n                                </a></li>\n\n                                <!-- Log in -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Log in'}\" *ngIf=\"userinfoService.getUserinfo()===null\">\n                                    <a (click)=\"pageService.setPage('Log in'); unactive();\">\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">เข้าสู่ระบบ</ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Log in</ng-container>\n                                    </a>\n                                </li>\n\n                                <!-- Register -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Register'}\" *ngIf=\"userinfoService.getUserinfo()===null\">\n                                    <a (click)=\"pageService.setPage('Register'); unactive();\">\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">สมัครสมาชิก</ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Register</ng-container>\n                                    </a>\n                                </li>\n\n                                <!-- Check status -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Check status'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status!='Active'\">\n                                    <a>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">สถานะ: \n                                            <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending'}\">{{userinfoService.getUserinfo().status}}</span>\n                                        </ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Status:\n                                            <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending'}\">{{userinfoService.getUserinfo().status}}</span>\n                                        </ng-container>\n                                    </a><span class=\"has-subnav status-nav\" (click)=\"toggleSubnav('.status-nav')\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2 status-nav\">\n                                        <li><a (click)=\"pageService.setPage('Check status'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">คืออะไร</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">What is this?</ng-container>\n                                        </a></li>\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ออกจากระบบ</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Log out</ng-container>\n                                        </a></li>\n                                    </ul>\n                                </li>\n\n                                <!-- Profile -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Profile'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status=='Active'\">\n                                    <a>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">สวัสดี \n                                            <span class=\"hello-user\">{{userinfoService.getUserinfo().username}}</span>\n                                        </ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Hello,\n                                            <span class=\"hello-user\">{{userinfoService.getUserinfo().username}}</span>\n                                        </ng-container>\n                                    </a><span class=\"has-subnav profile-nav\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2 profile-nav\">\n                                        <li><a (click)=\"pageService.setPage('Profile'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ประวัติส่วนตัว</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Profile</ng-container>\n                                        </a></li>\n                                        <li><a (click)=\"pageService.setPage('Profile'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ประวัติการใช้งาน</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">History</ng-container>\n                                        </a></li>\n\n                                        <!-- Admin panel -->\n                                        <li *ngIf=\"userinfoService.getUserinfo().level>=8\">\n                                            <a (click)=\"pageService.setPage('Admin panel'); pageService.setSubpage('User table'); unactive();\"\n                                            class=\"hello-user\" style=\"font-weight:600;\">\n                                                Admin Panel\n                                            </a>\n                                        </li>\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ออกจากระบบ</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Log out</ng-container>\n                                        </a></li>\n                                    </ul>\n                                </li>\n\n                                <!-- Forms -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Forms'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status=='Active'\">\n                                    <a (click)=\"pageService.setPage('Forms'); unactive();\">\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">แบบฟอร์ม</ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Forms</ng-container>\n                                    </a>\n                                </li>\n\n                                <!-- Contact -->\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Contact'}\"><a (click)=\"pageService.setPage('Contact'); unactive();\">\n                                    <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ติดต่อเรา</ng-container>\n                                    <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Contact Us</ng-container>\n                                </a></li>\n\n                                <!-- Language -->\n                                <!-- <li>\n                                    <a>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">เลือกภาษา</ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Language</ng-container>\n                                    </a><span class=\"has-subnav\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2\">\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาไทย</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Thai</ng-container>\n                                        </a></li>\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาอังกฤษ</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">English</ng-container>\n                                        </a></li>\n                                    </ul>\n                                </li> -->\n                                <li>\n                                    <a>Language</a><span class=\"has-subnav\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2\">\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">Thai</a></li>\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">English</a></li>\n                                    </ul>\n                                </li>\n\n                            </ul>\n                        </nav>\n                    </div>\n                </aside>\n\n            </div>\n        </div>\n    </div>\n</header>"

/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var d3 = __webpack_require__("./node_modules/d3/index.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var HeaderNavbarComponent = /** @class */ (function () {
    function HeaderNavbarComponent(elementRef, socketioService, pageService, settingService, userinfoService, cookieService) {
        this.elementRef = elementRef;
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
        this.host = d3.select(this.elementRef.nativeElement);
    }
    HeaderNavbarComponent.prototype.ngOnInit = function () {
    };
    HeaderNavbarComponent.prototype.unactive = function () {
        this.host.selectAll('.sub-menu').classed('active', false);
        this.host.selectAll('.has-subnav').classed('active', false);
        this.host.selectAll('.navbar').classed('active', false);
    };
    HeaderNavbarComponent.prototype.unactiveSubMenu = function () {
        this.host.selectAll('.sub-menu').classed('active', false);
    };
    HeaderNavbarComponent.prototype.toggleSubnav = function (selector) {
        var toggle = !this.host.select(selector).classed('active');
        this.host.selectAll(selector).classed('active', toggle);
    };
    HeaderNavbarComponent.prototype.autoCloseNavbar = function () {
        // this.host.select('.menu-link').classed('active', true);
        // this.host.select('.navbar').classed('active', false);
    };
    HeaderNavbarComponent.prototype.memberLogOut = function () {
        this.socketioService.logout();
        this.userinfoService.setUserinfo(null);
        this.pageService.setPage('Homepage');
        this.cookieService.clearUserLoginCookie();
    };
    HeaderNavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-header-navbar',
            template: __webpack_require__("./src/app/header-navbar/header-navbar.component.html"),
            styles: [__webpack_require__("./src/app/header-navbar/header-navbar.component.css")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            socketio_service_1.SocketioService,
            page_service_1.PageService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            cookie_service_1.CookieService])
    ], HeaderNavbarComponent);
    return HeaderNavbarComponent;
}());
exports.HeaderNavbarComponent = HeaderNavbarComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  page-admin-email-blast works!\n</p>\n"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var PageAdminEmailBlastComponent = /** @class */ (function () {
    function PageAdminEmailBlastComponent() {
    }
    PageAdminEmailBlastComponent.prototype.ngOnInit = function () {
    };
    PageAdminEmailBlastComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-email-blast',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageAdminEmailBlastComponent);
    return PageAdminEmailBlastComponent;
}());
exports.PageAdminEmailBlastComponent = PageAdminEmailBlastComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.css":
/***/ (function(module, exports) {

module.exports = "li.active a {\r\n    color: #228ae6;\r\n    font-weight: 600;\r\n}"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"political-subheader-wrap\">\r\n                    <h1>Admin Panel</h1>\r\n                    <ul class=\"political-breadcrumb\">\r\n                        <li><a (click)=\"pageService.setPage('Homepage')\">Homepage</a></li>\r\n                        <li>Admin Panel</li>\r\n                        <li class=\"active\">{{pageService.getSubpage()}}</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"political-main-content\">\r\n    <div class=\"political-main-section\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n\r\n                <!-- Admin panel sidbar -->\r\n                <aside class=\"col-md-3\">\r\n                    <div class=\"widget widget_cetagories\">\r\n                        <h2 class=\"political-widget-heading\">Admin Menu</h2>\r\n                        <ul>\r\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='User table'}\">\r\n                                <a (click)=\"pageService.setSubpage('User table')\">User Table</a></li>\r\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Statistic'}\">\r\n                                <a (click)=\"pageService.setSubpage('Statistic')\">Statistic</a></li>\r\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Email blast'}\">\r\n                                <a (click)=\"pageService.setSubpage('Email blast')\">Email Blast</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </aside>\r\n\r\n                <!-- Admin panel subpages -->\r\n                <div class=\"col-md-9\">\r\n\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='User table'\">\r\n                        <app-page-admin-user-table></app-page-admin-user-table>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Statistic'\">\r\n                        <app-page-admin-statistic></app-page-admin-statistic>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Email blast'\">\r\n                        <app-page-admin-email-blast></app-page-admin-email-blast>\r\n                    </ng-container>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var PageAdminPanelComponent = /** @class */ (function () {
    function PageAdminPanelComponent(pageService, settingService) {
        this.pageService = pageService;
        this.settingService = settingService;
    }
    PageAdminPanelComponent.prototype.ngOnInit = function () {
    };
    PageAdminPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-panel',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-panel.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-panel.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService])
    ], PageAdminPanelComponent);
    return PageAdminPanelComponent;
}());
exports.PageAdminPanelComponent = PageAdminPanelComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  page-admin-statistic works!\n</p>\n"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var PageAdminStatisticComponent = /** @class */ (function () {
    function PageAdminStatisticComponent() {
    }
    PageAdminStatisticComponent.prototype.ngOnInit = function () {
    };
    PageAdminStatisticComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-statistic',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageAdminStatisticComponent);
    return PageAdminStatisticComponent;
}());
exports.PageAdminStatisticComponent = PageAdminStatisticComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.css":
/***/ (function(module, exports) {

module.exports = "th {color: #000000;}\r\ntd {font-weight: 300;}\r\n.fa {cursor: pointer;}\r\n.show-per-page, .select-sort, input.search[type=text] {height: 38px; padding: 3px;}\r\n.show-per-page {width: 60px;}\r\n.select-sort {width: 190px;}\r\ninput.search[type=text] {\r\n    font-size: 16px;\r\n    border: 1px solid #dfdfdf;\r\n    width: 180px;\r\n    color: #5a5a5a;\r\n    font-weight: 300;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n.top-option {\r\n    padding: 0 15px;\r\n    float: right;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"subpage=='Table'\" class=\"political-blog-large\">\n\n  <!-- Selection criteria -->\n  <div class=\"political-pagination\" style=\"color:#000; margin:0 0 25px 0;\">\n\n      <div class=\"top-option\">\n        <input #keyword class=\"search\" type=\"text\" (keyup.enter)=\"tableSearch(keyword.value)\">\n        <input type=\"submit\" class=\"political-simple-btn\" value=\"Search\" (click)=\"tableSearch(keyword.value)\">\n      </div>\n\n      <div class=\"top-option\">\n        Sort by\n        <select class=\"select-sort\" (change)=\"tableSortChange($event.target.value)\">\n          <option value=\"None\" selected=\"selected\">None</option>\n          <option value=\"Firstname increasing\">Firstname increasing</option>\n          <option value=\"Firstname decreasing\">Firstname decreasing</option>\n          <option value=\"Level increasing\">Level increasing</option>\n          <option value=\"Level decreasing\">Level decreasing</option>\n          <option value=\"Status increasing\">Status increasing</option>\n          <option value=\"Status decreasing\">Status decreasing</option>\n          <option value=\"Register date increasing\">Register date increasing</option>\n          <option value=\"Register date decreasing\">Register date decreasing</option>\n        </select>\n      </div>\n\n      <div class=\"top-option\">\n        Show per page\n        <select class=\"show-per-page\" (change)=\"tableLimitChange($event.target.value)\">\n          <option value=\"10\">10</option>\n          <option value=\"25\" selected=\"selected\">25</option>\n          <option value=\"50\">50</option>\n          <option value=\"100\">100</option>\n        </select>\n      </div>\n        \n  </div>\n\n  <ul class=\"row\">\n    <li class=\"col-md-12\">\n\n      <table><tbody>\n        <tr>\n          <th>Username</th>\n          <th>Firstname</th>\n          <th>Lastname</th>\n          <th>E-mail address</th>\n          <th>Level</th>\n          <th>Status</th>\n          <th>Actions</th>\n        </tr>\n\n        <ng-container *ngIf=\"users===null\">\n          <tr><td colspan=\"8\">No user data found.</td></tr>\n        </ng-container>\n        <ng-container *ngIf=\"users!==null\">\n          <tr *ngFor=\"let user of users;\">\n            <td>{{user.username}}</td>\n            <td>{{user.firstname}}</td>\n            <td>{{user.lastname}}</td>\n            <td>{{user.email}}</td>\n            <td>{{user.level}}</td>\n            <td [ngClass]=\"{'ban':user.status=='Ban', 'pen':user.status=='Pending', 'hello-user':user.status=='Active'}\">{{user.status}}</td>\n            \n            <!-- Admin options based on level -->\n            <td *ngIf=\"user.level < userinfoService.getUserinfo().level\">\n              <i *ngIf=\"user.status!='Active'\" class=\"fa fa-check-square-o hello-user\" aria-hidden=\"true\"\n                (click)=\"setAccountStatus(user, 'Active')\">&nbsp;</i>\n              <i *ngIf=\"user.status!='Ban'\" class=\"fa fa-times pen\" aria-hidden=\"true\"\n                (click)=\"setAccountStatus(user, 'Ban')\">&nbsp;</i>\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\n              <i class=\"fa fa-pencil-square-o view-icon\" aria-hidden=\"true\"></i>&nbsp;\n              <i class=\"fa fa-trash ban\" aria-hidden=\"true\"\n                (click)=\"tryDeleteAccount(user)\"></i>\n            </td><!-- Lower users -->\n            <td *ngIf=\"user.level > userinfoService.getUserinfo().level\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>\n            </td><!-- Higher users -->\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id==userinfoService.getUserinfo()._id\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\n              <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n            </td><!-- Yourself -->\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id!=userinfoService.getUserinfo()._id\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>\n            </td><!-- Same level users, not you -->\n\n          </tr>\n        </ng-container>\n\n      </tbody></table>\n\n      <!-- Pagination -->\n      <div class=\"political-pagination\">\n        <ul class=\"page-numbers\">\n            <li><a class=\"previous page-numbers\" (click)=\"previouseTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-left\"></i></span></a></li>\n            <li *ngFor=\"let page of pagination;\">\n              <a *ngIf=\"page!=criteria.page\" class=\"page-numbers\"\n              (click)=\"paginationChangePage(page)\">{{page+1}}</a>\n              <span *ngIf=\"page==criteria.page\" class=\"page-numbers current\">{{page+1}}</span>\n            </li>\n            <li><a class=\"next page-numbers\" (click)=\"nextTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-right\"></i></span></a></li>\n        </ul>\n      </div>\n\n    </li>\n  </ul>\n</div>\n\n<!-- Delete user panel -->\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='Thai'\" class=\"political-blog-large\">\n  <h1 style=\"margin-bottom:20px;\"><strong>คุณกำลังจะทำการ<span class=\"ban\">ลบข้อมูลผู้ใช้</span></strong></h1>\n  <h3 style=\"margin-bottom:20px;\">ชื่อผู้ใช้งาน: <span class=\"hello-user\" style=\"font-weight:600;\">{{userOnHand.username}}</span></h3>\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"ลบข้อมูลผู้ใช้\" (click)=\"deleteAccount()\">\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"ยกเลิก\" (click)=\"tryDeleteCancel()\">\n      \n</div>\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='English'\" class=\"political-blog-large\">\n  <h1 style=\"margin-bottom:20px;\"><strong>You are about to <span class=\"ban\">DELETE</span> a user</strong></h1>\n  <h3 style=\"margin-bottom:20px;\">Username: <span class=\"hello-user\" style=\"font-weight:600;\">{{userOnHand.username}}</span></h3>\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"DELETE\" (click)=\"deleteAccount()\">\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"Cancel\" (click)=\"tryDeleteCancel()\">\n</div>\n\n<!-- View user panel -->"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var admin_service_1 = __webpack_require__("./src/app/services/admin.service.ts");
var PageAdminUserTableComponent = /** @class */ (function () {
    function PageAdminUserTableComponent(socketioService, settingService, userinfoService, adminService) {
        this.socketioService = socketioService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.adminService = adminService;
        this.criteria = {
            page: 0, start: 0, limit: 25, totalUsers: 0,
            sort: 'None', search: 'EmptyNone'
        };
        this.pagination = [];
        this.users = null;
        this.subpage = 'Table';
        this.userOnHand = null;
    }
    PageAdminUserTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsersSubscription = this.adminService.observeUsers().subscribe(function (result) {
            if (result.status) {
                _this.users = result.data;
                _this.criteria.totalUsers = result.totalUsers;
                _this.pagination = [];
                var count = 0;
                while (count * _this.criteria.limit < _this.criteria.totalUsers) {
                    _this.pagination.push(count);
                    count += 1;
                }
            }
        });
        this.socketioService.getSocket().on('update-new-users', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
        this.socketioService.getSocket().on('announce-account-status', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
        this.socketioService.getSocket().on('announce-account-delete', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
        this.adminService.getUsers(this.criteria);
    };
    PageAdminUserTableComponent.prototype.setAccountStatus = function (userinfo, status) {
        var _this = this;
        this.adminService.setAccoundStatus(userinfo, status).then(function (result) {
            if (result.status) {
                _this.adminService.getUsers(_this.criteria);
                _this.socketioService.accountStatus(userinfo._id);
            }
        });
    };
    PageAdminUserTableComponent.prototype.tableLimitChange = function (limit) {
        this.criteria.page = 0;
        this.criteria.start = 0;
        this.criteria.limit = limit;
        this.criteria.totalUsers = 0;
        this.pagination = [];
        this.users = null;
        this.adminService.getUsers(this.criteria);
    };
    PageAdminUserTableComponent.prototype.paginationChangePage = function (page) {
        this.criteria.page = page;
        this.criteria.start = page * this.criteria.limit;
        this.adminService.getUsers(this.criteria);
    };
    PageAdminUserTableComponent.prototype.previouseTablePage = function () {
        if (this.criteria.page > 0) {
            this.criteria.page -= 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.adminService.getUsers(this.criteria);
        }
    };
    PageAdminUserTableComponent.prototype.nextTablePage = function () {
        if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalUsers) {
            this.criteria.page += 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.adminService.getUsers(this.criteria);
        }
    };
    PageAdminUserTableComponent.prototype.tableSortChange = function (sort) {
        this.criteria.sort = sort;
        this.adminService.getUsers(this.criteria);
    };
    PageAdminUserTableComponent.prototype.tableSearch = function (keyword) {
        keyword = keyword.trim();
        if ((this.criteria.search == 'EmptyNone' && keyword == '') || this.criteria.search == keyword) { }
        else if (keyword == '') {
            this.criteria.search = 'EmptyNone';
            this.adminService.getUsers(this.criteria);
        }
        else {
            this.criteria.search = keyword;
            this.adminService.getUsers(this.criteria);
        }
    };
    // Delete user process
    PageAdminUserTableComponent.prototype.tryDeleteAccount = function (userinfo) { this.subpage = 'Try delete'; this.userOnHand = userinfo; };
    PageAdminUserTableComponent.prototype.tryDeleteCancel = function () { this.subpage = 'Table'; this.userOnHand = null; };
    PageAdminUserTableComponent.prototype.deleteAccount = function () {
        var _this = this;
        if (this.userOnHand !== null) {
            this.adminService.deleteAccount(this.userOnHand).then(function (result) {
                if (result.status) {
                    _this.adminService.getUsers(_this.criteria);
                    _this.socketioService.deleteAccount(_this.userOnHand._id);
                    _this.userOnHand = null;
                    _this.subpage = 'Table';
                }
            });
        }
    };
    // View user process
    PageAdminUserTableComponent.prototype.viewUserinfo = function (userinfo) { this.subpage = 'View user'; this.userOnHand = userinfo; };
    PageAdminUserTableComponent.prototype.ngOnDestroy = function () {
        this.getUsersSubscription.unsubscribe();
    };
    PageAdminUserTableComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-user-table',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.css")]
        }),
        __metadata("design:paramtypes", [socketio_service_1.SocketioService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            admin_service_1.AdminService])
    ], PageAdminUserTableComponent);
    return PageAdminUserTableComponent;
}());
exports.PageAdminUserTableComponent = PageAdminUserTableComponent;


/***/ }),

/***/ "./src/app/page-check-status/page-check-status.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.political-contact-form {font-size: 18px;}\r\n.political-contact-form a, .political-contact-form span {color: #228ae6; font-weight: 600;}\r\n"

/***/ }),

/***/ "./src/app/page-check-status/page-check-status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n\n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2 *ngIf=\"settingService.getLanguage()=='Thai'\">สถานะ:\n              <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending', 'hello-user':userinfoService.getUserinfo().status=='Active'}\">{{userinfoService.getUserinfo().status}}</span>\n            </h2>\n            <h2 *ngIf=\"settingService.getLanguage()=='English'\">Status:\n              <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending', 'hello-user':userinfoService.getUserinfo().status=='Active'}\">{{userinfoService.getUserinfo().status}}</span>\n            </h2>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-2\"></div>\n\n          <div *ngIf=\"userinfoService.getUserinfo().status=='Active'\" class=\"col-md-8\">\n            <div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-contact-form\">\n                ยินดีต้อนรับ <span>{{userinfoService.getUserinfo().username}}</span>.\n                \n                <br><br>บัญชีของคุณได้รับการยืนยันเรียบร้อยเเล้ว ท่านจะสามารถเริ่มใช้บริการของเราได้\n  \n                <br><br>ถ้าท่านมีคำถามหรือข้อสงสัย\n                ท่านสามารถ<a (click)=\"pageService.setPage('Contact')\">ติดต่อเรา</a>ได้ครับ\n            </div>\n            <div *ngIf=\"settingService.getLanguage()=='Active'\" class=\"political-contact-form\">\n              Hello, <span>{{userinfoService.getUserinfo().username}}</span>.\n              \n              <br><br>Your account has been approved, and you can use our service.\n\n              <br><br>If You have any concerns, please \n              <a (click)=\"pageService.setPage('Contact')\">contact us</a>.\n            </div>\n          </div>\n          \n          <div *ngIf=\"userinfoService.getUserinfo().status=='Pending'\" class=\"col-md-8\">\n            <div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-contact-form\">\n                ยินดีต้อนรับ <span>{{userinfoService.getUserinfo().username}}</span>.\n                \n                <br><br>คุณได้ลงทะเบียนในระบบของเราเป็นที่เรียบร้อยเเล้ว\n                กรุณารอสักครู่ ทางเรากำลังตรวจสอบข้อมูลเเล้วจะทำการยืนยันข้อมมูลของท่าน \n                หลังจากนั้นท่านจะสามารถเริ่มใช้บริการของเราได้\n  \n                <br><br>ถ้าท่านมีคำถามหรือข้อสงสัย\n                ท่านสามารถ<a (click)=\"pageService.setPage('Contact')\">ติดต่อเรา</a>ได้ครับ\n            </div>\n            <div *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-contact-form\">\n              Hello, <span>{{userinfoService.getUserinfo().username}}</span>.\n              \n              <br><br>Your account is created successfully in our database. \n              Please wait for our administrators to approve your account.\n              Then you can use our service.\n\n              <br><br>If You have any concerns, please \n              <a (click)=\"pageService.setPage('Contact')\">contact us</a>.\n            </div>\n          </div>\n\n          <div *ngIf=\"userinfoService.getUserinfo().status=='Ban'\" class=\"col-md-8\">\n            <div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-contact-form\">\n                ยินดีต้อนรับ <span>{{userinfoService.getUserinfo().username}}</span>.\n                \n                <br><br>ชื่อผู้ใช้งานของท่านได้ถูกระงับการใช้งานชั่วคราว\n  \n                <br><br>ถ้าท่านมีคำถามหรือข้อสงสัย\n                ท่านสามารถ<a (click)=\"pageService.setPage('Contact')\">ติดต่อเรา</a>ได้ครับ\n              </div>\n            <div *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-contact-form\">\n              Hello, <span>{{userinfoService.getUserinfo().username}}</span>.\n              \n              <br><br>Your account have currently been banned.\n\n              <br><br>If You have any concerns, please \n              <a (click)=\"pageService.setPage('Contact')\">contact us</a>.\n            </div>\n          </div>\n          \n        </div>\n      </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page-check-status/page-check-status.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageCheckStatusComponent = /** @class */ (function () {
    function PageCheckStatusComponent(settingService, userinfoService) {
        this.settingService = settingService;
        this.userinfoService = userinfoService;
    }
    PageCheckStatusComponent.prototype.ngOnInit = function () {
    };
    PageCheckStatusComponent = __decorate([
        core_1.Component({
            selector: 'app-page-check-status',
            template: __webpack_require__("./src/app/page-check-status/page-check-status.component.html"),
            styles: [__webpack_require__("./src/app/page-check-status/page-check-status.component.css")]
        }),
        __metadata("design:paramtypes", [setting_service_1.SettingService,
            userinfo_service_1.UserinfoService])
    ], PageCheckStatusComponent);
    return PageCheckStatusComponent;
}());
exports.PageCheckStatusComponent = PageCheckStatusComponent;


/***/ }),

/***/ "./src/app/page-contact/page-contact.component.css":
/***/ (function(module, exports) {

module.exports = "input:disabled {cursor: not-allowed;}\r\n\r\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password],\r\n.political-contact-form form textarea {\r\n    color: #000000;\r\n    font-size: 16px;\r\n}\r\n\r\n@media screen and (min-width: 990px) {\r\n    .political-contact-text {\r\n        height: 200px;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/page-contact/page-contact.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n\n      <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">\n        <div class=\"political-fancy-title\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md-12\"><h2>ติดต่อเรา</h2></div>\n            </div>\n          </div>\n        </div>\n        <div class=\"container\">\n          <div class=\"row\">\n\n            <div class=\"col-md-12\">\n                <div class=\"political-contact-info\">\n                  <ul class=\"row\">\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-location-pin\"></i>\n                        <h6>เจอเราที่ พสวท.</h6>\n                        <p>924 ถนนสุขุมวิท \n                          <br>เขตคลองเตย กรุเทพ \n                          <br>ประเทศไทย 10110</p>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-phone-call\"></i>\n                        <h6>โทรหาเรา</h6>\n                        <p>02 392 4021 \n                          <br>02 392 4021</p>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-envelope\"></i>\n                        <h6>E-mail หาเราที่</h6>\n                        <a href=\"mailto:nsric@ipst.ac.th\">nsric@ipst.ac.th</a>\n                        <a href=\"mailto:sarun_sla@hotmail.com\">sarun_sla@hotmail.com</a>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-print\"></i>\n                        <h6>Fax หาเราได้ที่</h6>\n                        <p>02 381 0750</p>\n                      </div>\n                    </li>\n                  </ul>\n                </div>\n            </div>\n\n          </div>\n        </div>\n      </ng-container>\n      <ng-container *ngIf=\"settingService.getLanguage()=='English'\">\n        <div class=\"political-main-section\">\n            <div class=\"political-fancy-title\">\n              <div class=\"container\">\n                <div class=\"row\">\n                  <div class=\"col-md-12\"><h2>Get In touch</h2></div>\n                </div>\n              </div>\n            </div>\n            <div class=\"container\">\n              <div class=\"row\">\n    \n                <div class=\"col-md-12\">\n                  <div class=\"political-contact-info\">\n                    <ul class=\"row\">\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-location-pin\"></i>\n                          <h6>Meet Us At IPST</h6>\n                          <p>924 Sukhumvit Rd, \n                            <br>Khlong Toei, Bangkok \n                            <br>Thailand 10110</p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-phone-call\"></i>\n                          <h6>Call Us At</h6>\n                          <p>+66 2 392 4021 \n                            <br>+66 2 392 4021</p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-envelope\"></i>\n                          <h6>E-mail Us At</h6>\n                          <a href=\"mailto:nsric@ipst.ac.th\">nsric@ipst.ac.th</a>\n                          <a href=\"mailto:sarun_sla@hotmail.com\">sarun_sla@hotmail.com</a>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-print\"></i>\n                          <h6>Fax Us At</h6>\n                          <p>+66 2 381 0750</p>\n                        </div>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n    \n              </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <div class=\"political-main-section\">\n        <div class=\"political-fancy-title\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <h2 *ngIf=\"settingService.getLanguage()=='Thai'\">ส่งข้อความหาเรา</h2>\n                <h2 *ngIf=\"settingService.getLanguage()=='English'\">Contact Us Now</h2>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"container\">\n          <div class=\"row\">\n            \n            <div class=\"col-md-8\">\n              <div class=\"political-contact-form\">\n                <h2 class=\"political-section-heading\" *ngIf=\"settingService.getLanguage()=='Thai'\">ส่งข้อความหาเราตอนนี้</h2>\n                <h2 class=\"political-section-heading\" *ngIf=\"settingService.getLanguage()=='English'\">Message Us Now</h2>\n                <p *ngIf=\"settingService.getLanguage()=='Thai'\">\n                  หลังจากที่เราได้รับข้อความของคุณ เราจะติดต่อกลับภายใน 2 วันทำการ\n                </p>\n                <p *ngIf=\"settingService.getLanguage()=='English'\">\n                  After we received your email, we will reply to you within 2 business days. Thank you!\n                </p>\n\n                <form *ngIf=\"settingService.getLanguage()=='Thai'\"\n                #form1=\"ngForm\" (ngSubmit)=\"sendMessage(form1)\" ngNativeValidate>\n                  <ul>\n                    <li><input class=\"reg-input\" type=\"text\" name=\"name\" value=\"\" placeholder=\"ชื่อของคุณ\" ngModel required></li>\n                    <li><input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" placeholder=\"E-mail address ของคุณ\" ngModel required></li>\n                    <li class=\"political-full-form\"><textarea name=\"message\" placeholder=\"ข้อความ\" ngModel required></textarea></li>\n                    <input type=\"submit\" value=\"ส่งข้อความ\" class=\"\" style=\"margin-left:calc(50% - 60px);\">\n                  </ul>\n                </form>\n                <form *ngIf=\"settingService.getLanguage()=='English'\"\n                #form2=\"ngForm\" (ngSubmit)=\"sendMessage(form2)\" ngNativeValidate>\n                  <ul>\n                    <li><input class=\"reg-input\" type=\"text\" name=\"name\" value=\"\" placeholder=\"Your name\" ngModel required></li>\n                    <li><input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" placeholder=\"Your e-mail address\" ngModel required></li>\n                    <li class=\"political-full-form\"><textarea name=\"message\" placeholder=\"Message\" ngModel required></textarea></li>\n                    <input type=\"submit\" value=\"Submit Now\" class=\"\" style=\"margin-left:calc(50% - 80px);\">\n                  </ul>\n                </form>\n\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"political-contact-map\"><div #gmap id=\"map\"></div></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    \n</div>"

/***/ }),

/***/ "./src/app/page-contact/page-contact.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var PageContactComponent = /** @class */ (function () {
    function PageContactComponent(pageService, settingService) {
        this.pageService = pageService;
        this.settingService = settingService;
    }
    PageContactComponent.prototype.ngOnInit = function () {
        var mapOption = {
            center: new google.maps.LatLng(13.719155, 100.582247),
            zoom: 7
        };
        var styleArray = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "hue": "#228ae6" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape.natural.terrain", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.government", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway.controlled_access", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit.station.bus", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit.station.rail", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#228ae6" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#228ae6" }] }];
        mapOption['options'] = {
            styles: styleArray
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOption);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(13.719155, 100.582247),
            map: this.map,
            title: 'Snazzy!'
        });
    };
    PageContactComponent.prototype.sendMessage = function (form) {
        console.log(form.value);
        form.resetForm();
    };
    __decorate([
        core_1.ViewChild('gmap'),
        __metadata("design:type", Object)
    ], PageContactComponent.prototype, "gmapElement", void 0);
    PageContactComponent = __decorate([
        core_1.Component({
            selector: 'app-page-contact',
            template: __webpack_require__("./src/app/page-contact/page-contact.component.html"),
            styles: [__webpack_require__("./src/app/page-contact/page-contact.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService])
    ], PageContactComponent);
    return PageContactComponent;
}());
exports.PageContactComponent = PageContactComponent;


/***/ }),

/***/ "./src/app/page-home/page-home.component.css":
/***/ (function(module, exports) {

module.exports = ".political-main-content {\r\n    padding: 120px 0px 40px 0px;\r\n}\r\n\r\n@media screen and (max-width:1200px) {\r\n    .political-main-content {\r\n        padding: 50px 0px 40px 0px;\r\n    }  \r\n}"

/***/ }),

/***/ "./src/app/page-home/page-home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-banner\">\n\t\t<div class=\"political-banner-layer\">\n\t\t\t  <span class=\"political-banner-transparent\"></span>\n\t\t\t  <img src=\"assets/img/bg/02.jpg\" alt=\"\" width=\"100%\" height=\"auto\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-5\">\n                    <div class=\"political-banner-thumb\">\n                        <figure><img src=\"extra-images/banner-thumb-img1.jpg\" alt=\"\"></figure>\n                        <div class=\"political-banner-thumb-text\" style=\"padding:15px 45px;\">\n                            <h2 style=\"line-height:35px; color:#ffffff;\">DPST Manager, a Choice for Smarter Future</h2>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"political-banner-caption\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 right\">\n                        <div class=\"political-banner-form\">\n\n                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai' && userinfoService.getUserinfo()===null\">\n                                <h1 style=\"line-height:55px;\">ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลของ พสวท.</h1>\n                                <h2>สมัครสมาชิกเพื่อเข้าใช้งาน: </h2>\n                                <form>\n                                    <ul>\n                                        <li><input type=\"text\" value=\"\" placeholder=\"ชื่อของคุณ\"></li>\n                                        <li><input type=\"email\" value=\"\" placeholder=\"E-mail adress ของคุณ\"></li>\n                                        <li><input type=\"submit\" value=\"สมัครสมาชิก\" (click)=\"pageService.setPage('Register')\"></li>\n                                    </ul>\n                                </form>\n                            </ng-container>\n                            <ng-container *ngIf=\"settingService.getLanguage()=='English' && userinfoService.getUserinfo()===null\">\n                                <h1 style=\"line-height:55px;\">Welcome to DPST Database Manager</h1>\n                                <h2>Register to our community: </h2>\n                                <form>\n                                    <ul>\n                                        <li><input type=\"text\" value=\"\" placeholder=\"Your name\"></li>\n                                        <li><input type=\"email\" value=\"\" placeholder=\"Your E-mail adress\"></li>\n                                        <li><input type=\"submit\" value=\"Register\" (click)=\"pageService.setPage('Register')\"></li>\n                                    </ul>\n                                </form>\n                            </ng-container>\n\n                            <!-- Log in welcome -->\n                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai' && userinfoService.getUserinfo()!==null\">\n                                <h1 style=\"line-height:55px;\">ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลของ พสวท.</h1>\n                            \n                            </ng-container>\n                            <ng-container *ngIf=\"settingService.getLanguage()=='English' && userinfoService.getUserinfo()!==null\">\n                                <h1 style=\"line-height:55px;\">Welcome to DPST Database Manager</h1>\n                                \n                            </ng-container>\n                        \n                      </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"political-main-content\" style=\"padding-bottom:0;\">\n\t\t<div class=\"political-main-section political-service-listfull\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <div class=\"political-service-list\">\n\n                      <ul *ngIf=\"settingService.getLanguage()=='Thai'\">\n                          <li>\n                              <i class=\"icon church-interface\"></i>\n                              <h3>เกี่ยวกับ Application</h3>\n                              <p>\n                                  This web application will help DPST to manage the data of DPST students and teachers\n                                  <strong>faster, easier, and efficiently</strong>.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-arrow2\"></i>\n                              <h3>เป้าหมาย</h3>\n                              <p>\n                                  We hope to help building the DPST community, \n                                  and this application can connect DPST people with others.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-eye\"></i>\n                              <h3>วิธีใช้งาน</h3>\n                              <p>\n                                  It is easy. You just need to register and \n                                  <strong style=\"cursor:pointer;\" (click)=\"pageService.setPage('Register')\">become a member</strong>.\n                              </p>\n                          </li>\n                      </ul>\n                      <ul *ngIf=\"settingService.getLanguage()=='English'\">\n                          <li>\n                              <i class=\"icon church-interface\"></i>\n                              <h3>About Application</h3>\n                              <p>\n                                  This web application will help DPST to manage the data of DPST students and teachers\n                                  <strong>faster, easier, and efficiently</strong>.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-arrow2\"></i>\n                              <h3>Mission</h3>\n                              <p>\n                                  We hope to help building the DPST community, \n                                  and this application can connect DPST people with others.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-eye\"></i>\n                              <h3>How to Use</h3>\n                              <p>\n                                  It is easy. You just need to register and \n                                  <strong style=\"cursor:pointer;\" (click)=\"pageService.setPage('Register')\">become a member</strong>.\n                              </p>\n                          </li>\n                      </ul>\n\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <figure class=\"political-service-add\">\n                    <video id=\"intro-video\" width=\"100%\" height=\"auto\" controls>\n                      <source src=\"assets/video/thebigdatasolution.com - sm.mp4\" type=\"video/mp4\">\n                    </video>\n                  </figure>\n                </div>\n            </div>\n        </div>\n\t\t</div>\n</div>"

/***/ }),

/***/ "./src/app/page-home/page-home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageHomeComponent = /** @class */ (function () {
    function PageHomeComponent(pageService, settingService, userinfoService) {
        this.pageService = pageService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
    }
    PageHomeComponent.prototype.ngOnInit = function () {
    };
    PageHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-page-home',
            template: __webpack_require__("./src/app/page-home/page-home.component.html"),
            styles: [__webpack_require__("./src/app/page-home/page-home.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService])
    ], PageHomeComponent);
    return PageHomeComponent;
}());
exports.PageHomeComponent = PageHomeComponent;


/***/ }),

/***/ "./src/app/page-login/page-login.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password] {\r\n    color: #000000;\r\n    font-size: 16px;\r\n}\r\n.reg-input {\r\n    height: 45px;\r\n    margin: 0;\r\n    padding-left: 15px;\r\n    width: 100%;\r\n}\r\n.input-label {\r\n    color: #000000;\r\n}\r\n.req {\r\n    color: red;\r\n}\r\n.error-message {\r\n    height: 30px;\r\n    color: red;\r\n    font-size: 14px;\r\n}\r\n.political-contact-form form ul li {\r\n    margin: 0 0 0 0;\r\n}\r\n.last-input {\r\n    color: #000000;\r\n    margin: 0 0 25px 0 !important;\r\n}\r\n.last-input a {\r\n    color: #228ae6;\r\n    font-weight: 600;\r\n}"

/***/ }),

/***/ "./src/app/page-login/page-login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n    \n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2 *ngIf=\"settingService.getLanguage()=='Thai'\">เข้าสู่ระบบ</h2>\n            <h2 *ngIf=\"settingService.getLanguage()=='English'\">Log In</h2>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-3\"></div>\n        \n        <div class=\"col-md-6\">\n          <div class=\"political-contact-form\">\n            \n            <form *ngIf=\"settingService.getLanguage()=='Thai'\"\n            #login1=\"ngForm\" (ngSubmit)=\"memberLogIn(login1)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">ชื่อผู้ใช้งาน</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">รหัสผ่าน</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"loginFail\">* ชื่อผู้ใช้งานหรือรหัสผ่านผิด</span></div>\n                </li>\n                <li class=\"last-input\">\n                  <input name=\"rememberme\" type=\"checkbox\" ngModel> จำฉันไว้ในระบบ\n                </li>\n                <li class=\"last-input\" style=\"text-align:right;\">\n                  ลืม <a (click)=\"pageService.setPage('Forgot username')\">ชื่อผู้ใช้งาน</a> / \n                  <a (click)=\"pageService.setPage('Forgot password')\">รหัสผ่าน</a>\n                </li>\n                <input type=\"submit\" value=\"เข้าสู่ระบบ\" class=\"\" style=\"margin-left:calc(50% - 64px);\">\n              </ul>\n            </form>\n\n            <form *ngIf=\"settingService.getLanguage()=='English'\"\n            #login2=\"ngForm\" (ngSubmit)=\"memberLogIn(login2)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">Username</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">Password</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"loginFail\">* Wrong username or password</span></div>\n                </li>\n                <li class=\"last-input\">\n                  <input name=\"rememberme\" type=\"checkbox\" ngModel> Remember me\n                </li>\n                <li class=\"last-input\" style=\"text-align:right;\">\n                  Forgot <a (click)=\"pageService.setPage('Forgot username')\">username</a> / \n                  <a (click)=\"pageService.setPage('Forgot password')\">password</a> ?\n                </li>\n                <input type=\"submit\" value=\"Log In\" class=\"\" style=\"margin-left:calc(50% - 42px);\">\n              </ul>\n            </form>\n\n          </div>\n        </div>\n        \n      </div>\n    </div>\n    \n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page-login/page-login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var PageLoginComponent = /** @class */ (function () {
    function PageLoginComponent(socketioService, pageService, settingService, authService, userinfoService, cookieService) {
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.settingService = settingService;
        this.authService = authService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
        this.loginFail = false;
    }
    PageLoginComponent.prototype.ngOnInit = function () {
    };
    PageLoginComponent.prototype.memberLogIn = function (form) {
        var _this = this;
        this.authService.login(form.value)
            .then(function (result) {
            if (result.status) {
                if (form.value.rememberme == true)
                    _this.cookieService.setUserLoginCookie(result.data);
                else
                    _this.cookieService.clearUserLoginCookie();
                _this.loginFail = false;
                _this.loginSuccess(result.data);
                form.resetForm();
            }
            else {
                _this.loginFail = true;
            }
        });
    };
    PageLoginComponent.prototype.loginSuccess = function (userInfo) {
        this.socketioService.login(userInfo.username);
        this.userinfoService.setUserinfo(userInfo);
        this.pageService.setPage('Homepage');
    };
    PageLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-page-login',
            template: __webpack_require__("./src/app/page-login/page-login.component.html"),
            styles: [__webpack_require__("./src/app/page-login/page-login.component.css")]
        }),
        __metadata("design:paramtypes", [socketio_service_1.SocketioService,
            page_service_1.PageService,
            setting_service_1.SettingService,
            authentication_service_1.AuthenticationService,
            userinfo_service_1.UserinfoService,
            cookie_service_1.CookieService])
    ], PageLoginComponent);
    return PageLoginComponent;
}());
exports.PageLoginComponent = PageLoginComponent;


/***/ }),

/***/ "./src/app/page-register/page-register.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password] {\r\n    color: #000000;\r\n    font-size: 16px;\r\n}\r\n.reg-input {\r\n    height: 45px;\r\n    margin: 0;\r\n    padding-left: 15px;\r\n    width: 100%;\r\n}\r\n.input-label {\r\n    color: #000000;\r\n}\r\n.req {\r\n    color: red;\r\n}\r\n.error-message {\r\n    height: 30px;\r\n    color: red;\r\n    font-size: 14px;\r\n}"

/***/ }),

/***/ "./src/app/page-register/page-register.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2 *ngIf=\"settingService.getLanguage()=='Thai'\">สมัครสมาชิก</h2>\n            <h2 *ngIf=\"settingService.getLanguage()=='English'\">Register</h2>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-3\"></div>\n        \n        <div class=\"col-md-6\">\n          <div class=\"political-contact-form\">\n            \n            <form *ngIf=\"settingService.getLanguage()=='Thai'\"\n            #register1=\"ngForm\" (ngSubmit)=\"registerMember(register1)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">ชื่อจริง</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"firstname\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">นามสกุล</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"lastname\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">ชื่อผู้ใช้งาน (ใช้ในการเข้าสู่ระบบ)</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"usernameInUse\">* ชื่อผู้ใช้งานนี้ได้ถูกใช้งานเเล้ว</span></div>\n                </li>\n                <li><div class=\"input-label\">E-mail address</div>\n                  <input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"emailInUse\">* E-mail นี้ได้ถูกใช้งานเเล้ว</span></div>\n                </li>\n                <li><div class=\"input-label\">รหัสผ่าน (อย่างต่ำ 5 ตัวอักษร)</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div *ngIf=\"passTooShort\" class=\"error-message\">* รหัสผ่านสั้นเกินไป</div>\n                </li>\n                <li><div class=\"input-label\">ยืนยันรหัสผ่าน</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"confirmPassword\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"passNotMatch\">* รหัสผ่านไม่ตรงกัน</span></div>\n                </li>\n                <input type=\"submit\" value=\"สมัครสมาชิก\" class=\"\" style=\"margin-left:calc(50% - 81px);\">\n              </ul>\n            </form>\n\n            <form *ngIf=\"settingService.getLanguage()=='English'\"\n            #register2=\"ngForm\" (ngSubmit)=\"registerMember(register2)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">Firstname</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"firstname\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">Lastname</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"lastname\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">Username (use for logging in)</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"usernameInUse\">* Username is already in use</span></div>\n                </li>\n                <li><div class=\"input-label\">E-mail address</div>\n                  <input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"emailInUse\">* E-mail is already in use</span></div>\n                </li>\n                <li><div class=\"input-label\">Password (5 letters minimum)</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div *ngIf=\"passTooShort\" class=\"error-message\">* Password is too short</div>\n                </li>\n                <li><div class=\"input-label\">Confirm password</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"confirmPassword\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"passNotMatch\">* Password does not match</span></div>\n                </li>\n                <input type=\"submit\" value=\"สมัครสมาชิก\" class=\"\" style=\"margin-left:calc(50% - 81px);\">\n              </ul>\n            </form>\n\n          </div>\n        </div>\n        \n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page-register/page-register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var PageRegisterComponent = /** @class */ (function () {
    function PageRegisterComponent(socketioService, pageService, settingService, authService, userinfoService, cookieService) {
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.settingService = settingService;
        this.authService = authService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
        this.passNotMatch = false;
        this.passTooShort = false;
        this.usernameInUse = false;
        this.emailInUse = false;
    }
    PageRegisterComponent.prototype.ngOnInit = function () {
    };
    PageRegisterComponent.prototype.registerMember = function (form) {
        var _this = this;
        if (form.value.password != form.value.confirmPassword) {
            this.passNotMatch = true;
            this.passTooShort = false;
            this.usernameInUse = false;
            this.emailInUse = false;
        }
        else {
            this.authService.register(form.value)
                .then(function (response) {
                if (response.status) {
                    _this.registerSuccess(form.value);
                    form.resetForm();
                    _this.passNotMatch = false;
                    _this.passTooShort = false;
                    _this.usernameInUse = false;
                    _this.emailInUse = false;
                }
                else {
                    if (response.data == 0) {
                        _this.passNotMatch = false;
                        _this.passTooShort = true;
                        _this.usernameInUse = false;
                        _this.emailInUse = false;
                    }
                    else if (response.data == -1) {
                        _this.passNotMatch = false;
                        _this.passTooShort = false;
                        _this.usernameInUse = true;
                        _this.emailInUse = false;
                    }
                    else if (response.data == -2) {
                        _this.passNotMatch = false;
                        _this.passTooShort = false;
                        _this.usernameInUse = false;
                        _this.emailInUse = true;
                    }
                }
            });
        }
    };
    PageRegisterComponent.prototype.registerSuccess = function (formValue) {
        var _this = this;
        this.socketioService.newMember(formValue.username);
        this.authService.login(formValue)
            .then(function (result) {
            _this.socketioService.login(result.data.username);
            _this.userinfoService.setUserinfo(result.data);
            _this.pageService.setPage('Check status');
            _this.cookieService.setUserLoginCookie(result.data);
        });
    };
    PageRegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-page-register',
            template: __webpack_require__("./src/app/page-register/page-register.component.html"),
            styles: [__webpack_require__("./src/app/page-register/page-register.component.css")]
        }),
        __metadata("design:paramtypes", [socketio_service_1.SocketioService,
            page_service_1.PageService,
            setting_service_1.SettingService,
            authentication_service_1.AuthenticationService,
            userinfo_service_1.UserinfoService,
            cookie_service_1.CookieService])
    ], PageRegisterComponent);
    return PageRegisterComponent;
}());
exports.PageRegisterComponent = PageRegisterComponent;


/***/ }),

/***/ "./src/app/services/admin.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var globals_1 = __webpack_require__("./src/app/globals.ts");
var Subject_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.apiUrl = globals_1.ipHost + '/admin';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.subjectUsers = new Subject_1.Subject();
    }
    AdminService.prototype.getUsers = function (criteria) {
        var _this = this;
        var url = this.apiUrl + '/getusers/' + criteria.start + '/' + criteria.limit + '/'
            + criteria.sort + '/' + criteria.search;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            _this.subjectUsers.next(result);
        })
            .catch(function (err) {
            _this.subjectUsers.next(err);
        });
    };
    AdminService.prototype.setAccoundStatus = function (userinfo, status) {
        var url = this.apiUrl + '/setaccountstatus', input = { userId: userinfo._id, status: status };
        return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    AdminService.prototype.deleteAccount = function (userinfo) {
        var url = this.apiUrl + '/deleteaccount', input = { userId: userinfo._id };
        return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    // Observable
    AdminService.prototype.observeUsers = function () {
        return this.subjectUsers.asObservable();
    };
    AdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;


/***/ }),

/***/ "./src/app/services/authentication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var globals_1 = __webpack_require__("./src/app/globals.ts");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.apiUrl = globals_1.ipHost + '/authentication';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AuthenticationService.prototype.register = function (formValue) {
        var url = this.apiUrl + '/register', input = formValue;
        return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    AuthenticationService.prototype.login = function (formValue) {
        var url = this.apiUrl + '/login/' + formValue.username + '/' + formValue.password;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    AuthenticationService.prototype.loginWithCookie = function (cookie) {
        var url = this.apiUrl + '/loginwithcookie/' + cookie.username + '/' + cookie._id;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ "./src/app/services/cookie.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var globals_1 = __webpack_require__("./src/app/globals.ts");
var CookieService = /** @class */ (function () {
    function CookieService(http) {
        this.http = http;
        this.apiUrl = globals_1.ipHost + '/cookie';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    CookieService.prototype.checkRememberLogin = function () {
        var url = this.apiUrl + '/checkrememberlogin';
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    CookieService.prototype.setUserLoginCookie = function (userinfo) {
        var url = this.apiUrl + '/setlogincookie/' + userinfo.username + '/' + userinfo._id;
        this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    CookieService.prototype.clearUserLoginCookie = function () {
        var url = this.apiUrl + '/clearlogincookie';
        this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    CookieService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CookieService);
    return CookieService;
}());
exports.CookieService = CookieService;


/***/ }),

/***/ "./src/app/services/page.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var PageService = /** @class */ (function () {
    function PageService() {
        this.page = 'Homepage';
        this.subpage = '';
    }
    PageService.prototype.setPage = function (page) {
        this.page = page;
        this.subpage = '';
    };
    PageService.prototype.getPage = function () { return this.page; };
    PageService.prototype.setSubpage = function (subpage) { this.subpage = subpage; };
    PageService.prototype.getSubpage = function () { return this.subpage; };
    PageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PageService);
    return PageService;
}());
exports.PageService = PageService;


/***/ }),

/***/ "./src/app/services/setting.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var SettingService = /** @class */ (function () {
    function SettingService() {
        this.language = 'Thai'; // Thai or English
    }
    SettingService.prototype.setLanguage = function (language) { this.language = language; };
    SettingService.prototype.getLanguage = function () { return this.language; };
    SettingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SettingService);
    return SettingService;
}());
exports.SettingService = SettingService;


/***/ }),

/***/ "./src/app/services/socketio.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var io = __webpack_require__("./node_modules/socket.io-client/lib/index.js");
var globals_1 = __webpack_require__("./node_modules/globals/index.js");
// import { AdminService } from './admin.service';
var SocketioService = /** @class */ (function () {
    function SocketioService() {
        this.socket = io(globals_1.ipHost);
    }
    SocketioService.prototype.connect = function () {
        this.socket.on('online-users', function (onlineUsers) {
            this.onlineUsers = onlineUsers;
        }.bind(this));
        this.socket.emit('get-online-users');
    };
    SocketioService.prototype.getSocket = function () { return this.socket; };
    SocketioService.prototype.getOnlineUsers = function () { return this.onlineUsers; };
    SocketioService.prototype.newMember = function (username) {
        this.socket.emit('new-member', username);
    };
    SocketioService.prototype.login = function (username) {
        this.socket.emit('member-login', username);
    };
    SocketioService.prototype.logout = function () {
        this.socket.emit('member-logout');
    };
    SocketioService.prototype.accountStatus = function (userId) {
        this.socket.emit('account-status', userId);
    };
    SocketioService.prototype.deleteAccount = function (userId) {
        this.socket.emit('account-delete', userId);
    };
    SocketioService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SocketioService);
    return SocketioService;
}());
exports.SocketioService = SocketioService;


/***/ }),

/***/ "./src/app/services/userinfo.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var globals_1 = __webpack_require__("./src/app/globals.ts");
var UserinfoService = /** @class */ (function () {
    function UserinfoService(http) {
        this.http = http;
        this.userinfo = null;
        this.apiUrl = globals_1.ipHost + '/user';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserinfoService.prototype.setUserinfo = function (userinfo) { this.userinfo = userinfo; };
    UserinfoService.prototype.getUserinfo = function () { return this.userinfo; };
    UserinfoService.prototype.update = function () {
        var _this = this;
        var url = this.apiUrl + '/update/' + this.userinfo._id;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            _this.userinfo = result.data;
        })
            .catch(function (err) {
            _this.userinfo = null;
        });
    };
    UserinfoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserinfoService);
    return UserinfoService;
}());
exports.UserinfoService = UserinfoService;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map