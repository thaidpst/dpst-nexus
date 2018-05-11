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

module.exports = "<div class=\"political-main-wrapper\">\n\n  <app-header-navbar></app-header-navbar>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Homepage'\">\n    <app-page-home></app-page-home>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Log in'\">\n    <app-page-login></app-page-login>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Register'\">\n    <app-page-register></app-page-register>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Contact'\">\n    <app-page-contact></app-page-contact>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Check status'\">\n    <app-page-check-status></app-page-check-status>\n  </ng-container>\n\n  <ng-container *ngIf=\"pageService.getPage()=='Forms'\">\n    <app-page-gov-forms></app-page-gov-forms>\n  </ng-container>\n\n  <!-- User panel -->\n  <ng-container *ngIf=\"pageService.getPage()=='User panel' && userinfoService.getUserinfo()!==null\">\n    <app-page-user-panel></app-page-user-panel>\n  </ng-container>\n\n  <!-- Admin panel -->\n  <ng-container *ngIf=\"pageService.getPage()=='Admin panel' && userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().level>=7\">\n    <app-page-admin-panel></app-page-admin-panel>\n  </ng-container>\n\n  <!-- Government form filling -->\n  <ng-container *ngIf=\"pageService.getPage()=='Government form'\">\n    <app-gov-forms></app-gov-forms>\n  </ng-container>\n  \n  <!-- <div>{{socketioService.getOnlineUsers()}}</div> -->  \n</div>\n\n<app-footer></app-footer>\n"

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
        // Get announcement from Socket.io
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
        this.socketioService.getSocket().on('announce-account-privilage', function (userId) {
            if (this.userinfoService.getUserinfo() !== null && userId == this.userinfoService.getUserinfo()._id) {
                this.userinfoService.update();
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
var language_service_1 = __webpack_require__("./src/app/languages/language.service.ts");
var form_service_1 = __webpack_require__("./src/app/services/form.service.ts");
// Pipes
var translate_pipe_1 = __webpack_require__("./src/app/languages/translate.pipe.ts");
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
var page_user_panel_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-panel.component.ts");
var page_user_profile_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-profile/page-user-profile.component.ts");
var page_user_edit_profile_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.ts");
var page_user_setting_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.ts");
var page_user_history_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.ts");
var profile_form_component_1 = __webpack_require__("./src/app/forms/profile-form/profile-form.component.ts");
var profile_edit_form_component_1 = __webpack_require__("./src/app/forms/profile-edit-form/profile-edit-form.component.ts");
var admin_privilage_setting_form_component_1 = __webpack_require__("./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.ts");
var page_gov_forms_component_1 = __webpack_require__("./src/app/page-gov-forms/page-gov-forms.component.ts");
var gov_form1_component_1 = __webpack_require__("./src/app/gov-forms/gov-form1/gov-form1.component.ts");
var gov_forms_component_1 = __webpack_require__("./src/app/gov-forms/gov-forms.component.ts");
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
                page_admin_email_blast_component_1.PageAdminEmailBlastComponent,
                page_user_panel_component_1.PageUserPanelComponent,
                page_user_profile_component_1.PageUserProfileComponent,
                page_user_edit_profile_component_1.PageUserEditProfileComponent,
                page_user_setting_component_1.PageUserSettingComponent,
                page_user_history_component_1.PageUserHistoryComponent,
                profile_form_component_1.ProfileFormComponent,
                profile_edit_form_component_1.ProfileEditFormComponent,
                admin_privilage_setting_form_component_1.AdminPrivilageSettingFormComponent,
                translate_pipe_1.TranslatePipe,
                page_gov_forms_component_1.PageGovFormsComponent,
                gov_form1_component_1.GovForm1Component,
                gov_forms_component_1.GovFormsComponent
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
                cookie_service_1.CookieService,
                language_service_1.LanguageService,
                form_service_1.FormService
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

/***/ "./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.css":
/***/ (function(module, exports) {

module.exports = ".political-team-list-wrap .political-team-info > li {border:none;}\r\n\r\nul {list-style-type:none;}\r\n\r\n::-webkit-input-placeholder {color:#b9b9b9;}\r\n\r\n:-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::placeholder {color:#b9b9b9;}\r\n\r\n:-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n.profile-input {\r\n    background: #ffffff; \r\n    border: 1px solid #a3a3a3; \r\n    width: 55%; \r\n    margin-left: 5px;\r\n}\r\n\r\n.profile-input[type=text] {color:#000000;}\r\n\r\nli.submit-li {width:100% !important; text-align:center; margin-top:20px;}\r\n\r\nselect {\r\n    width: calc(55% + 32px);\r\n    padding: 2px 12px;\r\n    height: 32px;\r\n    margin-left: 5px;\r\n    color: #000000;\r\n    background: #ffffff;\r\n    border: 1px solid #a3a3a3; \r\n}\r\n\r\n@media (max-width: 767px) {\r\n    .full-view-panel {width:100%;}\r\n}\r\n"

/***/ }),

/***/ "./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"!restricted()\" class=\"political-team political-team-list\">\n  <form #editAdmin=\"ngForm\" (ngSubmit)=\"editAdminPrivilage(editAdmin)\" ngNativeValidate>\n    <ul class=\"row\">\n      <li class=\"col-md-12 full-view-panel\">\n        <div class=\"political-team-list-wrap\">\n\n          <h1><strong>Admin Privilage Setting</strong></h1>\n          <h3 style=\"margin-bottom:25px;\">Username:\n            <strong><span class=\"hello-user\">{{userinfo.username}}</span></strong>\n          </h3>\n          \n          <div class=\"political-team-list-text\">\n            <ul class=\"political-team-info\">\n              <li><strong>Firstname:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"firstname\" [ngModel]=\"defaultValue(userinfo.firstname)\" placeholder=\"Firstname\" ngModel required></li>\n              <li><strong>Lastname:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"lastname\" [ngModel]=\"defaultValue(userinfo.lastname)\" placeholder=\"Lastname\" ngModel required></li>\n              <li><strong>E-mail:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"email\" [ngModel]=\"defaultValue(userinfo.email)\" placeholder=\"Your e-mail address\" ngModel required\n                style=\"width:calc(55% + 28px);\"></li>\n              <li><strong>Level:</strong>\n                <ng-container *ngIf=\"selfAccount\">{{levels[10 - userinfo.level].desc}}</ng-container>\n                <select *ngIf=\"!selfAccount\" name=\"level\" [(ngModel)]=\"levelSelection\" required>\n                  <option *ngFor=\"let level of possibleLevel;\" [value]=\"level.value\">{{level.desc}}</option>\n                </select>              \n              <li class=\"submit-li\">\n                <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn\" type=\"submit\" value=\"เเก้ไขการเข้าถึง\">\n                <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn\" type=\"submit\" value=\"Update privilage\">\n              </li>\n            </ul>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </form>\n</div>\n\n<div *ngIf=\"restricted()\" class=\"political-team political-team-list\">\n  <ul class=\"row\">\n    <li class=\"col-md-12 full-view-panel\">\n      <div class=\"political-team-list-wrap\">\n\n        <h1><strong>Admin Privilage</strong></h1>\n        <h3 style=\"margin-bottom:25px;\">Username:\n          <strong><span class=\"hello-user\">{{userinfo.username}}</span></strong>\n        </h3>\n        \n        <div class=\"political-team-list-text\">\n          <ul class=\"political-team-info\">\n            <li><strong>Firstname:</strong> {{userinfo.firstname}}</li>\n            <li><strong>Lastname:</strong> {{userinfo.lastname}}</li>\n            <li><strong>E-mail:</strong> {{userinfo.email}}</li>\n            <li><strong>Level:</strong> {{levels[10 - userinfo.level].desc}}</li>\n          </ul>\n        </div>\n      </div>\n    </li>\n  </ul>\n</div>"

/***/ }),

/***/ "./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.ts":
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
var admin_service_1 = __webpack_require__("./src/app/services/admin.service.ts");
var AdminPrivilageSettingFormComponent = /** @class */ (function () {
    function AdminPrivilageSettingFormComponent(settingService, userinfoService, adminService) {
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.adminService = adminService;
        this.userinfoUpdated = new core_1.EventEmitter();
        this.selfAccount = false;
        this.levels = [
            { value: 10, desc: '10 - Owner' },
            { value: 9, desc: '9 - Admin' },
            { value: 8, desc: '8 - Manager' },
            { value: 7, desc: '7 - Author' },
            { value: 6, desc: '6 - Contributor' },
            { value: 5, desc: '5 - Moderator' },
            { value: 4, desc: '4 - DPST. senior member' },
            { value: 3, desc: '3 - DPST. member' },
            { value: 2, desc: '2 - Member' },
            { value: 1, desc: '1 - User' }
        ];
    }
    AdminPrivilageSettingFormComponent.prototype.ngOnInit = function () {
        this.levelSelection = this.userinfo.level;
        this.possibleLevel = [];
        var copy = Object.assign({}, this.userinfoService.getUserinfo()), limit = copy.level;
        this.selfAccount = this.userinfo.userId == copy._id;
        for (var i = 0; i < this.levels.length; i++) {
            if (this.levels[i].value < limit)
                this.possibleLevel.push(this.levels[i]);
        }
    };
    AdminPrivilageSettingFormComponent.prototype.defaultValue = function (value) {
        if (value === undefined)
            return '';
        else
            return value;
    };
    AdminPrivilageSettingFormComponent.prototype.restricted = function () {
        if (this.userinfoService.getUserinfo() === null || this.userinfo === undefined)
            return true;
        else if (this.userinfo.userId == this.userinfoService.getUserinfo()._id)
            return false;
        else if (this.userinfo.level < this.userinfoService.getUserinfo().level)
            return false;
        else
            return true;
    };
    AdminPrivilageSettingFormComponent.prototype.editAdminPrivilage = function (form) {
        var _this = this;
        if (this.selfAccount)
            form.value.level = this.userinfo.level;
        var copy = Object.assign({}, this.userinfo), userId = copy.userId, updatedUserinfo = form.value;
        this.adminService.updateUserPrivilage(userId, updatedUserinfo)
            .then(function (result) {
            _this.userinfoUpdated.emit(result);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AdminPrivilageSettingFormComponent.prototype, "userinfo", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AdminPrivilageSettingFormComponent.prototype, "userinfoUpdated", void 0);
    AdminPrivilageSettingFormComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-privilage-setting-form',
            template: __webpack_require__("./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.html"),
            styles: [__webpack_require__("./src/app/forms/admin-privilage-setting-form/admin-privilage-setting-form.component.css")]
        }),
        __metadata("design:paramtypes", [setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            admin_service_1.AdminService])
    ], AdminPrivilageSettingFormComponent);
    return AdminPrivilageSettingFormComponent;
}());
exports.AdminPrivilageSettingFormComponent = AdminPrivilageSettingFormComponent;


/***/ }),

/***/ "./src/app/forms/profile-edit-form/profile-edit-form.component.css":
/***/ (function(module, exports) {

module.exports = ".political-team-list-wrap .political-team-info > li {width:100%;}\r\n\r\nul {list-style-type:none;}\r\n\r\n::-webkit-input-placeholder {color:#b9b9b9;}\r\n\r\n:-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::placeholder {color:#b9b9b9;}\r\n\r\n:-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n::-ms-input-placeholder {color:#b9b9b9;}\r\n\r\n.profile-input {\r\n    background: #ffffff; \r\n    border: 1px solid #a3a3a3; \r\n    width: 55%; \r\n    margin-left: 5px;\r\n}\r\n\r\n.profile-input-en {\r\n    background: #ffffff; \r\n    border: 1px solid #a3a3a3; \r\n    width: 45%; \r\n    margin-left: 5px;\r\n}\r\n\r\n.profile-input[type=text] {color:#000000;}\r\n\r\n.profile-about {width:100%; height:80px; color:#000000;}\r\n\r\n.profile-ad1, .profile-ad2 {margin:3px 0;}\r\n\r\n.profile-ad1 {width:100%;}\r\n\r\n.profile-ad2 {width:calc(50% - 2.5px);}\r\n\r\n@media (max-width: 767px) {\r\n    .full-view-panel {width:100%;}\r\n}\r\n"

/***/ }),

/***/ "./src/app/forms/profile-edit-form/profile-edit-form.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-team political-team-list\">\n  <form #editProfile1=\"ngForm\" (ngSubmit)=\"editProfileDetail(editProfile1)\">\n    <ul class=\"row\">\n      <li class=\"col-md-12 full-view-panel\">\n        <div class=\"political-team-list-wrap\">\n          <figure><img [src]=\"userProfileImage()\" alt=\"Profile image not available\"></figure>\n          <div class=\"political-team-list-text\">\n            <h2 style=\"margin-bottom:15px;\">{{userDetail.firstname}} {{userDetail.lastname}}</h2>\n            <span style=\"width:100%;\">ตำเเหน่ง: \n              <input class=\"profile-input\" type=\"text\" name=\"position\" [ngModel]=\"defaultValue(userDetail.position)\" placeholder=\"ตำแหน่งของคุณ\" ngModel\n              style=\"width:calc(55% + 58px);\"></span>\n            <p style=\"float:none; margin:5px 0 10px 0;\">\n              <textarea class=\"profile-input profile-about\" name=\"about\" [ngModel]=\"defaultValue(userDetail.about)\" placeholder=\"เกี่ยวกับคุณ\" ngModel></textarea>\n            </p>\n            <ul class=\"political-team-info\">\n              <li><i class=\"fa fa-globe\"></i><strong>พสวท. รุ่นที่</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"dpstYear\" [ngModel]=\"defaultValue(userDetail.dpstYear)\" placeholder=\"รุ่นของคุณ\" ngModel\n                style=\"width:calc(55% + 28px);\"></li>\n              <li><i class=\"fa fa-graduation-cap\"></i><strong>ระดับการศึกษา:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"education\" [ngModel]=\"defaultValue(userDetail.education)\" placeholder=\"ระดับการศึกษาของคุณ\" ngModel></li>\n              <li><i class=\"fa fa-ravelry\"></i><strong>สาขาวิชา:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"major\" [ngModel]=\"defaultValue(userDetail.mojor)\" placeholder=\"สาขาวิชาของคุณ\" ngModel\n                style=\"width:calc(55% + 37px);\"></li>\n              <li><i class=\"fa fa-book\"></i><strong>สถานศีกษา:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"school\" [ngModel]=\"defaultValue(userDetail.school)\" placeholder=\"สถานศีกษาของคุณ\" ngModel\n                style=\"width:calc(55% + 24px);\"></li>\n              <li><i class=\"fa fa-briefcase\"></i><strong>สถานที่ทำงาน:</strong> \n                <input class=\"profile-input\" type=\"text\" name=\"workplace\" [ngModel]=\"defaultValue(userDetail.workplace)\" placeholder=\"สถานที่ทำงานของคุณ\" ngModel\n                style=\"width:calc(55% + 6px);\"></li>\n              <li><i class=\"fa fa-envelope\"></i><strong>E-mail:</strong> <a [href]=\"'mailto:'+userDetail.email\">{{userDetail.email}}</a></li>\n              <li><i class=\"fa fa-phone\"></i><strong>โทรศัพท์:</strong> \n                <input class=\"profile-input\" type=\"text\" name=\"phone\" [ngModel]=\"defaultValue(userDetail.phone)\" placeholder=\"เบอร์โทรศัพท์ของคุณ\" ngModel\n                style=\"width:calc(55% + 44px);\"></li>\n              <li><i class=\"fa fa-comments\"></i><strong>Line id:</strong>\n                <input class=\"profile-input\" type=\"text\" name=\"lineId\" [ngModel]=\"defaultValue(userDetail.lineId)\" placeholder=\"Line id ของคุณ\" ngModel\n                style=\"width:calc(55% + 56px);\"></li>\n              <li><i class=\"fa fa-home\"></i><strong>ที่อยู่:</strong>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address1\" [ngModel]=\"defaultValue(userDetail.address1)\" placeholder=\"ที่อยู่ของคุณ\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address2\" [ngModel]=\"defaultValue(userDetail.address2)\" placeholder=\"ที่อยู่ของคุณบรรทัดที่ 2\" ngModel>\n                <br><input class=\"profile-input profile-ad2\" type=\"text\" name=\"province\" [ngModel]=\"defaultValue(userDetail.province)\" placeholder=\"จังหวัด\" ngModel> \n                <input class=\"profile-input profile-ad2\" type=\"text\" name=\"zip\" [ngModel]=\"defaultValue(userDetail.zip)\" placeholder=\"รหัสไปรษณีย์\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"country\" [ngModel]=\"defaultValue(userDetail.country)\" placeholder=\"ประเทศ\" ngModel>\n              </li>\n              <li>\n                <input class=\"political-simple-btn\" type=\"submit\" value=\"เเก้ไขประวัติส่วนตัว\">\n              </li>\n            </ul>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </form>\n</div>\n\n<div *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-team political-team-list\">\n  <form #editProfile2=\"ngForm\" (ngSubmit)=\"editProfileDetail(editProfile2)\">\n    <ul class=\"row\">\n      <li class=\"col-md-12 full-view-panel\">\n        <div class=\"political-team-list-wrap\">\n          <figure><img [src]=\"userProfileImage()\" alt=\"Profile image not available\"></figure>\n          <div class=\"political-team-list-text\">\n            <h2 style=\"margin-bottom:15px;\">{{userDetail.firstname}} {{userDetail.lastname}}</h2>\n            <span style=\"width:100%;\">Position: \n              <input class=\"profile-input-en\" type=\"text\" name=\"position\" [ngModel]=\"defaultValue(userDetail.position)\" placeholder=\"Your position\" ngModel\n              style=\"width:calc(45% + 86px);\"></span>\n            <p style=\"float:none; margin:5px 0 10px 0;\">\n              <textarea class=\"profile-input profile-about\" name=\"about\" [ngModel]=\"defaultValue(userDetail.about)\" placeholder=\"About you\" ngModel></textarea>\n            </p>\n            <ul class=\"political-team-info\">\n              <li><i class=\"fa fa-globe\"></i><strong>DPST. #</strong>\n                <input class=\"profile-input-en\" type=\"text\" name=\"dpstYear\" [ngModel]=\"defaultValue(userDetail.dpstYear)\" placeholder=\"Your DPST. #\" ngModel\n                style=\"width:calc(45% + 78px);\"></li>\n              <li><i class=\"fa fa-graduation-cap\"></i><strong>Education:</strong>\n                <input class=\"profile-input-en\" type=\"text\" name=\"education\" [ngModel]=\"defaultValue(userDetail.education)\" placeholder=\"Your education\" ngModel\n                style=\"width:calc(45% + 55px);\"></li>\n              <li><i class=\"fa fa-ravelry\"></i><strong>Major:</strong>\n                <input class=\"profile-input-en\" type=\"text\" name=\"major\" [ngModel]=\"defaultValue(userDetail.mojor)\" placeholder=\"Your field of study\" ngModel\n                style=\"width:calc(45% + 87px);\"></li>\n              <li><i class=\"fa fa-book\"></i><strong>School/University:</strong>\n                <input class=\"profile-input-en\" type=\"text\" name=\"school\" [ngModel]=\"defaultValue(userDetail.school)\" placeholder=\"Your school/university\" ngModel></li>\n              <li><i class=\"fa fa-briefcase\"></i><strong>Work place:</strong> \n                <input class=\"profile-input-en\" type=\"text\" name=\"workplace\" [ngModel]=\"defaultValue(userDetail.workplace)\" placeholder=\"Your work place\" ngModel\n                style=\"width:calc(45% + 46px);\"></li>\n              <li><i class=\"fa fa-envelope\"></i><strong>E-mail:</strong> <a [href]=\"'mailto:'+userDetail.email\">{{userDetail.email}}</a></li>\n              <li><i class=\"fa fa-phone\"></i><strong>Phone:</strong> \n                <input class=\"profile-input-en\" type=\"text\" name=\"phone\" [ngModel]=\"defaultValue(userDetail.phone)\" placeholder=\"Your telephone number\" ngModel\n                style=\"width:calc(45% + 79px);\"></li>\n              <li><i class=\"fa fa-comments\"></i><strong>Line id:</strong>\n                <input class=\"profile-input-en\" type=\"text\" name=\"lineId\" [ngModel]=\"defaultValue(userDetail.lineId)\" placeholder=\"Your Line id\" ngModel\n                style=\"width:calc(45% + 77px);\"></li>\n              <li><i class=\"fa fa-home\"></i><strong>Address:</strong>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address1\" [ngModel]=\"defaultValue(userDetail.address1)\" placeholder=\"Your address\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address2\" [ngModel]=\"defaultValue(userDetail.address2)\" placeholder=\"Your adress line 2\" ngModel>\n                <br><input class=\"profile-input profile-ad2\" type=\"text\" name=\"province\" [ngModel]=\"defaultValue(userDetail.province)\" placeholder=\"Province/State\" ngModel> \n                <input class=\"profile-input profile-ad2\" type=\"text\" name=\"zip\" [ngModel]=\"defaultValue(userDetail.zip)\" placeholder=\"ZIP code\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"country\" [ngModel]=\"defaultValue(userDetail.country)\" placeholder=\"Country\" ngModel>\n              </li>\n              <li>\n                <input class=\"political-simple-btn\" type=\"submit\" value=\"Update your profile\">\n              </li>\n            </ul>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/forms/profile-edit-form/profile-edit-form.component.ts":
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
var ProfileEditFormComponent = /** @class */ (function () {
    function ProfileEditFormComponent(settingService, userinfoService) {
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.userDetailUpdated = new core_1.EventEmitter();
    }
    ProfileEditFormComponent.prototype.ngOnInit = function () {
    };
    ProfileEditFormComponent.prototype.viewUserPosition = function () {
        if (this.userDetail.position === undefined)
            return 'N/A';
        else
            return this.userDetail.position;
    };
    ProfileEditFormComponent.prototype.viewUserAbout = function () {
        if (this.userDetail.about === undefined)
            return 'N/A';
        else
            return this.userDetail.about;
    };
    ProfileEditFormComponent.prototype.defaultValue = function (value) {
        if (value === undefined)
            return '';
        else
            return value;
    };
    ProfileEditFormComponent.prototype.userProfileImage = function () {
        if (this.userDetail.profileUrl === undefined || this.userDetail.profileUrl === null || this.userDetail.profileUrl == '')
            return 'assets/img/profile/base.jpg';
        else
            return this.userDetail.profileUrl;
    };
    ProfileEditFormComponent.prototype.editProfileDetail = function (form) {
        var _this = this;
        var keys = Object.keys(form.value), updatedUserDetail = {};
        for (var i = 0; i < keys.length; i++) {
            if (form.value[keys[i]] != '') {
                var cleanValue = form.value[keys[i]].replace(new RegExp('"', 'g'), '');
                cleanValue = cleanValue.trim();
                updatedUserDetail[keys[i]] = cleanValue;
            }
        }
        var userinfo = Object.assign({}, this.userDetail), userId = userinfo.userId;
        this.userinfoService.updateUserDetail(userId, updatedUserDetail)
            .then(function (result) {
            _this.userDetailUpdated.emit(result);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ProfileEditFormComponent.prototype, "userDetail", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProfileEditFormComponent.prototype, "userDetailUpdated", void 0);
    ProfileEditFormComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-edit-form',
            template: __webpack_require__("./src/app/forms/profile-edit-form/profile-edit-form.component.html"),
            styles: [__webpack_require__("./src/app/forms/profile-edit-form/profile-edit-form.component.css")]
        }),
        __metadata("design:paramtypes", [setting_service_1.SettingService,
            userinfo_service_1.UserinfoService])
    ], ProfileEditFormComponent);
    return ProfileEditFormComponent;
}());
exports.ProfileEditFormComponent = ProfileEditFormComponent;


/***/ }),

/***/ "./src/app/forms/profile-form/profile-form.component.css":
/***/ (function(module, exports) {

module.exports = ".political-team-list-wrap .political-team-info > li {width:100%;}\r\n\r\n@media (max-width: 767px) {\r\n    .full-view-panel {width:100%;}\r\n}\r\n"

/***/ }),

/***/ "./src/app/forms/profile-form/profile-form.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"political-team political-team-list\">\r\n  <ul class=\"row\">\r\n    <li class=\"col-md-12 full-view-panel\">\r\n      <div class=\"political-team-list-wrap\">\r\n        <figure><img [src]=\"userProfileImage()\" alt=\"Profile image not available\"></figure>\r\n        <div class=\"political-team-list-text\">\r\n          <h2>{{userDetail.firstname}} {{userDetail.lastname}}</h2>\r\n          <span>{{'Position' | translate:settingService.getLanguage() }}: {{viewUserPosition()}}</span>\r\n          <p style=\"float:none; margin:5px 0 10px 0;\">{{'About' | translate:settingService.getLanguage() }}: {{viewUserAbout()}}</p>\r\n          <ul class=\"political-team-info\">\r\n            <li><i class=\"fa fa-globe\"></i><strong>{{'DPST #' | translate:settingService.getLanguage() }}</strong> {{userDetail.dpstYear}}</li>\r\n            <li><i class=\"fa fa-graduation-cap\"></i><strong>{{'Education' | translate:settingService.getLanguage() }}:</strong> {{userDetail.education}}</li>\r\n            <li><i class=\"fa fa-ravelry\"></i><strong>{{'Major' | translate:settingService.getLanguage() }}:</strong> {{userDetail.major}}</li>\r\n            <li><i class=\"fa fa-book\"></i><strong>{{'School/University' | translate:settingService.getLanguage() }}:</strong> {{userDetail.school}}</li>\r\n            <li><i class=\"fa fa-briefcase\"></i><strong>{{'Workplace' | translate:settingService.getLanguage() }}:</strong> {{userDetail.workplace}}</li>\r\n            <li><i class=\"fa fa-envelope\"></i><strong>{{'E-mail' | translate:settingService.getLanguage() }}:</strong> <a [href]=\"'mailto:'+userDetail.email\">{{userDetail.email}}</a></li>\r\n            <li><i class=\"fa fa-phone\"></i><strong>{{'Phone' | translate:settingService.getLanguage() }}:</strong> <span>{{userDetail.phone}}</span></li>\r\n            <li><i class=\"fa fa-comments\"></i><strong>Line ID:</strong> <span>{{userDetail.lineId}}</span></li>\r\n            <li><i class=\"fa fa-home\"></i><strong>{{'Address' | translate:settingService.getLanguage() }}:</strong>\r\n              <br>{{userDetail.address1}}\r\n              <ng-container *ngIf=\"userDetail.address2!==undefined && userDetail.address2!=''\"><br>{{userDetail.address2}}</ng-container>\r\n              <br>{{userDetail.province}} {{userDetail.zip}}\r\n              <br>{{userDetail.country}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>"

/***/ }),

/***/ "./src/app/forms/profile-form/profile-form.component.ts":
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
var ProfileFormComponent = /** @class */ (function () {
    function ProfileFormComponent(settingService) {
        this.settingService = settingService;
    }
    ProfileFormComponent.prototype.ngOnInit = function () {
    };
    ProfileFormComponent.prototype.viewUserPosition = function () {
        if (this.userDetail.position === undefined)
            return 'N/A';
        else
            return this.userDetail.position;
    };
    ProfileFormComponent.prototype.viewUserAbout = function () {
        if (this.userDetail.about === undefined)
            return 'N/A';
        else
            return this.userDetail.about;
    };
    ProfileFormComponent.prototype.userProfileImage = function () {
        if (this.userDetail.profileUrl === undefined || this.userDetail.profileUrl === null || this.userDetail.profileUrl == '')
            return 'assets/img/profile/base.jpg';
        else
            return this.userDetail.profileUrl;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ProfileFormComponent.prototype, "userDetail", void 0);
    ProfileFormComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-form',
            template: __webpack_require__("./src/app/forms/profile-form/profile-form.component.html"),
            styles: [__webpack_require__("./src/app/forms/profile-form/profile-form.component.css")]
        }),
        __metadata("design:paramtypes", [setting_service_1.SettingService])
    ], ProfileFormComponent);
    return ProfileFormComponent;
}());
exports.ProfileFormComponent = ProfileFormComponent;


/***/ }),

/***/ "./src/app/globals.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ipHost = "http://localhost:7000";
// export const ipHost: string = "http://159.65.70.206:7000";
exports.testing = true;


/***/ }),

/***/ "./src/app/gov-forms/gov-form1/gov-form1.component.css":
/***/ (function(module, exports) {

module.exports = ".form-container {\r\n    position: relative; \r\n    padding: 30px 0 60px 0;\r\n    margin-left: 55px;\r\n    margin-bottom: 20px;\r\n    width: 75vw;\r\n}\r\n.input-container {\r\n    position: absolute; \r\n    top: 30px; width:calc(100%);\r\n}\r\n@media screen and (max-width:1100px) {.form-container {margin-left: 100px;}}\r\n@media screen and (max-width:992px) {.form-container {margin-left: 20px;}}\r\n@media screen and (max-width:900px) {.form-container {margin-left: 70px;}}\r\n@media screen and (max-width:600px) {.form-container {margin-left: 60px;}}\r\n@media screen and (max-width:500px) {.form-container {margin-left: 50px;}}\r\n@media screen and (max-width:400px) {.form-container {margin-left: 40px;}}\r\n@media screen and (max-width:300px) {.form-container {margin-left: 25px;}}\r\n.fill {\r\n    position: absolute;\r\n    height: 2.2vw;\r\n    border: 1px solid #dbdbdb;\r\n    width: 10%;\r\n    background: none;\r\n}\r\n.fill:disabled, .radio:disabled {border: none; pointer-events: none;}\r\n.fill[type=text] {\r\n    color: #575757;\r\n    font-size: 1.3vw;\r\n}\r\n.fill:focus {\r\n    border: 2px solid #228ae6;\r\n    background: #f8ff9c;\r\n}\r\n.checkbox {margin:0; width: 2vw;}\r\n.fill[type=text][disabled] {color: #000000;}\r\n.fullname {\r\n    position: absolute; text-align: center; color: #000000; \r\n    font-size: 1.4vw; margin-top: -1.4vw;\r\n}"

/***/ }),

/***/ "./src/app/gov-forms/gov-form1/gov-form1.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- All of the form components should follow this structure. -->\n<!-- If you have any question, contact me at sarun_sla@hotmail.com (Sarun Seepun) -->\n\n<h2 *ngIf=\"form===null || userDetail===null\" style=\"width:100%; text-align:center;\">Loading the form detail...</h2>\n<ng-container *ngIf=\"form!==null && userDetail!==null\">\n\n<!-- Form header -->\n<div class=\"political-subheader\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"political-subheader-wrap\">\n  <h1>{{form.nameTH}}</h1>\n  <ul class=\"political-breadcrumb\">\n    <li><a (click)=\"pageService.setPage('Homepage')\">{{'Homepage' | translate:settingService.getLanguage()}}</a></li>\n    <li class=\"active\"><a (click)=\"pageService.setPage('Forms'); pageService.setSubpage('All forms');\" style=\"color:#555555;\">\n        {{'Forms' | translate:settingService.getLanguage()}}\n    </a></li>\n  </ul>\n</div></div></div></div></div>\n\n<!-- Form area -->\n<div class=\"political-main-section\"><div class=\"container\"><div class=\"row\"><div class=\"form-container\">\n  <img src=\"assets/img/govForms/gov-form1.jpg\" style=\"box-shadow:0px 4px 10px rgba(0,0,0,0.55);\">\n\n  <!-- Interactive form filling -->\n  <!-- New form -->\n  <form *ngIf=\"formService.getMode()=='New'\" #govForm=\"ngForm\" (ngSubmit)=\"submitGovForm(govForm)\"\n  class=\"input-container\" ngNativeValidate>\n    \n    <input value=\"\" ngModel required class=\"fill\" type=\"text\" name=\"school\"style=\"top:32.6vw; left:12vw; width:37%;\">\n\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"position1\" style=\"top:35.3vw; left:21.6vw; width:62%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"phone1\" style=\"top:38.3vw; left:16.6vw; width:30%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"email1\" style=\"top:38.3vw; left:43.6vw; width:32.7%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"thaiId1\" style=\"top:41.4vw; left:36vw; width:43%;\">\n    <input value=\"1\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:45vw; left:16.2vw;\">\n    <input value=\"2\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:47.8vw; left:16.2vw;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"date1\" style=\"top:44.5vw; left:53.2vw; width:8%;\">\n\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"position2\" style=\"top:50vw; left:24vw; width:58.8%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"phone2\" style=\"top:53vw; left:16.6vw; width:30%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"email2\" style=\"top:53vw; left:43.6vw; width:32.7%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"thaiId2\" style=\"top:56.1vw; left:36vw; width:43%;\">\n    <input value=\"3\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:59.8vw; left:16.2vw;\">\n    <input value=\"4\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:62.5vw; left:16.2vw;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"date2\" style=\"top:59.2vw; left:53.2vw; width:8%;\">\n\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"position3\" style=\"top:64.7vw; left:16.5vw; width:69%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"phone3\" style=\"top:67.7vw; left:16.6vw; width:30%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"email3\" style=\"top:67.7vw; left:43.6vw; width:32.7%;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"thaiId3\" style=\"top:70.8vw; left:36vw; width:43%;\">\n    <input value=\"5\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:74.5vw; left:16.2vw;\">\n    <input value=\"6\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:77.2vw; left:16.2vw;\">\n    <input value=\"\" ngModel class=\"fill\" type=\"text\" name=\"date3\" style=\"top:73.9vw; left:53.2vw; width:8%;\">\n\n    <input value=\"\" ngModel required class=\"fill\" type=\"text\" name=\"signature\" style=\"top:86.15vw; left:44.5vw; width:26.1%;\">\n    <div class=\"fullname\" style=\"top:90.65vw; left:58.5%; width:27.5%;\">{{userDetail.firstname}} {{userDetail.lastname}}</div>\n\n    <!-- Important button set -->\n    <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">\n      <input class=\"political-simple-btn warning-btn\" type=\"submit\" value=\"ส่งแบบฟอร์ม\" \n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 157px);\">\n      <input class=\"political-simple-btn\" type=\"button\" value=\"กลับไปเลือกเเบบฟอร์ม\" (click)=\"goToFormsPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 380px);\">\n    </ng-container>\n    <ng-container *ngIf=\"settingService.getLanguage()=='English'\">\n      <input class=\"political-simple-btn warning-btn\" type=\"submit\" value=\"Submit form\" \n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 157px);\">\n      <input class=\"political-simple-btn\" type=\"button\" value=\"Back to Forms\" (click)=\"goToFormsPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 335px);\">\n    </ng-container>\n  </form>\n\n  <!-- Edit form -->\n  <form *ngIf=\"formService.getMode()=='Edit'\" #govForm=\"ngForm\" (ngSubmit)=\"editSubmittedGovForm(govForm)\"\n  class=\"input-container\" ngNativeValidate>\n    \n    <input [ngModel]=\"default(formService.getForm().formValue.school)\" ngModel required class=\"fill\" type=\"text\" name=\"school\" style=\"top:32.6vw; left:12vw; width:37%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position1)\" ngModel class=\"fill\" type=\"text\" name=\"position1\" style=\"top:35.3vw; left:21.6vw; width:62%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone1)\" ngModel class=\"fill\" type=\"text\" name=\"phone1\" style=\"top:38.3vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email1)\" ngModel class=\"fill\" type=\"text\" name=\"email1\" style=\"top:38.3vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId1)\" ngModel class=\"fill\" type=\"text\" name=\"thaiId1\" style=\"top:41.4vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"1\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:45vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"2\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:47.8vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date1)\" ngModel class=\"fill\" type=\"text\" name=\"date1\" style=\"top:44.5vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position2)\" ngModel class=\"fill\" type=\"text\" name=\"position2\" style=\"top:50vw; left:24vw; width:58.8%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone2)\" ngModel class=\"fill\" type=\"text\" name=\"phone2\" style=\"top:53vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email2)\" ngModel class=\"fill\" type=\"text\" name=\"email2\" style=\"top:53vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId2)\" ngModel class=\"fill\" type=\"text\" name=\"thaiId2\" style=\"top:56.1vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"3\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:59.8vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"4\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:62.5vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date2)\" ngModel class=\"fill\" type=\"text\" name=\"date2\" style=\"top:59.2vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position3)\" ngModel class=\"fill\" type=\"text\" name=\"position3\" style=\"top:64.7vw; left:16.5vw; width:69%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone3)\" ngModel class=\"fill\" type=\"text\" name=\"phone3\" style=\"top:67.7vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email3)\" ngModel class=\"fill\" type=\"text\" name=\"email3\" style=\"top:67.7vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId3)\" ngModel class=\"fill\" type=\"text\" name=\"thaiId3\"  style=\"top:70.8vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"5\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:74.5vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"6\" ngModel required class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:77.2vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date3)\" ngModel class=\"fill\" type=\"text\" name=\"date3\" style=\"top:73.9vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.signature)\" ngModel required class=\"fill\" type=\"text\" name=\"signature\" style=\"top:86.15vw; left:44.5vw; width:26.1%;\">\n    <div class=\"fullname\" style=\"top:90.65vw; left:58.5%; width:27.5%;\">{{userDetail.firstname}} {{userDetail.lastname}}</div>\n\n    <!-- Important button set -->\n    <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">\n      <input class=\"political-simple-btn warning-btn\" type=\"submit\" value=\"แก้ไขแบบฟอร์ม\" \n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 174px);\">\n      <input *ngIf=\"formService.getRole()=='User'\" class=\"political-simple-btn\" type=\"button\" value=\"กลับไปประวัติการใช้งาน\" (click)=\"goToUserHistoryPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 405px);\">\n      <input *ngIf=\"formService.getRole()=='Admin'\" class=\"political-simple-btn\" type=\"button\" value=\"กลับไป Admin panel\" (click)=\"goToAdminPanel()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 385px);\">\n    </ng-container>\n    <ng-container *ngIf=\"settingService.getLanguage()=='English'\">\n      <input class=\"political-simple-btn warning-btn\" type=\"submit\" value=\"Edit form\" \n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 135px);\">\n      <input *ngIf=\"formService.getRole()=='User'\" class=\"political-simple-btn\" type=\"button\" value=\"Back to user history\" (click)=\"goToUserHistoryPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 350px);\">\n      <input *ngIf=\"formService.getRole()=='Admin'\" class=\"political-simple-btn\" type=\"button\" value=\"Back to admin panel\" (click)=\"goToAdminPanel()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 350px);\">\n    </ng-container>\n  </form>\n\n  <!-- View form -->\n  <form *ngIf=\"formService.getMode()=='View'\" class=\"input-container\">\n    \n    <input [ngModel]=\"default(formService.getForm().formValue.school)\" disabled class=\"fill\" type=\"text\" name=\"school\" style=\"top:32.6vw; left:12vw; width:37%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position1)\" disabled class=\"fill\" type=\"text\" name=\"position1\" style=\"top:35.3vw; left:21.6vw; width:62%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone1)\" disabled class=\"fill\" type=\"text\" name=\"phone1\" style=\"top:38.3vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email1)\" disabled class=\"fill\" type=\"text\" name=\"email1\" style=\"top:38.3vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId1)\" disabled class=\"fill\" type=\"text\" name=\"thaiId1\" style=\"top:41.4vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"1\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:45vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"2\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:47.8vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date1)\" disabled class=\"fill\" type=\"text\" name=\"date1\" style=\"top:44.5vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position2)\" disabled class=\"fill\" type=\"text\" name=\"position2\" style=\"top:50vw; left:24vw; width:58.8%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone2)\" disabled class=\"fill\" type=\"text\" name=\"phone2\" style=\"top:53vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email2)\" disabled class=\"fill\" type=\"text\" name=\"email2\" style=\"top:53vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId2)\" disabled class=\"fill\" type=\"text\" name=\"thaiId2\" style=\"top:56.1vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"3\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:59.8vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"4\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:62.5vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date2)\" disabled class=\"fill\" type=\"text\" name=\"date2\" style=\"top:59.2vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.position3)\" disabled class=\"fill\" type=\"text\" name=\"position3\" style=\"top:64.7vw; left:16.5vw; width:69%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.phone3)\" disabled class=\"fill\" type=\"text\" name=\"phone3\" style=\"top:67.7vw; left:16.6vw; width:30%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.email3)\" disabled class=\"fill\" type=\"text\" name=\"email3\" style=\"top:67.7vw; left:43.6vw; width:32.7%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.thaiId3)\" disabled class=\"fill\" type=\"text\" name=\"thaiId3\"  style=\"top:70.8vw; left:36vw; width:43%;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"5\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:74.5vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.radgroup)\" value=\"6\" disabled class=\"fill checkbox\" type=\"radio\" name=\"radgroup\" style=\"top:77.2vw; left:16.2vw;\">\n    <input [ngModel]=\"default(formService.getForm().formValue.date3)\" disabled class=\"fill\" type=\"text\" name=\"date3\" style=\"top:73.9vw; left:53.2vw; width:8%;\">\n\n    <input [ngModel]=\"default(formService.getForm().formValue.signature)\" disabled class=\"fill\" type=\"text\" name=\"signature\" style=\"top:86.15vw; left:44.5vw; width:26.1%;\">\n    <div class=\"fullname\" style=\"top:90.65vw; left:58.5%; width:27.5%;\">{{userDetail.firstname}} {{userDetail.lastname}}</div>\n\n    <!-- Important button set -->\n    <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">\n      <input *ngIf=\"formService.getRole()=='User'\" class=\"political-simple-btn\" type=\"button\" value=\"กลับไปประวัติการใช้งาน\" (click)=\"goToUserHistoryPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 225px);\">\n      <input *ngIf=\"formService.getRole()=='Admin'\" class=\"political-simple-btn\" type=\"button\" value=\"กลับไป Admin panel\" (click)=\"goToAdminPanel()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 207px);\">\n    </ng-container>\n    <ng-container *ngIf=\"settingService.getLanguage()=='English'\">\n      <input *ngIf=\"formService.getRole()=='User'\" class=\"political-simple-btn\" type=\"button\" value=\"Back to user history\" (click)=\"goToUserHistoryPage()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 209px);\">\n      <input *ngIf=\"formService.getRole()=='Admin'\" class=\"political-simple-btn\" type=\"button\" value=\"Back to admin panel\" (click)=\"goToAdminPanel()\"\n      style=\"position:absolute; top:calc(106.1vw + 23px); left:calc(75vw - 210px);\">\n    </ng-container>\n  </form>\n\n</div></div></div></div>\n\n</ng-container>"

/***/ }),

/***/ "./src/app/gov-forms/gov-form1/gov-form1.component.ts":
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
var form_service_1 = __webpack_require__("./src/app/services/form.service.ts");
var GovForm1Component = /** @class */ (function () {
    function GovForm1Component(pageService, settingService, userinfoService, formService) {
        this.pageService = pageService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.formService = formService;
        this.accessCode = 'gov-form1';
        this.form = null;
        this.userDetail = null;
        this.formSubmitted = new core_1.EventEmitter();
    }
    GovForm1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.formService.getFormDetail(this.accessCode)
            .then(function (result) { if (result.status)
            _this.form = result.data; });
        var userinfo = Object.assign({}, this.userinfoService.getUserinfo());
        this.userinfoService.getUserDetail(userinfo)
            .then(function (result) { if (result.status)
            _this.userDetail = result.data; });
    };
    GovForm1Component.prototype.default = function (value) {
        if (value === undefined)
            return '';
        else
            return value;
    };
    GovForm1Component.prototype.goToFormsPage = function () {
        this.pageService.setPage('Forms');
        this.pageService.setSubpage('All forms');
        this.formService.setMode();
    };
    GovForm1Component.prototype.goToUserHistoryPage = function () {
        this.pageService.setPage('User panel');
        this.pageService.setSubpage('History');
        this.formService.setMode();
    };
    GovForm1Component.prototype.goToAdminPanel = function () {
        if (this.userinfoService.getUserinfo().level >= 7) {
            this.pageService.setPage('Admin panel');
            this.pageService.setSubpage('User table');
            this.formService.setMode();
        }
        else {
            this.pageService.setPage('Homepage');
            this.formService.setMode();
        }
    };
    GovForm1Component.prototype.submitGovForm = function (govForm) {
        var _this = this;
        this.formService.submitForm(this.userDetail.userId, this.form._id, govForm.value)
            .then(function (result) {
            _this.formService.setMode();
            _this.formSubmitted.emit(result);
        });
    };
    GovForm1Component.prototype.editSubmittedGovForm = function (govForm) {
        var _this = this;
        if (this.formService.getForm() !== null) {
            this.formService.editSubmittedGovForm(this.formService.getForm()._id, govForm.value)
                .then(function (result) {
                if (result.status) {
                    if (_this.userinfoService.getUserinfo().level >= 7 && _this.formService.getRole() == 'Admin') {
                        _this.pageService.setPage('Admin panel');
                        _this.pageService.setSubpage('User table');
                        _this.formService.setMode();
                    }
                    else {
                        _this.pageService.setPage('User panel');
                        _this.pageService.setSubpage('History');
                        _this.formService.setMode();
                    }
                }
            });
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GovForm1Component.prototype, "formSubmitted", void 0);
    GovForm1Component = __decorate([
        core_1.Component({
            selector: 'app-gov-form1',
            template: __webpack_require__("./src/app/gov-forms/gov-form1/gov-form1.component.html"),
            styles: [__webpack_require__("./src/app/gov-forms/gov-form1/gov-form1.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            form_service_1.FormService])
    ], GovForm1Component);
    return GovForm1Component;
}());
exports.GovForm1Component = GovForm1Component;


/***/ }),

/***/ "./src/app/gov-forms/gov-forms.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/gov-forms/gov-forms.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!-- Forms -->\n<app-gov-form1 *ngIf=\"pageService.getSubpage()=='gov-form1'\" (formSubmitted)=\"formSubmitted($event)\"></app-gov-form1>\n\n\n<!-- Submitted confirmation -->\n<div *ngIf=\"pageService.getSubpage()=='Form submitted confirmation'\" class=\"political-main-content\">\n    <div class=\"political-main-section\">\n        <div class=\"container\">\n            <div class=\"row\" *ngIf=\"settingService.getLanguage()=='Thai'\">\n                <h2 style=\"margin-bottom:30px;\">\n                    เราได้รับแบบฟอร์มของคุณเรียบร้อยแล้ว เจ้าหน้าที่ของเรากำลังตรวจสอบความถูกต้อง ขอบคุณครับ\n                </h2>\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('Homepage')\" value=\"ไปหน้าเเรก\">\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('Forms')\" value=\"ไปหน้าเเบบฟอร์ม\">\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('User panel'); pageService.setSubpage('History');\"\n                    value=\"ไปหน้าประวัติการใช้งาน\">\n            </div>\n            <div class=\"row\" *ngIf=\"settingService.getLanguage()=='English'\">\n                <h2 style=\"margin-bottom:30px;\">\n                    The form is submitted successfully. Our staff will check your form shortly. Thank you.\n                </h2>\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('Homepage')\" value=\"Go to Homepage\">\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('Forms')\" value=\"Go to Forms\">\n                <input class=\"political-simple-btn back-btn\" type=\"submit\" \n                    (click)=\"pageService.setPage('User panel'); pageService.setSubpage('History');\"\n                    value=\"Go to your history\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/gov-forms/gov-forms.component.ts":
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
var GovFormsComponent = /** @class */ (function () {
    function GovFormsComponent(pageService, settingService) {
        this.pageService = pageService;
        this.settingService = settingService;
    }
    GovFormsComponent.prototype.ngOnInit = function () {
    };
    GovFormsComponent.prototype.formSubmitted = function (result) {
        if (result.status) {
            this.pageService.setSubpage('Form submitted confirmation');
        }
    };
    GovFormsComponent = __decorate([
        core_1.Component({
            selector: 'app-gov-forms',
            template: __webpack_require__("./src/app/gov-forms/gov-forms.component.html"),
            styles: [__webpack_require__("./src/app/gov-forms/gov-forms.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService])
    ], GovFormsComponent);
    return GovFormsComponent;
}());
exports.GovFormsComponent = GovFormsComponent;


/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.css":
/***/ (function(module, exports) {

module.exports = ".logo img {\r\n    width: 213px !important;\r\n}\r\n\r\n.political-main-header, .sub-menu.level-2 {\r\n    -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n            box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n}\r\n\r\n.sub-menu.level-2 {margin: 0;}\r\n\r\n.pen {color:orange !important; font-weight:600 !important;}\r\n\r\n@media screen and (max-width: 990px) {\r\n    .menu.navbar.navbar-default {\r\n        -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n                box-shadow: 0 0 8px rgba(0,0,0,0.4);\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n    .logo {\r\n        padding: 25px 0 0 0;\r\n    }\r\n    .menu-link span {\r\n        margin: 20px 0;\r\n    }\r\n    .navbar {\r\n        top: 129px;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"political-header\" class=\"political-header-one\">\r\n    <div class=\"political-main-header\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n\r\n                <aside class=\"col-md-3\">\r\n                    <a (click)=\"pageService.setPage('Home')\" class=\"logo\"><img src=\"assets/img/logo/base.png\" alt=\"\"></a>\r\n                </aside>\r\n\r\n                <aside class=\"col-md-9\">\r\n                    <div class=\"political-navigation\">\r\n                        <a href=\"#menu\" class=\"menu-link active\" (click)=\"unactiveSubMenu()\">\r\n                            <span style=\"margin-right:0;\"></span>\r\n                        </a>\r\n                        <nav id=\"menu\" class=\"menu navbar navbar-default\">\r\n                            <ul class=\"level-1 navbar-nav\">\r\n\r\n                                <!-- Homepage -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Homepage'}\"><a (click)=\"pageService.setPage('Homepage'); unactive();\">\r\n                                    {{'HomePage' | translate:settingService.getLanguage() }}\r\n                                </a></li>\r\n\r\n                                <!-- Log in -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Log in'}\" *ngIf=\"userinfoService.getUserinfo()===null\">\r\n                                    <a (click)=\"pageService.setPage('Log in'); unactive();\">\r\n                                        {{'Log in' | translate:settingService.getLanguage() }}\r\n                                    </a>\r\n                                </li>\r\n\r\n                                <!-- Register -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Register'}\" *ngIf=\"userinfoService.getUserinfo()===null\">\r\n                                    <a (click)=\"pageService.setPage('Register'); unactive();\">\r\n                                        {{'Register' | translate:settingService.getLanguage() }}\r\n                                    </a>\r\n                                </li>\r\n\r\n                                <!-- Check status -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Check status'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status!='Active'\">\r\n                                    <a (click)=\"toggleSubnav('.status-nav')\">\r\n                                        {{'Status' | translate:settingService.getLanguage() }}:\r\n                                            <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending'}\">{{userinfoService.getUserinfo().status}}</span>\r\n                                    </a><span class=\"has-subnav status-nav\" style=\"pointer-events:none;\"><i class=\"fa fa-angle-down\"></i></span>\r\n                                    <ul class=\"sub-menu level-2 status-nav\">\r\n                                        <li><a (click)=\"pageService.setPage('Check status'); unactive();\">\r\n                                            {{'What is this?' | translate:settingService.getLanguage() }}\r\n                                        </a></li>\r\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\r\n                                            {{'Log out' | translate:settingService.getLanguage() }}\r\n                                        </a></li>\r\n                                    </ul>\r\n                                </li>\r\n\r\n                                <!-- User panel -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Profile'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status=='Active'\">\r\n                                    <a (click)=\"toggleSubnav('.profile-nav')\">\r\n                                        {{'Hello,' | translate:settingService.getLanguage() }}\r\n                                            <span class=\"hello-user\">{{userinfoService.getUserinfo().username}}</span>\r\n                                    </a><span class=\"has-subnav profile-nav\" style=\"pointer-events:none;\"><i class=\"fa fa-angle-down\"></i></span>\r\n                                    <ul class=\"sub-menu level-2 profile-nav\">\r\n                                        <li><a (click)=\"pageService.setPage('User panel'); pageService.setSubpage('Profile'); unactive();\">\r\n                                            {{'Profile' | translate:settingService.getLanguage() }}\r\n                                        </a></li>\r\n                                        <li><a (click)=\"pageService.setPage('User panel'); pageService.setSubpage('History'); unactive();\">\r\n                                            {{'History' | translate:settingService.getLanguage() }}\r\n                                        </a></li>\r\n\r\n                                        <!-- Admin panel -->\r\n                                        <li *ngIf=\"userinfoService.getUserinfo().level>=7\">\r\n                                            <a (click)=\"pageService.setPage('Admin panel'); pageService.setSubpage('User table'); unactive();\"\r\n                                            class=\"hello-user\" style=\"font-weight:600;\">\r\n                                                Admin Panel\r\n                                            </a>\r\n                                        </li>\r\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\r\n                                            {{'Log out' | translate:settingService.getLanguage() }}\r\n                                        </a></li>\r\n                                    </ul>\r\n                                </li>\r\n\r\n                                <!-- Forms -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Forms'}\" *ngIf=\"userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().status=='Active'\">\r\n                                    <a (click)=\"pageService.setPage('Forms'); pageService.setSubpage('All forms'); unactive();\">\r\n                                        {{'Forms' | translate:settingService.getLanguage() }}\r\n                                    </a>\r\n                                </li>\r\n\r\n                                <!-- Contact -->\r\n                                <li [ngClass]=\"{'active':pageService.getPage()=='Contact'}\"><a (click)=\"pageService.setPage('Contact'); unactive();\">\r\n                                    {{'Contact Us' | translate:settingService.getLanguage() }}\r\n                                </a></li>\r\n\r\n                                <!-- Language -->\r\n                                <!-- <li>\r\n                                    <a>\r\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">เลือกภาษา</ng-container>\r\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Language</ng-container>\r\n                                    </a><span class=\"has-subnav\"><i class=\"fa fa-angle-down\"></i></span>\r\n                                    <ul class=\"sub-menu level-2\">\r\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">\r\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาไทย</ng-container>\r\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Thai</ng-container>\r\n                                        </a></li>\r\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">\r\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาอังกฤษ</ng-container>\r\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">English</ng-container>\r\n                                        </a></li>\r\n                                    </ul>\r\n                                </li> -->\r\n                                <li>\r\n                                    <a (click)=\"toggleSubnav('.language')\">Language</a>\r\n                                    <span class=\"has-subnav language\" style=\"pointer-events:none;\"><i class=\"fa fa-angle-down\"></i></span>\r\n                                    <ul class=\"sub-menu level-2 language\">\r\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">Thai</a></li>\r\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">English</a></li>\r\n                                    </ul>\r\n                                </li>\r\n\r\n                            </ul>\r\n                        </nav>\r\n                    </div>\r\n                </aside>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>"

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

/***/ "./src/app/languages/lang-th.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LANG_TH_TRANS = {
    'about': 'เกี่ยวกับ',
    'about application': 'เกี่ยวกับ Application',
    'address': 'ที่อยู่',
    'contact us': 'ติดต่อเรา',
    'dpst #': 'พสวท. รุ่นที่',
    'education': 'ระดับการศึกษา',
    'e-mail': 'อีเมล',
    'forgot': 'ลืม',
    'forms': 'แบบฟอร์ม',
    'hello,': 'สวัสดี',
    'history': 'ประวัติการใช้งาน',
    'homepage': 'หน้าแรก',
    'how to use': 'วิธีใช้งาน',
    'log in': 'เข้าสู่ระบบ',
    'log out': 'ออกจากระบบ',
    'major': 'สาขาวิชา',
    'mission': 'เป้าหมาย',
    'password': 'รหัสผ่าน',
    'phone': 'โทรศัพท์',
    'position': 'ตำเเหน่ง',
    'profile': 'ประวัติส่วนตัว',
    'register': 'สมัครสมาชิก',
    'register to our community': 'สมัครสมาชิกเพื่อเข้าใช้งาน',
    'remember me': 'จำฉันไว้ในระบบ',
    'school/university': 'สถานศีกษา',
    'status': 'สถานะ',
    'username': 'ชื่อผู้ใช้งาน',
    'welcome to dpst database manager': 'ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลของ พสวท.',
    'what is this?': 'คืออะไร',
    'workplace': 'สถานที่ทำงาน',
    'wrong username or password': 'ชื่อผู้ใช้งานหรือรหัสผ่านผิด',
    'your e-mail address': 'อีเมลของคุณ',
    'your name': 'ชื่อของคุณ',
    'all forms': 'แบบฟอร์มทั้งหมด',
    'form category': 'ประเภทแบบฟอร์ม',
    'create date': 'จัดทำวันที่'
};
// {{'text' | translate:settingService.getLanguage() }}


/***/ }),

/***/ "./src/app/languages/language.service.ts":
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
var lang_th_1 = __webpack_require__("./src/app/languages/lang-th.ts");
var dictionary = {
    'Thai': lang_th_1.LANG_TH_TRANS
};
var LanguageService = /** @class */ (function () {
    function LanguageService() {
    }
    LanguageService.prototype.getMsg = function (msg) {
        return msg;
    };
    LanguageService.prototype.translate = function (value, lang) {
        if (dictionary[lang]) {
            return dictionary[lang][value.toLowerCase()] || value;
        }
        return value;
    };
    LanguageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LanguageService);
    return LanguageService;
}());
exports.LanguageService = LanguageService;


/***/ }),

/***/ "./src/app/languages/translate.pipe.ts":
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
var language_service_1 = __webpack_require__("./src/app/languages/language.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(_lang, settings) {
        this._lang = _lang;
        this.settings = settings;
    }
    TranslatePipe.prototype.transform = function (value, lang) {
        if (!value)
            return;
        return this._lang.translate(value, lang);
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'translate'
        }),
        __metadata("design:paramtypes", [language_service_1.LanguageService,
            setting_service_1.SettingService])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;


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

module.exports = "li.active a {color:#228ae6; font-weight:600;}"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"political-subheader-wrap\">\r\n                    <h1>Admin Panel</h1>\r\n                    <ul class=\"political-breadcrumb\">\r\n                        <li><a (click)=\"pageService.setPage('Homepage')\">Homepage</a></li>\r\n                        <li>Admin Panel</li>\r\n                        <li class=\"active\">{{pageService.getSubpage()}}</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"political-main-content\">\r\n    <div class=\"political-main-section\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n\r\n                <!-- Admin panel sidbar -->\r\n                <aside class=\"col-md-3\">\r\n                    <div class=\"widget widget_cetagories\">\r\n                        <h2 class=\"political-widget-heading\">Admin Menu</h2>\r\n                        <ul>\r\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='User table'}\">\r\n                                <a (click)=\"pageService.setSubpage('User table')\">User Table</a></li>\r\n                            <li *ngIf=\"userinfoService.getUserinfo().level>7\"\r\n                            [ngClass]=\"{'active':pageService.getSubpage()=='Statistic'}\">\r\n                                <a (click)=\"pageService.setSubpage('Statistic')\">Statistic</a></li>\r\n                            <li *ngIf=\"userinfoService.getUserinfo().level>7\"\r\n                            [ngClass]=\"{'active':pageService.getSubpage()=='Email blast'}\">\r\n                                <a (click)=\"pageService.setSubpage('Email blast')\">Email Blast</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </aside>\r\n\r\n                <!-- Admin panel subpages -->\r\n                <div class=\"col-md-9\">\r\n\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='User table'\">\r\n                        <app-page-admin-user-table></app-page-admin-user-table>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Statistic'\">\r\n                        <app-page-admin-statistic></app-page-admin-statistic>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Email blast'\">\r\n                        <app-page-admin-email-blast></app-page-admin-email-blast>\r\n                    </ng-container>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

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
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageAdminPanelComponent = /** @class */ (function () {
    function PageAdminPanelComponent(pageService, settingService, userinfoService) {
        this.pageService = pageService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
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
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService])
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

module.exports = "th {color:#000000;}\r\ntd {font-weight:300;}\r\n.fa {cursor:pointer;}\r\n.show-per-page, .select-sort, input.search[type=text] {height:38px; padding:3px;}\r\n.show-per-page {width:60px;}\r\n.select-sort {width:190px;}\r\ninput.search[type=text] {\r\n    font-size: 16px;\r\n    border: 1px solid #dfdfdf;\r\n    width: 180px;\r\n    color: #5a5a5a;\r\n    font-weight: 300;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n.top-option {padding:0 15px; float:right;}\r\n.pagination-div {margin:20px 0;}\r\n.back-btn {float:right; margin-bottom:20px;}\r\n"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"subpage=='Table'\" class=\"political-blog-large\">\r\n\r\n  <!-- Selection criteria -->\r\n  <div class=\"political-pagination\" style=\"color:#000; margin:0 0 25px 0;\">\r\n\r\n      <div class=\"top-option\">\r\n        <input #keyword class=\"search\" type=\"text\" (keyup.enter)=\"tableSearch(keyword.value)\">\r\n        <input type=\"submit\" class=\"political-simple-btn\" value=\"Search\" (click)=\"tableSearch(keyword.value)\">\r\n      </div>\r\n\r\n      <div class=\"top-option\">\r\n        Sort by\r\n        <select class=\"select-sort\" (change)=\"tableSortChange($event.target.value)\">\r\n          <option value=\"None\" selected=\"selected\">None</option>\r\n          <option value=\"Firstname increasing\">Firstname increasing</option>\r\n          <option value=\"Firstname decreasing\">Firstname decreasing</option>\r\n          <option value=\"Level increasing\">Level increasing</option>\r\n          <option value=\"Level decreasing\">Level decreasing</option>\r\n          <option value=\"Status increasing\">Status increasing</option>\r\n          <option value=\"Status decreasing\">Status decreasing</option>\r\n          <option value=\"Register date increasing\">Register date increasing</option>\r\n          <option value=\"Register date decreasing\">Register date decreasing</option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class=\"top-option\">\r\n        Show per page\r\n        <select class=\"show-per-page\" (change)=\"tableLimitChange($event.target.value)\">\r\n          <option value=\"10\">10</option>\r\n          <option value=\"25\" selected=\"selected\">25</option>\r\n          <option value=\"50\">50</option>\r\n          <option value=\"100\">100</option>\r\n        </select>\r\n      </div>\r\n        \r\n  </div>\r\n\r\n  <ul class=\"row\">\r\n    <li class=\"col-md-12\">\r\n\r\n      <table><tbody>\r\n        <tr>\r\n          <th>Username</th>\r\n          <th>Firstname</th>\r\n          <th>Lastname</th>\r\n          <th>E-mail address</th>\r\n          <th>Level</th>\r\n          <th>Status</th>\r\n          <th>Actions</th>\r\n        </tr>\r\n\r\n        <ng-container *ngIf=\"users===null\">\r\n          <tr><td colspan=\"8\">No user data found.</td></tr>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"users!==null\">\r\n          <tr *ngFor=\"let user of users;\">\r\n            <td>{{user.username}}</td>\r\n            <td>{{user.firstname}}</td>\r\n            <td>{{user.lastname}}</td>\r\n            <td>{{user.email}}</td>\r\n            <td>{{user.level}}</td>\r\n            <td [ngClass]=\"{'ban':user.status=='Ban', 'pen':user.status=='Pending', 'hello-user':user.status=='Active'}\">{{user.status}}</td>\r\n            \r\n            <!-- Admin options based on level -->\r\n            <!-- Lower users -->\r\n            <td *ngIf=\"user.level < userinfoService.getUserinfo().level\">\r\n              <i *ngIf=\"user.status!='Active'\" class=\"fa fa-check-square-o hello-user\" aria-hidden=\"true\"\r\n                (click)=\"setAccountStatus(user, 'Active')\">&nbsp;</i>\r\n              <i *ngIf=\"user.status!='Ban'\" class=\"fa fa-times pen\" aria-hidden=\"true\"\r\n                (click)=\"setAccountStatus(user, 'Ban')\">&nbsp;</i>\r\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\r\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\r\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\r\n              <i class=\"fa fa-pencil-square-o edit-icon\" aria-hidden=\"true\"\r\n                (click)=\"adminEditUserinfo(user)\"></i>&nbsp;\r\n              <i class=\"fa fa-trash ban\" aria-hidden=\"true\"\r\n                (click)=\"tryDeleteAccount(user)\"></i>\r\n            </td>\r\n            <!-- Higher users -->\r\n            <td *ngIf=\"user.level > userinfoService.getUserinfo().level\">\r\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\r\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\r\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>\r\n            </td>\r\n            <!-- Yourself -->\r\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id==userinfoService.getUserinfo()._id\">\r\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\r\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\r\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\r\n              <i class=\"fa fa-pencil-square-o edit-icon\" aria-hidden=\"true\"\r\n                (click)=\"adminEditUserinfo(user)\"></i>\r\n            </td>\r\n            <!-- Same level users, not you -->\r\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id!=userinfoService.getUserinfo()._id\">\r\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\r\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\r\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>\r\n            </td>\r\n\r\n          </tr>\r\n        </ng-container>\r\n\r\n      </tbody></table>\r\n\r\n      <!-- Pagination -->\r\n      <div class=\"political-pagination pagination-div\">\r\n        <ul class=\"page-numbers\">\r\n            <li><a class=\"previous page-numbers\" (click)=\"previouseTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-left\"></i></span></a></li>\r\n            <li *ngFor=\"let page of pagination;\">\r\n              <a *ngIf=\"page!=criteria.page\" class=\"page-numbers\"\r\n              (click)=\"paginationChangePage(page)\">{{page+1}}</a>\r\n              <span *ngIf=\"page==criteria.page\" class=\"page-numbers current\">{{page+1}}</span>\r\n            </li>\r\n            <li><a class=\"next page-numbers\" (click)=\"nextTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-right\"></i></span></a></li>\r\n        </ul>\r\n      </div>\r\n\r\n    </li>\r\n  </ul>\r\n</div>\r\n\r\n<!-- Delete user panel -->\r\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='Thai'\" class=\"political-blog-large\">\r\n  <h1 style=\"margin-bottom:20px;\"><strong>คุณกำลังจะทำการ<span class=\"ban\">ลบข้อมูลผู้ใช้</span></strong></h1>\r\n  <h3 style=\"margin-bottom:20px;\">ชื่อผู้ใช้งาน: <span class=\"hello-user\" style=\"font-weight:600;\">{{userOnHand.username}}</span></h3>\r\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"ลบข้อมูลผู้ใช้\" (click)=\"deleteAccount()\">\r\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"ยกเลิก\" (click)=\"goBackToUserTable()\">\r\n</div>\r\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='English'\" class=\"political-blog-large\">\r\n  <h1 style=\"margin-bottom:20px;\"><strong>You are about to <span class=\"ban\">DELETE</span> a user.</strong></h1>\r\n  <h3 style=\"margin-bottom:20px;\">Username: <span class=\"hello-user\" style=\"font-weight:600;\">{{userOnHand.username}}</span></h3>\r\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"DELETE\" (click)=\"deleteAccount()\">\r\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"Cancel\" (click)=\"goBackToUserTable()\">\r\n</div>\r\n\r\n<!-- View user profile -->\r\n<ng-container *ngIf=\"subpage=='View user' && userOnHand!==null\">\r\n  <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"ย้อนกลับไป\">\r\n  <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"Go back\">\r\n  <app-profile-form [userDetail]=\"userOnHand\"></app-profile-form>\r\n</ng-container>\r\n\r\n<!-- Edit user information -->\r\n<ng-container *ngIf=\"subpage=='Edit user' && userOnHand!==null\">\r\n  <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"ย้อนกลับไป\">\r\n  <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"Go back\">\r\n  <input class=\"political-simple-btn warning-btn\" type=\"submit\" style=\"float:right; margin-right:10px;\"\r\n    (click)=\"goToAdminPrivilageSetting()\" value=\"Admin pivilage setting\">\r\n  <app-profile-edit-form [userDetail]=\"userOnHand\"\r\n    (userDetailUpdated)=\"userDetailUpdatedDone($event)\"></app-profile-edit-form>\r\n</ng-container>\r\n\r\n<!-- Admin privilage setting -->\r\n<ng-container *ngIf=\"subpage=='Admin setting' && userOnHand!==null\">\r\n  <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"ย้อนกลับไป\">\r\n  <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn back-btn\" type=\"submit\" \r\n    (click)=\"goBackToUserTable()\" value=\"Go back\">\r\n  <app-admin-privilage-setting-form [userinfo]=\"userOnHand\"\r\n  (userinfoUpdated)=\"userPrivilageUpdatedDone($event)\"></app-admin-privilage-setting-form>\r\n</ng-container>"

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
        this.adminService.getUsers(this.criteria);
        this.socketioService.getSocket().on('update-new-users', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
        this.socketioService.getSocket().on('announce-account-status', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
        this.socketioService.getSocket().on('announce-account-delete', function () {
            this.adminService.getUsers(this.criteria);
        }.bind(this));
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
    PageAdminUserTableComponent.prototype.goBackToUserTable = function () { this.subpage = 'Table'; this.userOnHand = null; };
    // Delete user process
    PageAdminUserTableComponent.prototype.tryDeleteAccount = function (userinfo) { this.subpage = 'Try delete'; this.userOnHand = userinfo; };
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
    PageAdminUserTableComponent.prototype.viewUserinfo = function (userinfo) {
        var _this = this;
        this.userinfoService.getUserDetail(userinfo)
            .then(function (result) {
            if (result !== null && result.status) {
                _this.userOnHand = result.data;
                _this.subpage = 'View user';
            }
        });
    };
    PageAdminUserTableComponent.prototype.viewUserPosition = function () {
        if (this.userOnHand.position === undefined)
            return 'N/A';
        else
            return this.userOnHand.position;
    };
    PageAdminUserTableComponent.prototype.viewUserAbout = function () {
        if (this.userOnHand.about === undefined)
            return 'N/A';
        else
            return this.userOnHand.about;
    };
    // Edit user information process
    PageAdminUserTableComponent.prototype.adminEditUserinfo = function (userinfo) {
        var _this = this;
        this.userinfoService.getUserDetail(userinfo)
            .then(function (result) {
            if (result !== null && result.status) {
                _this.userOnHand = result.data;
                _this.subpage = 'Edit user';
            }
        });
    };
    PageAdminUserTableComponent.prototype.userDetailUpdatedDone = function (result) {
        if (result.status) {
            this.subpage = 'Table';
        }
    };
    // Admin privilage process
    PageAdminUserTableComponent.prototype.goToAdminPrivilageSetting = function () { this.subpage = 'Admin setting'; };
    PageAdminUserTableComponent.prototype.userPrivilageUpdatedDone = function (result) {
        if (result.status) {
            this.adminService.getUsers(this.criteria);
            this.socketioService.accountPrivilage(this.userOnHand.userId);
            this.userOnHand = null;
            this.subpage = 'Table';
        }
    };
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

module.exports = "\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n\n      <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">\n        <div class=\"political-fancy-title\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md-12\"><h2>ติดต่อเรา</h2></div>\n            </div>\n          </div>\n        </div>\n        <div class=\"container\">\n          <div class=\"row\">\n\n            <div class=\"col-md-12\">\n                <div class=\"political-contact-info\">\n                  <ul class=\"row\">\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-location-pin\"></i>\n                        <h6>เจอเราที่ พสวท.</h6>\n                        <p>924 ถนนสุขุมวิท \n                          <br>เขตคลองเตย กรุเทพ \n                          <br>ประเทศไทย 10110</p>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-phone-call\"></i>\n                        <h6>โทรหาเรา</h6>\n                        <p>02 392 4021 \n                          <br>02 392 4021</p>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-envelope\"></i>\n                        <h6>E-mail หาเราที่</h6>\n                        <a href=\"mailto:nsric@ipst.ac.th\">nsric@ipst.ac.th</a>\n                        <a href=\"mailto:sarun_sla@hotmail.com\">sarun_sla@hotmail.com</a>\n                      </div>\n                    </li>\n                    <li class=\"col-md-3\">\n                      <div class=\"political-contact-text\">\n                        <i class=\"icon church-print\"></i>\n                        <h6>Fax หาเราได้ที่</h6>\n                        <p>02 381 0750</p>\n                      </div>\n                    </li>\n                  </ul>\n                </div>\n            </div>\n\n          </div>\n        </div>\n      </ng-container>\n      <ng-container *ngIf=\"settingService.getLanguage()=='English'\">\n        <div class=\"political-main-section\">\n            <div class=\"political-fancy-title\">\n              <div class=\"container\">\n                <div class=\"row\">\n                  <div class=\"col-md-12\"><h2>Get In touch</h2></div>\n                </div>\n              </div>\n            </div>\n            <div class=\"container\">\n              <div class=\"row\">\n    \n                <div class=\"col-md-12\">\n                  <div class=\"political-contact-info\">\n                    <ul class=\"row\">\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-location-pin\"></i>\n                          <h6>Meet Us At IPST</h6>\n                          <p>924 Sukhumvit Rd, \n                            <br>Khlong Toei, Bangkok \n                            <br>Thailand 10110</p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-phone-call\"></i>\n                          <h6>Call Us At</h6>\n                          <p>+66 2 392 4021 \n                            <br>+66 2 392 4021</p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-envelope\"></i>\n                          <h6>E-mail Us At</h6>\n                          <a href=\"mailto:nsric@ipst.ac.th\">nsric@ipst.ac.th</a>\n                          <a href=\"mailto:sarun_sla@hotmail.com\">sarun_sla@hotmail.com</a>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-print\"></i>\n                          <h6>Fax Us At</h6>\n                          <p>+66 2 381 0750</p>\n                        </div>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n    \n              </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <div class=\"political-main-section\">\n        <div class=\"political-fancy-title\">\n          <div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <h2 *ngIf=\"settingService.getLanguage()=='Thai'\">ส่งข้อความหาเรา</h2>\n                <h2 *ngIf=\"settingService.getLanguage()=='English'\">Contact Us Now</h2>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"container\">\n          <div class=\"row\">\n            \n            <div class=\"col-md-8\">\n              <div class=\"political-contact-form\">\n                <h2 class=\"political-section-heading\" *ngIf=\"settingService.getLanguage()=='Thai'\">ส่งข้อความหาเราตอนนี้</h2>\n                <h2 class=\"political-section-heading\" *ngIf=\"settingService.getLanguage()=='English'\">Message Us Now</h2>\n                <p *ngIf=\"settingService.getLanguage()=='Thai'\">\n                  หลังจากที่เราได้รับข้อความของคุณ เราจะติดต่อกลับภายใน 2 วันทำการ\n                </p>\n                <p *ngIf=\"settingService.getLanguage()=='English'\">\n                  After we received your email, we will reply to you within 2 business days. Thank you!\n                </p>\n\n                <form *ngIf=\"settingService.getLanguage()=='Thai'\"\n                #form1=\"ngForm\" (ngSubmit)=\"sendMessage(form1)\" ngNativeValidate>\n                  <ul>\n                    <li><input class=\"reg-input\" type=\"text\" name=\"name\" value=\"\" placeholder=\"ชื่อของคุณ\" ngModel required></li>\n                    <li><input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" placeholder=\"E-mail address ของคุณ\" ngModel required></li>\n                    <li class=\"political-full-form\"><textarea name=\"message\" placeholder=\"ข้อความ\" ngModel required></textarea></li>\n                    <input type=\"submit\" value=\"ส่งข้อความ\" class=\"\" style=\"margin-left:calc(50% - 60px);\">\n                  </ul>\n                </form>\n                <form *ngIf=\"settingService.getLanguage()=='English'\"\n                #form2=\"ngForm\" (ngSubmit)=\"sendMessage(form2)\" ngNativeValidate>\n                  <ul>\n                    <li><input class=\"reg-input\" type=\"text\" name=\"name\" value=\"\" placeholder=\"Your name\" ngModel required></li>\n                    <li><input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" placeholder=\"Your e-mail address\" ngModel required></li>\n                    <li class=\"political-full-form\"><textarea name=\"message\" placeholder=\"Message\" ngModel required></textarea></li>\n                    <input type=\"submit\" value=\"Submit Now\" class=\"\" style=\"margin-left:calc(50% - 80px);\">\n                  </ul>\n                </form>\n\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"political-contact-map\">\n                <!-- <div #gmap id=\"map\"></div> -->\n                <img src=\"assets/img/bg/google-map-static.JPG\">\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    \n</div>"

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
    // @ViewChild('gmap') gmapElement: any;
    // private map: google.maps.Map;
    function PageContactComponent(pageService, settingService) {
        this.pageService = pageService;
        this.settingService = settingService;
    }
    PageContactComponent.prototype.ngOnInit = function () {
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
    };
    PageContactComponent.prototype.sendMessage = function (form) {
        console.log(form.value);
        form.resetForm();
    };
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

/***/ "./src/app/page-gov-forms/page-gov-forms.component.css":
/***/ (function(module, exports) {

module.exports = "li.active a {color:#228ae6; font-weight:600;}\r\n\r\n.political-compaign-grid-text {padding:15px 15px 10px 15px; cursor:pointer;}\r\n\r\n.gov-form-preview {border:1px solid #929292;}\r\n\r\n.form-owner {margin:10px 0 5px 0; width:100%; text-align:left;}\r\n\r\n.form-name {font-size:17px; margin-bottom:7px; line-height:23px;}\r\n\r\n.form-date {margin:0; font-size:13px;}\r\n\r\nth {color:#000000;}\r\n\r\ntd {font-weight:300;}\r\n\r\n.fa {cursor:pointer;}\r\n\r\n.show-per-page, .select-sort, input.search[type=text] {height:38px; padding:3px;}\r\n\r\n.show-per-page {width:60px;}\r\n\r\n.select-sort {width:190px;}\r\n\r\ninput.search[type=text] {\r\n    font-size: 16px;\r\n    border: 1px solid #dfdfdf;\r\n    width: 180px;\r\n    color: #5a5a5a;\r\n    font-weight: 300;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n\r\n.top-option {padding:0 15px; float:right;}\r\n\r\n.pagination-div {margin:20px 0;}\r\n\r\n.back-btn {float:right; margin-bottom:20px;}"

/***/ }),

/***/ "./src/app/page-gov-forms/page-gov-forms.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n\n                <div class=\"political-subheader-wrap\">\n                    <h1>{{'Forms' | translate:settingService.getLanguage() }}</h1>\n                    <ul class=\"political-breadcrumb\">\n                        <li><a (click)=\"pageService.setPage('Homepage')\">{{'Homepage' | translate:settingService.getLanguage() }}</a></li>\n                        <li>{{'Forms' | translate:settingService.getLanguage() }}</li>\n                        <li class=\"active\">{{pageService.getSubpage() | translate:settingService.getLanguage() }}</li>\n                    </ul>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <!-- Admin panel sidbar -->\n                <aside class=\"col-md-3\">\n                    <div class=\"widget widget_cetagories\">\n                        <h2 class=\"political-widget-heading\">{{'Form category' | translate:settingService.getLanguage() }}</h2>\n                        <ul>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='All forms'}\">\n                                <a (click)=\"pageService.setSubpage('All forms'); changeFormCategory('All forms');\">\n                                    {{'All Forms' | translate:settingService.getLanguage() }}\n                                </a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Form category 1'}\">\n                                <a (click)=\"pageService.setSubpage('Form category 1'); changeFormCategory('Form category 1');\">\n                                    {{'Form category 1' | translate:settingService.getLanguage() }}\n                                </a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Form category 2'}\">\n                                <a (click)=\"pageService.setSubpage('Form category 2'); changeFormCategory('Form category 2');\">\n                                    {{'Form category 2' | translate:settingService.getLanguage() }}\n                                </a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Form category 3'}\">\n                                <a (click)=\"pageService.setSubpage('Form category 3'); changeFormCategory('Form category 3');\">\n                                    {{'Form category 3' | translate:settingService.getLanguage() }}\n                                </a></li>\n                        </ul>\n                    </div>\n                </aside>\n\n                <!-- Form display -->\n                <div class=\"col-md-9\">\n\n                    <!-- Selection criteria -->\n                    <div class=\"political-pagination\" style=\"color:#000; margin:0 0 25px 0;\">\n\n                        <div class=\"top-option\">\n                            <input #keyword class=\"search\" type=\"text\" (keyup.enter)=\"formSearch(keyword.value)\">\n                            <input type=\"submit\" class=\"political-simple-btn\" value=\"Search\" (click)=\"formSearch(keyword.value)\">\n                        </div>\n\n                        <div class=\"top-option\">\n                            Sort by\n                            <select class=\"select-sort\" (change)=\"formSortChange($event.target.value)\">\n                            <option value=\"None\" selected=\"selected\">None</option>\n                            <option value=\"Name increasing\">Name increasing</option>\n                            <option value=\"Name decreasing\">Name decreasing</option>\n                            <option value=\"Owner increasing\">Owner increasing</option>\n                            <option value=\"Owner decreasing\">Owner decreasing</option>\n                            <option value=\"Created date increasing\">Created date increasing</option>\n                            <option value=\"Created date decreasing\">Created date decreasing</option>\n                            </select>\n                        </div>\n\n                        <div class=\"top-option\">\n                            Show per page\n                            <select class=\"show-per-page\" (change)=\"formLimitChange($event.target.value)\">\n                            <option value=\"1\">1</option>\n                            <option value=\"10\">10</option>\n                            <option value=\"25\" selected=\"selected\">25</option>\n                            <option value=\"50\">50</option>\n                            <option value=\"100\">100</option>\n                            </select>\n                        </div>\n                            \n                    </div>\n\n                    <div class=\"political-compaign political-compaign-grid\">\n                        <h2 *ngIf=\"forms===null\">Loading forms...</h2>\n                        <h2 *ngIf=\"forms!==null && forms.length==0\">No forms available.</h2>\n\n                        <ul *ngIf=\"forms!==null\" class=\"row\">\n\n                          <!-- Form preview -->\n                            <li *ngFor=\"let form of forms;\" class=\"col-md-4\">\n                              <div class=\"political-compaign-grid-text\" (click)=\"goToForm(form)\">\n                                <figure class=\"gov-form-preview\"><a>\n                                  <img [src]=\"formPreview(form)\" alt=\"\">\n                                  <span><i class=\"fa fa-pencil\"></i> Fill Form</span>\n                                </a></figure>\n\n                                <small class=\"form-owner\">{{formOwner(form)}} Form</small>\n                                <h3 class=\"form-name\">{{form.nameTH}}</h3>\n                                <span class=\"form-date\">\n                                  {{'Create date' | translate:settingService.getLanguage() }}:\n                                  <small>{{dateFromObjectId(form._id)}}</small>\n                                </span>\n                              </div>\n                            </li>\n\n                        </ul>\n                    </div>\n\n                    <!-- Pagination -->\n                    <div class=\"political-pagination pagination-div\">\n                        <ul class=\"page-numbers\">\n                            <li><a class=\"previous page-numbers\" (click)=\"previouseFormPage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-left\"></i></span></a></li>\n                            <li *ngFor=\"let page of pagination;\">\n                                <a *ngIf=\"page!=criteria.page\" class=\"page-numbers\"\n                                (click)=\"paginationChangePage(page)\">{{page+1}}</a>\n                                <span *ngIf=\"page==criteria.page\" class=\"page-numbers current\">{{page+1}}</span>\n                            </li>\n                            <li><a class=\"next page-numbers\" (click)=\"nextFormPage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-right\"></i></span></a></li>\n                        </ul>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/page-gov-forms/page-gov-forms.component.ts":
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
var form_service_1 = __webpack_require__("./src/app/services/form.service.ts");
var PageGovFormsComponent = /** @class */ (function () {
    function PageGovFormsComponent(pageService, settingService, formService) {
        this.pageService = pageService;
        this.settingService = settingService;
        this.formService = formService;
        this.criteria = {
            page: 0, start: 0, limit: 25, totalForms: 0,
            sort: 'None', search: 'EmptyNone', category: 'None'
        };
        this.pagination = [];
        this.forms = null;
    }
    PageGovFormsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getFormsSubscription = this.formService.observeForms().subscribe(function (result) {
            if (result.status) {
                _this.forms = result.data;
                _this.criteria.totalForms = result.totalForms;
                _this.pagination = [];
                var count = 0;
                while (count * _this.criteria.limit < _this.criteria.totalForms) {
                    _this.pagination.push(count);
                    count += 1;
                }
            }
        });
        this.formService.getActiveForms(this.criteria);
    };
    PageGovFormsComponent.prototype.formPreview = function (form) {
        if (form.previewUrl === undefined || form.previewUrl === null || form.previewUrl == '')
            return 'assets/img/formPreview/base.jpg';
        else
            return form.previewUrl;
    };
    PageGovFormsComponent.prototype.formOwner = function (form) {
        if (form.owner === undefined || form.owner === null || form.owner == '')
            return 'DPST.';
        else
            return form.owner;
    };
    PageGovFormsComponent.prototype.dateFromObjectId = function (objectId) {
        var date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    };
    PageGovFormsComponent.prototype.changeFormCategory = function (category) {
        if (category == 'All forms')
            this.criteria.category = 'None';
        else
            this.criteria.category = category;
        this.formService.getActiveForms(this.criteria);
    };
    PageGovFormsComponent.prototype.goToForm = function (form) {
        this.pageService.setPage('Government form');
        this.pageService.setSubpage(form.accessCode);
        this.formService.setMode();
    };
    PageGovFormsComponent.prototype.formLimitChange = function (limit) {
        this.criteria.page = 0;
        this.criteria.start = 0;
        this.criteria.limit = limit;
        this.criteria.totalForms = 0;
        this.pagination = [];
        this.forms = null;
        this.formService.getActiveForms(this.criteria);
    };
    PageGovFormsComponent.prototype.paginationChangePage = function (page) {
        this.criteria.page = page;
        this.criteria.start = page * this.criteria.limit;
        this.formService.getActiveForms(this.criteria);
    };
    PageGovFormsComponent.prototype.previouseFormPage = function () {
        if (this.criteria.page > 0) {
            this.criteria.page -= 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.formService.getActiveForms(this.criteria);
        }
    };
    PageGovFormsComponent.prototype.nextFormPage = function () {
        if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalForms) {
            this.criteria.page += 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.formService.getActiveForms(this.criteria);
        }
    };
    PageGovFormsComponent.prototype.formSortChange = function (sort) {
        this.criteria.sort = sort;
        this.formService.getActiveForms(this.criteria);
    };
    PageGovFormsComponent.prototype.formSearch = function (keyword) {
        keyword = keyword.trim();
        if ((this.criteria.search == 'EmptyNone' && keyword == '') || this.criteria.search == keyword) { }
        else if (keyword == '') {
            this.criteria.search = 'EmptyNone';
            this.formService.getActiveForms(this.criteria);
        }
        else {
            this.criteria.search = keyword;
            this.formService.getActiveForms(this.criteria);
        }
    };
    PageGovFormsComponent.prototype.ngOnDestroy = function () {
        this.getFormsSubscription.unsubscribe();
    };
    PageGovFormsComponent = __decorate([
        core_1.Component({
            selector: 'app-page-gov-forms',
            template: __webpack_require__("./src/app/page-gov-forms/page-gov-forms.component.html"),
            styles: [__webpack_require__("./src/app/page-gov-forms/page-gov-forms.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService,
            form_service_1.FormService])
    ], PageGovFormsComponent);
    return PageGovFormsComponent;
}());
exports.PageGovFormsComponent = PageGovFormsComponent;


/***/ }),

/***/ "./src/app/page-home/page-home.component.css":
/***/ (function(module, exports) {

module.exports = ".political-main-content {\r\n    padding: 120px 0px 40px 0px;\r\n}\r\n\r\n@media screen and (max-width:1200px) {\r\n    .political-main-content {\r\n        padding: 50px 0px 40px 0px;\r\n    }  \r\n}"

/***/ }),

/***/ "./src/app/page-home/page-home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-banner\">\r\n\t\t<div class=\"political-banner-layer\">\r\n\t\t\t  <span class=\"political-banner-transparent\"></span>\r\n\t\t\t  <img src=\"assets/img/bg/02.jpg\" alt=\"\" width=\"100%\" height=\"auto\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-5\">\r\n                    <div class=\"political-banner-thumb\">\r\n                        <figure><img src=\"extra-images/banner-thumb-img1.jpg\" alt=\"\"></figure>\r\n                        <div class=\"political-banner-thumb-text\" style=\"padding:15px 45px;\">\r\n                            <h2 style=\"line-height:35px; color:#ffffff;\">DPST Manager, a Choice for Smarter Future</h2>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"political-banner-caption\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 right\">\r\n                        <div class=\"political-banner-form\">\r\n\r\n                            <!-- Log in welcome -->\r\n                            <h1 style=\"line-height:55px;\">{{'Welcome to DPST Database Manager' | translate:settingService.getLanguage() }}</h1>\r\n                            <ng-container *ngIf=\"userinfoService.getUserinfo()===null\">\r\n                                <h2>{{'Register to our community' | translate:settingService.getLanguage() }}: </h2>\r\n                                <form>\r\n                                    <ul>\r\n                                        <li><input type=\"text\" value=\"\" placeholder=\"{{'Your name' | translate:settingService.getLanguage() }}\"></li>\r\n                                        <li><input type=\"email\" value=\"\" placeholder=\"{{'Your E-mail address' | translate:settingService.getLanguage() }}\"></li>\r\n                                        <li><input type=\"submit\" value=\"{{'Register' | translate:settingService.getLanguage() }}\" (click)=\"pageService.setPage('Register')\"></li>\r\n                                    </ul>\r\n                                </form>\r\n                            </ng-container>\r\n                        \r\n                      </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"political-main-content\" style=\"padding-bottom:0;\">\r\n\t\t<div class=\"political-main-section political-service-listfull\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                  <div class=\"political-service-list\">\r\n\r\n                      <ul>\r\n                          <li>\r\n                              <i class=\"icon church-interface\"></i>\r\n                              <h3>{{'About Application' | translate:settingService.getLanguage() }}</h3>\r\n                              <p>\r\n                                  This web application will help DPST to manage the data of DPST students and teachers\r\n                                  <strong>faster, easier, and efficiently</strong>.\r\n                              </p>\r\n                          </li>\r\n                          <li>\r\n                              <i class=\"icon church-arrow2\"></i>\r\n                              <h3>{{'Mission' | translate:settingService.getLanguage() }}</h3>\r\n                              <p>\r\n                                  We hope to help building the DPST community, \r\n                                  and this application can connect DPST people with others.\r\n                              </p>\r\n                          </li>\r\n                          <li>\r\n                              <i class=\"icon church-eye\"></i>\r\n                              <h3>{{'How to Use' | translate:settingService.getLanguage() }}</h3>\r\n                              <p>\r\n                                  It is easy. You just need to register and \r\n                                  <strong style=\"cursor:pointer;\" (click)=\"pageService.setPage('Register')\">become a member</strong>.\r\n                              </p>\r\n                          </li>\r\n                      </ul>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                  <figure class=\"political-service-add\">\r\n                    <video id=\"intro-video\" width=\"100%\" height=\"auto\" controls>\r\n                      <source src=\"assets/video/thebigdatasolution.com - sm.mp4\" type=\"video/mp4\">\r\n                    </video>\r\n                  </figure>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t\t</div>\r\n</div>"

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

module.exports = "\r\n<div class=\"political-main-content\">\r\n  <div class=\"political-main-section\">\r\n    \r\n    <div class=\"political-fancy-title\">\r\n      <div class=\"container\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <h2>{{'Log In' | translate:settingService.getLanguage() }}</h2>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-3\"></div>\r\n        \r\n        <div class=\"col-md-6\">\r\n          <div class=\"political-contact-form\">\r\n            \r\n            <form #login=\"ngForm\" (ngSubmit)=\"memberLogIn(login)\" ngNativeValidate>\r\n              <ul>\r\n                <li><div class=\"input-label\">{{'Username' | translate:settingService.getLanguage() }}</div>\r\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required></li>\r\n                <li><div class=\"input-label\">{{'Password' | translate:settingService.getLanguage() }}</div>\r\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\r\n                  <div class=\"error-message\"><span *ngIf=\"loginFail\">* {{'Wrong username or password' | translate:settingService.getLanguage() }}</span></div>\r\n                </li>\r\n                <li class=\"last-input\">\r\n                  <input name=\"rememberme\" type=\"checkbox\" ngModel> {{'Remember me' | translate:settingService.getLanguage() }}\r\n                </li>\r\n                <li class=\"last-input\" style=\"text-align:right;\">\r\n                  {{'Forgot' | translate:settingService.getLanguage() }} <a (click)=\"pageService.setPage('Forgot username')\">{{'username' | translate:settingService.getLanguage() }}</a> / \r\n                  <a (click)=\"pageService.setPage('Forgot password')\">{{'password' | translate:settingService.getLanguage() }}</a> ?\r\n                </li>\r\n              </ul>\r\n              <div style=\"text-align:center;\"><input type=\"submit\" value=\"{{'Log In' | translate:settingService.getLanguage() }}\" class=\"\"></div>\r\n            </form>\r\n\r\n          </div>\r\n        </div>\r\n        \r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n</div>"

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

/***/ "./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"userDetail===null\" class=\"political-team political-team-list\">\n  <h3>Loading your data...</h3>\n</div>\n\n<ng-container *ngIf=\"userDetail!==null\">\n  <app-profile-edit-form [userDetail]=\"userDetail\"\n  (userDetailUpdated)=\"userDetailUpdatedDone($event)\"></app-profile-edit-form>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.ts":
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
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageUserEditProfileComponent = /** @class */ (function () {
    function PageUserEditProfileComponent(userinfoService, pageService) {
        this.userinfoService = userinfoService;
        this.pageService = pageService;
        this.userDetail = null;
    }
    PageUserEditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userinfo = Object.assign({}, this.userinfoService.getUserinfo());
        this.userinfoService.getUserDetail(userinfo)
            .then(function (result) {
            if (result !== null && result.status) {
                _this.userDetail = result.data;
            }
        });
    };
    PageUserEditProfileComponent.prototype.userDetailUpdatedDone = function (result) {
        if (result.status) {
            this.pageService.setSubpage('Profile');
        }
    };
    PageUserEditProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-edit-profile',
            template: __webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [userinfo_service_1.UserinfoService,
            page_service_1.PageService])
    ], PageUserEditProfileComponent);
    return PageUserEditProfileComponent;
}());
exports.PageUserEditProfileComponent = PageUserEditProfileComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-history/page-user-history.component.css":
/***/ (function(module, exports) {

module.exports = "th {color:#000000;}\r\ntd {font-weight:300;}\r\n.fa {cursor:pointer;}\r\n.show-per-page, .select-sort, input.search[type=text] {height:38px; padding:3px;}\r\n.show-per-page {width:60px;}\r\n.select-sort {width:190px;}\r\ninput.search[type=text] {\r\n    font-size: 16px;\r\n    border: 1px solid #dfdfdf;\r\n    width: 180px;\r\n    color: #5a5a5a;\r\n    font-weight: 300;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n.top-option {padding:0 15px; float:right;}\r\n.pagination-div {margin:20px 0;}\r\n.back-btn {float:right; margin-bottom:20px;}\r\n"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-history/page-user-history.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"subpage=='History'\" class=\"political-blog-large\">\n\n  <!-- Selection criteria -->\n  <div class=\"political-pagination\" style=\"color:#000; margin:0 0 25px 0;\">\n\n      <div class=\"top-option\">\n        <input #keyword class=\"search\" type=\"text\" (keyup.enter)=\"formSearch(keyword.value)\">\n        <input type=\"submit\" class=\"political-simple-btn\" value=\"Search\" (click)=\"formSearch(keyword.value)\">\n      </div>\n\n      <div class=\"top-option\">\n        Sort by\n        <select class=\"select-sort\" (change)=\"formSortChange($event.target.value)\">\n          <option value=\"None\" selected=\"selected\">None</option>\n          <option value=\"Status increasing\">Status increasing</option>\n          <option value=\"Status decreasing\">Status decreasing</option>\n          <option value=\"Submitted date increasing\">Submitted date increasing</option>\n          <option value=\"Submitted date decreasing\">Submitted date decreasing</option>\n        </select>\n      </div>\n\n      <div class=\"top-option\">\n        Show per page\n        <select class=\"show-per-page\" (change)=\"formLimitChange($event.target.value)\">\n          <option value=\"1\">1</option>\n          <option value=\"10\">10</option>\n          <option value=\"25\" selected=\"selected\">25</option>\n          <option value=\"50\">50</option>\n          <option value=\"100\">100</option>\n        </select>\n      </div>\n        \n  </div>\n\n  <ul class=\"row\">\n    <li class=\"col-md-12\">\n\n      <table><tbody>\n        <tr>\n          <th>Form Name</th>\n          <th>Submitted Date</th>\n          <th>Status</th>\n          <th>Actions</th>\n        </tr>\n\n        <ng-container *ngIf=\"submittedForms===null || submittedForms.length==0\">\n          <tr><td colspan=\"4\">No submitted form found.</td></tr>\n        </ng-container>\n        <ng-container *ngIf=\"submittedForms!==null && submittedForms.length>0\">\n          <tr *ngFor=\"let form of submittedForms;\">\n            <td>{{form.form.nameTH}}</td>\n            <td>{{dateFromObjectId(form._id)}}</td>\n            <td [ngClass]=\"{'ban':form.status=='Not approved', 'pen':form.status=='Pending', 'hello-user':form.status=='Approved'}\">\n              {{form.status}}\n            </td>\n\n            <!-- Approved forms -->\n            <td *ngIf=\"form.status=='Approved'\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewSubmittedForm(form)\"></i>\n            </td>\n            <!-- Pending forms -->\n            <td *ngIf=\"form.status=='Pending'\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewSubmittedForm(form)\"></i>&nbsp;\n              <i class=\"fa fa-pencil-square-o edit-icon\" aria-hidden=\"true\"\n                (click)=\"editSubmittedForm(form)\"></i>&nbsp;\n              <i class=\"fa fa-trash ban\" aria-hidden=\"true\"\n                (click)=\"tryDeleteForm(form)\"></i>\n            </td>\n            <!-- Not approved forms -->\n            <td *ngIf=\"form.status=='Not approved'\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewSubmittedForm(form)\"></i>\n            </td>\n\n          </tr>\n        </ng-container>\n\n      </tbody></table>\n\n      <!-- Pagination -->\n      <div class=\"political-pagination pagination-div\">\n        <ul class=\"page-numbers\">\n            <li><a class=\"previous page-numbers\" (click)=\"previouseFormPage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-left\"></i></span></a></li>\n            <li *ngFor=\"let page of pagination;\">\n              <a *ngIf=\"page!=criteria.page\" class=\"page-numbers\"\n              (click)=\"paginationChangePage(page)\">{{page+1}}</a>\n              <span *ngIf=\"page==criteria.page\" class=\"page-numbers current\">{{page+1}}</span>\n            </li>\n            <li><a class=\"next page-numbers\" (click)=\"nextFormPage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-right\"></i></span></a></li>\n        </ul>\n      </div>\n\n    </li>\n  </ul>\n</div>\n\n<!-- Delete user panel -->\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='Thai'\" class=\"political-blog-large\">\n  <h1 style=\"margin-bottom:20px;\"><strong>คุณกำลังจะทำการ<span class=\"ban\">ลบแบบฟอร์ม</span>ของคุณ</strong></h1>\n  <h3 style=\"margin-bottom:20px;\">แบบฟอร์ม: <span class=\"hello-user\" style=\"font-weight:600;\">{{formOnHand.form.nameTH}}</span></h3>\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"ลบข้อแบบฟอร์ม\" (click)=\"deleteSubmittedForm()\">\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"ยกเลิก\" (click)=\"goBackToSubmittedForm()\">\n</div>\n<div *ngIf=\"subpage=='Try delete' && settingService.getLanguage()=='English'\" class=\"political-blog-large\">\n  <h1 style=\"margin-bottom:20px;\"><strong>You are about to <span class=\"ban\">DELETE</span> your submitted form.</strong></h1>\n  <h3 style=\"margin-bottom:20px;\">Form: <span class=\"hello-user\" style=\"font-weight:600;\">{{formOnHand.form.nameTH}}</span></h3>\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"DELETE FORM\" (click)=\"deleteSubmittedForm()\">\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"Cancel\" (click)=\"goBackToSubmittedForm()\">\n</div>"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-history/page-user-history.component.ts":
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
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var form_service_1 = __webpack_require__("./src/app/services/form.service.ts");
var PageUserHistoryComponent = /** @class */ (function () {
    function PageUserHistoryComponent(socketioService, pageService, settingService, userinfoService, formService) {
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.formService = formService;
        this.criteria = {
            page: 0, start: 0, limit: 25, totalSubmittedForms: 0,
            sort: 'None', search: 'EmptyNone'
        };
        this.pagination = [];
        this.submittedForms = null;
        this.subpage = 'History';
        this.formOnHand = null;
    }
    PageUserHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSubmittedFormsSubscription = this.formService.observeSubmittedForms().subscribe(function (result) {
            if (result.status) {
                _this.submittedForms = result.data;
                _this.criteria.totalSubmittedForms = result.totalSubmittedForms;
                _this.pagination = [];
                var count = 0;
                while (count * _this.criteria.limit < _this.criteria.totalSubmittedForms) {
                    _this.pagination.push(count);
                    count += 1;
                }
            }
        });
        this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    };
    PageUserHistoryComponent.prototype.dateFromObjectId = function (objectId) {
        var date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    };
    PageUserHistoryComponent.prototype.formLimitChange = function (limit) {
        this.criteria.page = 0;
        this.criteria.start = 0;
        this.criteria.limit = limit;
        this.criteria.totalSubmittedForms = 0;
        this.pagination = [];
        this.submittedForms = null;
        this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    };
    PageUserHistoryComponent.prototype.paginationChangePage = function (page) {
        this.criteria.page = page;
        this.criteria.start = page * this.criteria.limit;
        this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    };
    PageUserHistoryComponent.prototype.previouseFormPage = function () {
        if (this.criteria.page > 0) {
            this.criteria.page -= 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
        }
    };
    PageUserHistoryComponent.prototype.nextFormPage = function () {
        if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalSubmittedForms) {
            this.criteria.page += 1;
            this.criteria.start = this.criteria.page * this.criteria.limit;
            this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
        }
    };
    PageUserHistoryComponent.prototype.formSortChange = function (sort) {
        this.criteria.sort = sort;
        this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    };
    PageUserHistoryComponent.prototype.formSearch = function (keyword) {
        keyword = keyword.trim();
        if ((this.criteria.search == 'EmptyNone' && keyword == '') || this.criteria.search == keyword) { }
        else if (keyword == '') {
            this.criteria.search = 'EmptyNone';
            this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
        }
        else {
            this.criteria.search = keyword;
            this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
        }
    };
    PageUserHistoryComponent.prototype.goBackToSubmittedForm = function () { this.subpage = 'History'; this.formOnHand = null; };
    // Delete form process
    PageUserHistoryComponent.prototype.tryDeleteForm = function (form) { this.subpage = 'Try delete'; this.formOnHand = form; };
    PageUserHistoryComponent.prototype.deleteSubmittedForm = function () {
        var _this = this;
        if (this.formOnHand !== null) {
            this.formService.deleteSubmittedForm(this.userinfoService.getUserinfo()._id, this.formOnHand).then(function (result) {
                if (result.status) {
                    _this.formService.getSubmittedForms(_this.userinfoService.getUserinfo()._id, _this.criteria);
                    // this.socketioService.deleteAccount(this.userOnHand._id);
                    _this.formOnHand = null;
                    _this.subpage = 'History';
                }
            });
        }
    };
    // Edit form process
    PageUserHistoryComponent.prototype.editSubmittedForm = function (form) {
        this.pageService.setPage('Government form');
        this.pageService.setSubpage(form.form.accessCode);
        this.formService.setMode('Edit', form);
    };
    // View form process
    PageUserHistoryComponent.prototype.viewSubmittedForm = function (form) {
        this.pageService.setPage('Government form');
        this.pageService.setSubpage(form.form.accessCode);
        this.formService.setMode('View', form);
    };
    PageUserHistoryComponent.prototype.ngOnDestroy = function () {
        this.getSubmittedFormsSubscription.unsubscribe();
    };
    PageUserHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-history',
            template: __webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.css")]
        }),
        __metadata("design:paramtypes", [socketio_service_1.SocketioService,
            page_service_1.PageService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            form_service_1.FormService])
    ], PageUserHistoryComponent);
    return PageUserHistoryComponent;
}());
exports.PageUserHistoryComponent = PageUserHistoryComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel.component.css":
/***/ (function(module, exports) {

module.exports = "li.active a {color:#228ae6; font-weight:600;}"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n\n                <div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-subheader-wrap\">\n                    <h1>หน้าผู้ใช้งาน</h1>\n                    <ul class=\"political-breadcrumb\">\n                        <li><a (click)=\"pageService.setPage('Homepage')\">หน้าเเรก</a></li>\n                        <li>หน้าผู้ใช้งาน</li>\n                        <li class=\"active\">{{subpageTranslation()}}</li>\n                    </ul>\n                </div>\n                <div *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-subheader-wrap\">\n                    <h1>User Panel</h1>\n                    <ul class=\"political-breadcrumb\">\n                        <li><a (click)=\"pageService.setPage('Homepage')\">Homepage</a></li>\n                        <li>User Panel</li>\n                        <li class=\"active\">{{pageService.getSubpage()}}</li>\n                    </ul>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <!-- Admin panel sidbar -->\n                <aside class=\"col-md-3\">\n                    <div *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"widget widget_cetagories\">\n                        <h2 class=\"political-widget-heading\">User Menu</h2>\n                        <ul>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Profile'}\">\n                                <a (click)=\"pageService.setSubpage('Profile')\">ประวัติส่วนตัว</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Edit profile'}\">\n                                <a (click)=\"pageService.setSubpage('Edit profile')\">เเก้ไขประวัติส่วนตัว</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='History'}\">\n                                <a (click)=\"pageService.setSubpage('History')\">ประวัติการใช้งาน</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Setting'}\">\n                                <a (click)=\"pageService.setSubpage('Setting')\">ตั้งค่า</a></li>\n                        </ul>\n                    </div>\n                    <div *ngIf=\"settingService.getLanguage()=='English'\" class=\"widget widget_cetagories\">\n                        <h2 class=\"political-widget-heading\">User Menu</h2>\n                        <ul>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Profile'}\">\n                                <a (click)=\"pageService.setSubpage('Profile')\">Profile</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Edit profile'}\">\n                                <a (click)=\"pageService.setSubpage('Edit profile')\">Edit Profile</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='History'}\">\n                                <a (click)=\"pageService.setSubpage('History')\">History</a></li>\n                            <li [ngClass]=\"{'active':pageService.getSubpage()=='Setting'}\">\n                                <a (click)=\"pageService.setSubpage('Setting')\">Setting</a></li>\n                        </ul>\n                    </div>\n                </aside>\n\n                <!-- User panel subpages -->\n                <div class=\"col-md-9\">\n\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Profile'\">\n                        <app-page-user-profile></app-page-user-profile>\n                    </ng-container>\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Edit profile'\">\n                        <app-page-user-edit-profile></app-page-user-edit-profile>\n                    </ng-container>\n                    <ng-container *ngIf=\"pageService.getSubpage()=='History'\">\n                        <app-page-user-history></app-page-user-history>\n                    </ng-container>\n                    <ng-container *ngIf=\"pageService.getSubpage()=='Setting'\">\n                        <app-page-user-setting></app-page-user-setting>\n                    </ng-container>\n\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel.component.ts":
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
var PageUserPanelComponent = /** @class */ (function () {
    function PageUserPanelComponent(pageService, settingService) {
        this.pageService = pageService;
        this.settingService = settingService;
    }
    PageUserPanelComponent.prototype.ngOnInit = function () {
    };
    PageUserPanelComponent.prototype.subpageTranslation = function () {
        if (this.pageService.getSubpage() == 'Profile')
            return 'ประวัติส่วนตัว';
        else if (this.pageService.getSubpage() == 'Edit profile')
            return 'เเก้ไขประวัติส่วนตัว';
        else if (this.pageService.getSubpage() == 'History')
            return 'ประวัติการใช้งาน';
        else if (this.pageService.getSubpage() == 'Setting')
            return 'ตั้งค่า';
        else
            return '';
    };
    PageUserPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-panel',
            template: __webpack_require__("./src/app/page-user-panel/page-user-panel.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-panel.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            setting_service_1.SettingService])
    ], PageUserPanelComponent);
    return PageUserPanelComponent;
}());
exports.PageUserPanelComponent = PageUserPanelComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-profile/page-user-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-user-panel/page-user-profile/page-user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"userDetail===null\" class=\"political-team political-team-list\">\n  <h3>Loading your data...</h3>\n</div>\n\n<ng-container *ngIf=\"userDetail!==null\">\n  <app-profile-form [userDetail]=\"userDetail\"></app-profile-form>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-profile/page-user-profile.component.ts":
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
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageUserProfileComponent = /** @class */ (function () {
    function PageUserProfileComponent(userinfoService) {
        this.userinfoService = userinfoService;
        this.userDetail = null;
    }
    PageUserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userinfo = Object.assign({}, this.userinfoService.getUserinfo());
        this.userinfoService.getUserDetail(userinfo)
            .then(function (result) {
            if (result !== null && result.status) {
                _this.userDetail = result.data;
            }
        });
    };
    PageUserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-profile',
            template: __webpack_require__("./src/app/page-user-panel/page-user-profile/page-user-profile.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-profile/page-user-profile.component.css")]
        }),
        __metadata("design:paramtypes", [userinfo_service_1.UserinfoService])
    ], PageUserProfileComponent);
    return PageUserProfileComponent;
}());
exports.PageUserProfileComponent = PageUserProfileComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-setting/page-user-setting.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-user-panel/page-user-setting/page-user-setting.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  page-user-setting works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-setting/page-user-setting.component.ts":
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
var PageUserSettingComponent = /** @class */ (function () {
    function PageUserSettingComponent() {
    }
    PageUserSettingComponent.prototype.ngOnInit = function () {
    };
    PageUserSettingComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-setting',
            template: __webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageUserSettingComponent);
    return PageUserSettingComponent;
}());
exports.PageUserSettingComponent = PageUserSettingComponent;


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
            + criteria.sort + '/' + criteria.search.replace(/\//g, '');
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
    AdminService.prototype.updateUserPrivilage = function (userId, updatedUserinfo) {
        var url = this.apiUrl + '/updateuserprivilage', input = { userId: userId, updatedUserinfo: updatedUserinfo };
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

/***/ "./src/app/services/form.service.ts":
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
var FormService = /** @class */ (function () {
    function FormService(http) {
        this.http = http;
        this.apiUrl = globals_1.ipHost + '/form';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.subjectForms = new Subject_1.Subject();
        this.subjectSubmittedForms = new Subject_1.Subject();
        this.mode = 'New'; // New, Edit, View
        this.form = null;
        this.role = 'User'; // User, Admin
    }
    FormService.prototype.setMode = function (mode, form, role) {
        if (mode === void 0) { mode = 'New'; }
        if (form === void 0) { form = null; }
        if (role === void 0) { role = 'User'; }
        if (form === null) {
            this.mode = 'New';
            this.form = null;
            this.role = 'User';
        }
        else {
            this.mode = mode;
            this.form = form;
            this.role = role;
        }
    };
    FormService.prototype.getMode = function () { return this.mode; };
    FormService.prototype.getForm = function () { return this.form; };
    FormService.prototype.getRole = function () { return this.role; };
    FormService.prototype.getActiveForms = function (criteria) {
        var _this = this;
        var url = this.apiUrl + '/getactiveforms/' + criteria.category + '/'
            + criteria.start + '/' + criteria.limit + '/'
            + criteria.sort + '/' + criteria.search.replace(/\//g, '');
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            _this.subjectForms.next(result);
        })
            .catch(function (err) {
            _this.subjectForms.next(err);
        });
    };
    FormService.prototype.getFormDetail = function (accessCode) {
        var url = this.apiUrl + '/getformdetail/' + accessCode;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    FormService.prototype.getSubmittedForms = function (userId, criteria) {
        var _this = this;
        var url = this.apiUrl + '/getsubmittedforms/' + userId + '/'
            + criteria.start + '/' + criteria.limit + '/'
            + criteria.sort + '/' + criteria.search.replace(/\//g, '');
        ;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            _this.subjectSubmittedForms.next(result);
        })
            .catch(function (err) {
            _this.subjectSubmittedForms.next(err);
        });
    };
    FormService.prototype.submitForm = function (userId, formId, formValue) {
        var url = this.apiUrl + '/submit', input = { userId: userId, formId: formId, formValue: formValue };
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
    FormService.prototype.deleteSubmittedForm = function (userId, form) {
        var url = this.apiUrl + '/deletesubmittedform', input = { userId: userId, formId: form._id };
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
    FormService.prototype.editSubmittedGovForm = function (formId, formValue) {
        var url = this.apiUrl + '/editform', input = { formId: formId, formValue: formValue };
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
    FormService.prototype.observeForms = function () {
        return this.subjectForms.asObservable();
    };
    FormService.prototype.observeSubmittedForms = function () {
        return this.subjectSubmittedForms.asObservable();
    };
    FormService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FormService);
    return FormService;
}());
exports.FormService = FormService;


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
    SocketioService.prototype.accountPrivilage = function (userId) {
        this.socket.emit('account-privilage', userId);
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
    UserinfoService.prototype.getUserDetail = function (userinfo) {
        var url = this.apiUrl + '/getuserdetail/' + userinfo._id;
        return this.http.get(url).toPromise()
            .then(function (response) {
            var result = response.json();
            if (globals_1.testing)
                console.log(result.message);
            return result;
        })
            .catch(function (err) { return null; });
    };
    UserinfoService.prototype.updateUserDetail = function (userId, updatedUserDetail) {
        var url = this.apiUrl + '/updateuserdetail', input = { userId: userId, updatedUserDetail: updatedUserDetail };
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