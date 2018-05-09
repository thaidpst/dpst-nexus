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

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var page_check_status_component_1 = __webpack_require__("./src/app/page-check-status/page-check-status.component.ts");
var page_contact_component_1 = __webpack_require__("./src/app/page-contact/page-contact.component.ts");
var page_home_component_1 = __webpack_require__("./src/app/page-home/page-home.component.ts");
var page_login_component_1 = __webpack_require__("./src/app/page-login/page-login.component.ts");
var page_register_component_1 = __webpack_require__("./src/app/page-register/page-register.component.ts");
var routes = [
    { path: '', component: page_home_component_1.PageHomeComponent },
    { path: 'login', component: page_login_component_1.PageLoginComponent },
    { path: 'register', component: page_register_component_1.PageRegisterComponent },
    { path: 'check-status', component: page_check_status_component_1.PageCheckStatusComponent },
    { path: 'contact', component: page_contact_component_1.PageContactComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-main-wrapper\">\n\n  <app-header-navbar></app-header-navbar>\n\n  <router-outlet></router-outlet>\n\n  <!-- User panel -->\n  <ng-container *ngIf=\"userinfoService.getUserinfo()!==null\">\n  </ng-container>\n\n  <!-- Admin panel -->\n  <ng-container *ngIf=\"pageService.getPage()=='Admin panel' && userinfoService.getUserinfo()!==null && userinfoService.getUserinfo().level>=8\">\n    <app-page-admin-panel></app-page-admin-panel>\n  </ng-container>\n  \n  <!-- <div>{{socketioService.getOnlineUsers()}}</div> -->  \n</div>\n\n<app-footer></app-footer>\n"

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
var admin_service_1 = __webpack_require__("./src/app/services/admin.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var auth_guard_service_1 = __webpack_require__("./src/app/services/auth-guard.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var language_service_1 = __webpack_require__("./src/app/languages/language.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
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
var translate_pipe_1 = __webpack_require__("./src/app/languages/translate.pipe.ts");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var page_admin_panel_routing_module_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-panel-routing.module.ts");
var page_user_panel_routing_module_1 = __webpack_require__("./src/app/page-user-panel/page-user-panel-routing.module.ts");
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
                translate_pipe_1.TranslatePipe
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                page_user_panel_routing_module_1.PageUserPanelRoutingModule,
                page_admin_panel_routing_module_1.PageAdminPanelRoutingModule,
                app_routing_module_1.AppRoutingModule
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
                auth_guard_service_1.AuthGuardService
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

module.exports = ".political-footer-one {\n    padding-top: 0;\n    background: #0e0e0e;\n}"

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

module.exports = ".political-team-list-wrap .political-team-info > li {border:none;}\n\nul {list-style-type:none;}\n\n::-webkit-input-placeholder {color:#b9b9b9;}\n\n:-ms-input-placeholder {color:#b9b9b9;}\n\n::-ms-input-placeholder {color:#b9b9b9;}\n\n::placeholder {color:#b9b9b9;}\n\n:-ms-input-placeholder {color:#b9b9b9;}\n\n::-ms-input-placeholder {color:#b9b9b9;}\n\n.profile-input {\n    background: #ffffff; \n    border: 1px solid #a3a3a3; \n    width: 55%; \n    margin-left: 5px;\n}\n\n.profile-input[type=text] {color:#000000;}\n\nli.submit-li {width:100% !important; text-align:center; margin-top:20px;}\n\nselect {\n    width: calc(55% + 32px);\n    padding: 2px 12px;\n    height: 32px;\n    margin-left: 5px;\n    color: #000000;\n    background: #ffffff;\n    border: 1px solid #a3a3a3; \n}\n\n@media (max-width: 767px) {\n    .full-view-panel {width:100%;}\n}\n"

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

module.exports = ".political-team-list-wrap .political-team-info > li {width:100%;}\n\nul {list-style-type:none;}\n\n::-webkit-input-placeholder {color:#b9b9b9;}\n\n:-ms-input-placeholder {color:#b9b9b9;}\n\n::-ms-input-placeholder {color:#b9b9b9;}\n\n::placeholder {color:#b9b9b9;}\n\n:-ms-input-placeholder {color:#b9b9b9;}\n\n::-ms-input-placeholder {color:#b9b9b9;}\n\ni, strong {\n\tfloat: left;\n}\n\n.profile-input {\n    background: #ffffff; \n    border: 1px solid #a3a3a3; \n    width: 100%; \n}\n\n.profile-input[type=text] {color:#000000;}\n\n.profile-about {width:100%; height:80px; color:#000000;}\n\n.profile-ad1, .profile-ad2 {margin:3px 0;}\n\n.profile-ad1 {width:100%;}\n\n.profile-ad2 {width:calc(50% - 2.5px);}\n\n@media (max-width: 767px) {\n    .full-view-panel {width:100%;}\n}\n"

/***/ }),

/***/ "./src/app/forms/profile-edit-form/profile-edit-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-team political-team-list\">\n  <form #editProfile=\"ngForm\" (ngSubmit)=\"editProfileDetail(editProfile)\">\n    <ul class=\"row\">\n      <li class=\"col-md-12 full-view-panel\">\n        <div class=\"political-team-list-wrap\">\n          <figure><img [src]=\"userProfileImage()\" alt=\"Profile image not available\"></figure>\n          <div class=\"political-team-list-text\">\n            <h2 style=\"margin-bottom:15px;\">{{userDetail.firstname}} {{userDetail.lastname}}</h2>\n            <span style=\"float:left;\">{{'Position' | translate:settingService.getLanguage() }}: </span>\n              <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"position\" [ngModel]=\"defaultValue(userDetail.position)\" placeholder=\"{{'Your position' | translate:settingService.getLanguage() }}\" ngModel></span>\n            <p style=\"float:none; margin:5px 0 10px 0;\">\n              <textarea class=\"profile-input profile-about\" name=\"about\" [ngModel]=\"defaultValue(userDetail.about)\" placeholder=\"{{'About you' | translate:settingService.getLanguage() }}\" ngModel></textarea>\n            </p>\n            <ul class=\"political-team-info\">\n              <li><i class=\"fa fa-globe\"></i><strong>{{'DPST #' | translate:settingService.getLanguage() }}</strong>\n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"dpstYear\" [ngModel]=\"defaultValue(userDetail.dpstYear)\" placeholder=\"{{'Your DPST #' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-graduation-cap\"></i><strong>{{'Education' | translate:settingService.getLanguage() }}:</strong>\n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"education\" [ngModel]=\"defaultValue(userDetail.education)\" placeholder=\"{{'Your education' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-ravelry\"></i><strong>{{'Major' | translate:settingService.getLanguage() }}:</strong>\n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"major\" [ngModel]=\"defaultValue(userDetail.mojor)\" placeholder=\"{{'Your field of study' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-book\"></i><strong>{{'School/University' | translate:settingService.getLanguage() }}:</strong>\n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"school\" [ngModel]=\"defaultValue(userDetail.school)\" placeholder=\"{{'Your school/university' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-briefcase\"></i><strong>{{'Workplace' | translate:settingService.getLanguage() }}:</strong> \n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"workplace\" [ngModel]=\"defaultValue(userDetail.workplace)\" placeholder=\"{{'Your workplace' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-envelope\"></i><strong>{{'E-mail' | translate:settingService.getLanguage() }}:</strong> <a [href]=\"'mailto:'+userDetail.email\">{{userDetail.email}}</a></li>\n              <li><i class=\"fa fa-phone\"></i><strong>{{'Phone' | translate:settingService.getLanguage() }}:</strong> \n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"phone\" [ngModel]=\"defaultValue(userDetail.phone)\" placeholder=\"{{'Your telephone number' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-comments\"></i><strong>Line ID:</strong>\n                <span style=\"display:block; overflow:hidden; padding-left: 5px\"><input class=\"profile-input\" type=\"text\" name=\"lineId\" [ngModel]=\"defaultValue(userDetail.lineId)\" placeholder=\"{{'Your Line ID' | translate:settingService.getLanguage() }}\" ngModel></span></li>\n              <li><i class=\"fa fa-home\"></i><strong>{{'Address' | translate:settingService.getLanguage() }}:</strong>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address1\" [ngModel]=\"defaultValue(userDetail.address1)\" placeholder=\"{{'Your address' | translate:settingService.getLanguage() }}\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"address2\" [ngModel]=\"defaultValue(userDetail.address2)\" placeholder=\"{{'Your address line 2' | translate:settingService.getLanguage() }}\" ngModel>\n                <br><input class=\"profile-input profile-ad2\" type=\"text\" name=\"province\" [ngModel]=\"defaultValue(userDetail.province)\" placeholder=\"{{'Province/State' | translate:settingService.getLanguage() }}\" ngModel> \n                <input class=\"profile-input profile-ad2\" type=\"text\" name=\"zip\" [ngModel]=\"defaultValue(userDetail.zip)\" placeholder=\"{{'ZIP code' | translate:settingService.getLanguage() }}\" ngModel>\n                <br><input class=\"profile-input profile-ad1\" type=\"text\" name=\"country\" [ngModel]=\"defaultValue(userDetail.country)\" placeholder=\"{{'Country' | translate:settingService.getLanguage() }}\" ngModel>\n              </li>\n              <li>\n                <input class=\"political-simple-btn\" type=\"submit\" value=\"{{'Update your profile' | translate:settingService.getLanguage() }}\">\n              </li>\n            </ul>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </form>\n</div>\n"

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

module.exports = ".political-team-list-wrap .political-team-info > li {width:100%;}\n\n@media (max-width: 767px) {\n    .full-view-panel {width:100%;}\n}\n"

/***/ }),

/***/ "./src/app/forms/profile-form/profile-form.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-team political-team-list\">\n  <ul class=\"row\">\n    <li class=\"col-md-12 full-view-panel\">\n      <div class=\"political-team-list-wrap\">\n        <figure><img [src]=\"userProfileImage()\" alt=\"Profile image not available\"></figure>\n        <div class=\"political-team-list-text\">\n          <h2>{{userDetail.firstname}} {{userDetail.lastname}}</h2>\n          <span>{{'Position' | translate:settingService.getLanguage() }}: {{viewUserPosition()}}</span>\n          <p style=\"float:none; margin:5px 0 10px 0;\">{{'About' | translate:settingService.getLanguage() }}: {{viewUserAbout()}}</p>\n          <ul class=\"political-team-info\">\n            <li><i class=\"fa fa-globe\"></i><strong>{{'DPST #' | translate:settingService.getLanguage() }}</strong> {{userDetail.dpstYear}}</li>\n            <li><i class=\"fa fa-graduation-cap\"></i><strong>{{'Education' | translate:settingService.getLanguage() }}:</strong> {{userDetail.education}}</li>\n            <li><i class=\"fa fa-ravelry\"></i><strong>{{'Major' | translate:settingService.getLanguage() }}:</strong> {{userDetail.major}}</li>\n            <li><i class=\"fa fa-book\"></i><strong>{{'School/University' | translate:settingService.getLanguage() }}:</strong> {{userDetail.school}}</li>\n            <li><i class=\"fa fa-briefcase\"></i><strong>{{'Workplace' | translate:settingService.getLanguage() }}:</strong> {{userDetail.workplace}}</li>\n            <li><i class=\"fa fa-envelope\"></i><strong>{{'E-mail' | translate:settingService.getLanguage() }}:</strong> <a [href]=\"'mailto:'+userDetail.email\">{{userDetail.email}}</a></li>\n            <li><i class=\"fa fa-phone\"></i><strong>{{'Phone' | translate:settingService.getLanguage() }}:</strong> <span>{{userDetail.phone}}</span></li>\n            <li><i class=\"fa fa-comments\"></i><strong>Line ID:</strong> <span>{{userDetail.lineId}}</span></li>\n            <li><i class=\"fa fa-home\"></i><strong>{{'Address' | translate:settingService.getLanguage() }}:</strong>\n              <br>{{userDetail.address1}}\n              <ng-container *ngIf=\"userDetail.address2!==undefined && userDetail.address2!=''\"><br>{{userDetail.address2}}</ng-container>\n              <br>{{userDetail.province}} {{userDetail.zip}}\n              <br>{{userDetail.country}}\n            </li>\n          </ul>\n        </div>\n      </div>\n    </li>\n  </ul>\n</div>"

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

/***/ "./src/app/header-navbar/header-navbar.component.css":
/***/ (function(module, exports) {

module.exports = ".logo img {\n    width: 213px !important;\n}\n\n.political-main-header, .sub-menu.level-2 {\n    -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\n            box-shadow: 0 0 8px rgba(0,0,0,0.4);\n}\n\n.sub-menu.level-2 {margin: 0;}\n\n.pen {color:orange !important; font-weight:600 !important;}\n\n@media screen and (max-width: 990px) {\n    .menu.navbar.navbar-default {\n        -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.4);\n                box-shadow: 0 0 8px rgba(0,0,0,0.4);\n    }\n}\n\n@media screen and (max-width: 480px) {\n    .logo {\n        padding: 25px 0 0 0;\n    }\n    .menu-link span {\n        margin: 20px 0;\n    }\n    .navbar {\n        top: 129px;\n    }\n}"

/***/ }),

/***/ "./src/app/header-navbar/header-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"political-header\" class=\"political-header-one\">\n    <div class=\"political-main-header\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <aside class=\"col-md-3\">\n                    <a routerLink=\"/\" class=\"logo\"><img src=\"assets/img/logo/base.png\" alt=\"\"></a>\n                </aside>\n\n                <aside class=\"col-md-9\">\n                    <div class=\"political-navigation\">\n                        <a href=\"#menu\" class=\"menu-link active\" (click)=\"unactiveSubMenu()\">\n                            <span style=\"margin-right:0;\"></span>\n                        </a>\n                        <nav id=\"menu\" class=\"menu navbar navbar-default\">\n                            <ul class=\"level-1 navbar-nav\">\n\n                                <!-- Homepage -->\n                                <li routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\"><a routerLink=\"/\" (click)=\"unactive();\">\n                                    {{'HomePage' | translate:settingService.getLanguage() }}\n                                </a></li>\n\n                              <ng-container *ngIf=\"userinfoService.getUserinfo() === null\">\n                                <!-- Log in -->\n                                <li routerLinkActive=\"active\">\n                                    <a routerLink=\"/login\" (click)=\"unactive();\">\n                                        {{'Log in' | translate:settingService.getLanguage() }}\n                                    </a>\n                                </li>\n\n                                <!-- Register -->\n                                <li routerLinkActive=\"active\">\n                                    <a routerLink=\"/register\" (click)=\"unactive();\">\n                                        {{'Register' | translate:settingService.getLanguage() }}\n                                    </a>\n                                </li>\n                              </ng-container>\n\n                              <ng-container *ngIf=\"userinfoService.getUserinfo() !== null\">\n                                <!-- Check status -->\n                                <li routerLinkActive=\"active\" *ngIf=\"userinfoService.getUserinfo().status!='Active'\">\n                                    <a>\n                                        {{'Status' | translate:settingService.getLanguage() }}:\n                                            <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending'}\">{{userinfoService.getUserinfo().status}}</span>\n                                    </a><span class=\"has-subnav status-nav\" (click)=\"toggleSubnav('.status-nav')\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2 status-nav\">\n                                        <li><a routerLink=\"/check-status\" (click)=\"unactive();\">\n                                            {{'What is this?' | translate:settingService.getLanguage() }}\n                                        </a></li>\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\n                                            {{'Log out' | translate:settingService.getLanguage() }}\n                                        </a></li>\n                                    </ul>\n                                </li>\n\n                                <!-- User panel -->\n                                <li routerLinkActive=\"active\" *ngIf=\"userinfoService.getUserinfo().status=='Active'\">\n                                    <a>\n                                        {{'Hello,' | translate:settingService.getLanguage() }}\n                                            <span class=\"hello-user\">{{userinfoService.getUserinfo().username}}</span>\n                                    </a><span class=\"has-subnav profile-nav\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2 profile-nav\">\n                                        <li routerLinkActive=\"active\"><a routerLink=\"/user-panel/profile\" (click)=\"unactive();\">\n                                            {{'Profile' | translate:settingService.getLanguage() }}\n                                        </a></li>\n                                        <li routerLinkActive=\"active\"><a routerLink=\"/user-panel/history\" (click)=\"unactive();\">\n                                            {{'History' | translate:settingService.getLanguage() }}\n                                        </a></li>\n\n                                        <!-- Admin panel -->\n                                        <li routerLinkActive=\"active\" *ngIf=\"userinfoService.getUserinfo().level >= 8\">\n                                            <a routerLink=\"/admin-panel/user-table\" (click)=\"unactive();\" style=\"font-weight:600;\">\n                                                Admin Panel\n                                            </a>\n                                        </li>\n                                        <li><a (click)=\"memberLogOut(); unactive();\">\n                                            {{'Log out' | translate:settingService.getLanguage() }}\n                                        </a></li>\n                                    </ul>\n                                </li>\n\n                                <!-- Forms -->\n                                <li routerLinkActive=\"active\" *ngIf=\"userinfoService.getUserinfo().status=='Active'\">\n                                    <a routerLink=\"/forms\" (click)=\"unactive();\">\n                                        {{'Forms' | translate:settingService.getLanguage() }}\n                                    </a>\n                                </li>\n                              </ng-container>\n\n                                <!-- Contact -->\n                                <li routerLinkActive=\"active\"><a routerLink=\"/contact\" (click)=\"unactive();\">\n                                    {{'Contact Us' | translate:settingService.getLanguage() }}\n                                </a></li>\n\n                                <!-- Language -->\n                                <!-- <li>\n                                    <a>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">เลือกภาษา</ng-container>\n                                        <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Language</ng-container>\n                                    </a><span class=\"has-subnav\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2\">\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาไทย</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">Thai</ng-container>\n                                        </a></li>\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='Thai'\">ภาษาอังกฤษ</ng-container>\n                                            <ng-container *ngIf=\"settingService.getLanguage()=='English'\">English</ng-container>\n                                        </a></li>\n                                    </ul>\n                                </li> -->\n                                <li>\n                                    <a (click)=\"toggleSubnav('.language')\">Language</a>\n                                    <span class=\"has-subnav language\" style=\"pointer-events:none;\"><i class=\"fa fa-angle-down\"></i></span>\n                                    <ul class=\"sub-menu level-2 language\">\n                                        <li><a (click)=\"settingService.setLanguage('Thai'); unactive();\">Thai</a></li>\n                                        <li><a (click)=\"settingService.setLanguage('English'); unactive();\">English</a></li>\n                                    </ul>\n                                </li>\n\n                            </ul>\n                        </nav>\n                    </div>\n                </aside>\n\n            </div>\n        </div>\n    </div>\n</header>"

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
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var d3 = __webpack_require__("./node_modules/d3/index.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var HeaderNavbarComponent = /** @class */ (function () {
    function HeaderNavbarComponent(elementRef, socketioService, settingService, userinfoService, cookieService, router) {
        this.elementRef = elementRef;
        this.socketioService = socketioService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
        this.router = router;
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
        this.cookieService.clearUserLoginCookie();
        this.router.navigate(['/']);
    };
    HeaderNavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-header-navbar',
            template: __webpack_require__("./src/app/header-navbar/header-navbar.component.html"),
            styles: [__webpack_require__("./src/app/header-navbar/header-navbar.component.css")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            socketio_service_1.SocketioService,
            setting_service_1.SettingService,
            userinfo_service_1.UserinfoService,
            cookie_service_1.CookieService,
            router_1.Router])
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
    '.': '',
    '+66 2 381 0750': '02 381 0750',
    '+66 2 392 4021': '02 392 4021',
    '5 letters minimum': 'อย่างต่ำ 5 ตัวอักษร',
    'about': 'เกี่ยวกับ',
    'about application': 'เกี่ยวกับ Application',
    'about you': 'เกี่ยวกับคุณ',
    'address': 'ที่อยู่',
    'after we received your message, we will reply to you within 2 business days. thank you!': 'หลังจากที่เราได้รับข้อความของคุณแล้ว เราจะติดต่อกลับภายใน 2 วันทำการ',
    'call us': 'โทรหาเรา',
    'cancel': 'ยกเลิก',
    'confirm password': 'ยืนยันรหัสผ่าน',
    'contact us': 'ติดต่อเรา',
    'country': 'ประเทศ',
    'delete': 'ลบ',
    'delete a user': 'ลบบัญชีผู้ใช้',
    'dpst #': 'พสวท. รุ่นที่',
    'education': 'ระดับการศึกษา',
    'e-mail': 'อีเมล',
    'e-mail address': 'ที่อยู่อีเมล',
    'e-mail is already in use': 'อีเมลนี้ได้ถูกใช้งานแล้ว',
    'e-mail us': 'อีเมลหาเรา',
    'edit profile': 'แก้ไขประวัติส่วนตัว',
    'fax us': 'แฟกซ์หาเรา',
    'first name': 'ชื่อจริง',
    'forgot': 'ลืม',
    'forms': 'แบบฟอร์ม',
    'get in touch': 'ติดต่อเรา',
    'go back': 'ย้อนกลับ',
    'hello,': 'สวัสดี',
    'history': 'ประวัติการใช้งาน',
    'homepage': 'หน้าแรก',
    'how to use': 'วิธีใช้งาน',
    'ipst<br>924 sukhumvit rd<br>phra khanong, khlong toei<br>bangkok 10110 thailand': 'สสวท.<br>924 ถนนสุขุมวิท<br>แขวงพระโขนง เขตคลองเตย<br>กรุงเทพมหานคร 10110',
    'if you have any concerns, please ': 'หากท่านมีคำถามหรือข้อสงสัย กรุณา',
    'last name': 'นามสกุล',
    'log in': 'เข้าสู่ระบบ',
    'log out': 'ออกจากระบบ',
    'major': 'วิชาเอก',
    'meet us': 'พบปะเรา',
    'message': 'ข้อความ',
    'message us now': 'ส่งข้อความหาเราตอนนี้',
    'mission': 'เป้าหมาย',
    'password': 'รหัสผ่าน',
    'password does not match': 'รหัสผ่านไม่ตรงกัน',
    'password is too short': 'รหัสผ่านสั้นเกินไป',
    'phone': 'โทรศัพท์',
    'position': 'ตำเเหน่ง',
    'profile': 'ประวัติส่วนตัว',
    'province/state': 'จังหวัด/รัฐ',
    'register': 'สมัครสมาชิก',
    'register to our community': 'สมัครสมาชิกเพื่อเข้าใช้งาน',
    'remember me': 'จำฉันไว้ในระบบ',
    'school/university': 'สถานศีกษา',
    'settings': 'ตั้งค่า',
    'send message': 'ส่งข้อความ',
    'status': 'สถานะ',
    'update your profile': 'บันทึกประวัติส่วนตัว',
    'used for logging in': 'ใช้ในการเข้าสู่ระบบ',
    'user menu': 'เมนูผู้ใช้งาน',
    'user panel': 'หน้าผู้ใช้งาน',
    'username': 'ชื่อผู้ใช้งาน',
    'username is already in use': 'ชื่อผู้ใช้งานนี้ได้ถูกใช้งานแล้ว',
    'welcome to dpst database manager': 'ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลของ พสวท.',
    'what is this?': 'คืออะไร',
    'workplace': 'สถานที่ทำงาน',
    'wrong username or password': 'ชื่อผู้ใช้งานหรือรหัสผ่านผิด',
    'you are about to ': 'คุณกำลังจะ',
    'your account has been approved, and you can use our service.': 'บัญชีของท่านได้รับการยืนยันเรียบร้อยแล้ว และท่านสามารถใช้บริการของเราได้',
    'your account has been created. please wait for our administrators to approve your account before you can use our service.': 'คุณได้ลงทะเบียนในระบบของเราเป็นที่เรียบร้อยแล้ว กรุณารอเราตรวจสอบข้อมูล ก่อนที่ท่านจะเริ่มใช้บริการได้',
    'your account is currently banned.': 'บัญชีของท่านได้ถูกระงับการใช้งานชั่วคราว',
    'your address': 'ที่อยู่ของคุณ',
    'your address line 2': 'ที่อยู่ของคุณ บรรทัดที่ 2',
    'your dpst #': 'รุ่น พสวท. ของคุณ',
    'your e-mail address': 'อีเมลของคุณ',
    'your education': 'ระดับการศึกษาของคุณ',
    'your field of study': 'สาขาวิชาของคุณ',
    'your line id': 'Line ID ของคุณ',
    'your name': 'ชื่อของคุณ',
    'your position': 'ตำแหน่งของคุณ',
    'your school/university': 'สถานศึกษาของคุณ',
    'your telephone number': 'หมายเลขโทรศัพท์ของคุณ',
    'your workplace': 'สถานที่ทำงานของคุณ',
    'zip code': 'รหัสไปรษณีย์'
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
            var translated = dictionary[lang][value.toLowerCase()];
            return translated !== null ? translated : value;
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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageAdminEmailBlastComponent = /** @class */ (function () {
    function PageAdminEmailBlastComponent(pageService) {
        this.pageService = pageService;
    }
    PageAdminEmailBlastComponent.prototype.ngOnInit = function () {
        this.pageService.setPage('Email Blast');
    };
    PageAdminEmailBlastComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-email-blast',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService])
    ], PageAdminEmailBlastComponent);
    return PageAdminEmailBlastComponent;
}());
exports.PageAdminEmailBlastComponent = PageAdminEmailBlastComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var auth_guard_service_1 = __webpack_require__("./src/app/services/auth-guard.service.ts");
var page_admin_email_blast_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-email-blast/page-admin-email-blast.component.ts");
var page_admin_panel_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-panel.component.ts");
var page_admin_statistic_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.ts");
var page_admin_user_table_component_1 = __webpack_require__("./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.ts");
var routes = [
    { path: 'admin-panel', component: page_admin_panel_component_1.PageAdminPanelComponent,
        canActivate: [auth_guard_service_1.AuthGuardService],
        canActivateChild: [auth_guard_service_1.AuthGuardService],
        children: [
            { path: '',
                children: [
                    { path: 'user-table', component: page_admin_user_table_component_1.PageAdminUserTableComponent, data: { pagename: 'User Table' } },
                    { path: 'stats', component: page_admin_statistic_component_1.PageAdminStatisticComponent, data: { pagename: 'Statistics' } },
                    { path: 'email-blast', component: page_admin_email_blast_component_1.PageAdminEmailBlastComponent, data: { pagename: 'E-mail Blast' } },
                    { path: '', redirectTo: 'user-table', pathMatch: 'full' }
                ]
            }
        ]
    }
];
var PageAdminPanelRoutingModule = /** @class */ (function () {
    function PageAdminPanelRoutingModule() {
    }
    PageAdminPanelRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PageAdminPanelRoutingModule);
    return PageAdminPanelRoutingModule;
}());
exports.PageAdminPanelRoutingModule = PageAdminPanelRoutingModule;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.css":
/***/ (function(module, exports) {

module.exports = "li.active a {color:#228ae6; font-weight:600;}"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"political-subheader-wrap\">\n                    <h1>Admin Panel</h1>\n                    <ul class=\"political-breadcrumb\">\n                        <li><a routerLink=\"/\">{{'Homepage' | translate:settingService.getLanguage() }}</a></li>\n                        <li>Admin Panel</li>\n                        <li class=\"active\">{{pageService.getPage()}}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <!-- Admin panel sidbar -->\n                <aside class=\"col-md-3\">\n                    <div class=\"widget widget_cetagories\">\n                        <h2 class=\"political-widget-heading\">Admin Menu</h2>\n                        <ul>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"user-table\">User Table</a></li>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"stats\">Statistics</a></li>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"email-blast\">Email Blast</a></li>\n                        </ul>\n                    </div>\n                </aside>\n\n                <!-- Admin panel subpages -->\n                <div class=\"col-md-9\">\n                    <router-outlet></router-outlet>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>"

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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageAdminStatisticComponent = /** @class */ (function () {
    function PageAdminStatisticComponent(pageService) {
        this.pageService = pageService;
    }
    PageAdminStatisticComponent.prototype.ngOnInit = function () {
        this.pageService.setPage('Statistics');
    };
    PageAdminStatisticComponent = __decorate([
        core_1.Component({
            selector: 'app-page-admin-statistic',
            template: __webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.html"),
            styles: [__webpack_require__("./src/app/page-admin-panel/page-admin-statistic/page-admin-statistic.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService])
    ], PageAdminStatisticComponent);
    return PageAdminStatisticComponent;
}());
exports.PageAdminStatisticComponent = PageAdminStatisticComponent;


/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.css":
/***/ (function(module, exports) {

module.exports = "th {color:#000000;}\ntd {font-weight:300;}\n.fa {cursor:pointer;}\n.show-per-page, .select-sort, input.search[type=text] {height:38px; padding:3px;}\n.show-per-page {width:60px;}\n.select-sort {width:190px;}\ninput.search[type=text] {\n    font-size: 16px;\n    border: 1px solid #dfdfdf;\n    width: 180px;\n    color: #5a5a5a;\n    font-weight: 300;\n    padding-left: 10px;\n    padding-right: 10px;\n}\n.top-option {padding:0 15px; float:right;}\n.pagination-div {margin:20px 0;}\n.back-btn {float:right; margin-bottom:20px;}\n"

/***/ }),

/***/ "./src/app/page-admin-panel/page-admin-user-table/page-admin-user-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"subpage=='Table'\" class=\"political-blog-large\">\n\n  <!-- Selection criteria -->\n  <div class=\"political-pagination\" style=\"color:#000; margin:0 0 25px 0;\">\n\n      <div class=\"top-option\">\n        <input #keyword class=\"search\" type=\"text\" (keyup.enter)=\"tableSearch(keyword.value)\">\n        <input type=\"submit\" class=\"political-simple-btn\" value=\"Search\" (click)=\"tableSearch(keyword.value)\">\n      </div>\n\n      <div class=\"top-option\">\n        Sort by\n        <select class=\"select-sort\" (change)=\"tableSortChange($event.target.value)\">\n          <option value=\"None\" selected=\"selected\">None</option>\n          <option value=\"Firstname increasing\">Firstname increasing</option>\n          <option value=\"Firstname decreasing\">Firstname decreasing</option>\n          <option value=\"Level increasing\">Level increasing</option>\n          <option value=\"Level decreasing\">Level decreasing</option>\n          <option value=\"Status increasing\">Status increasing</option>\n          <option value=\"Status decreasing\">Status decreasing</option>\n          <option value=\"Register date increasing\">Register date increasing</option>\n          <option value=\"Register date decreasing\">Register date decreasing</option>\n        </select>\n      </div>\n\n      <div class=\"top-option\">\n        Show per page\n        <select class=\"show-per-page\" (change)=\"tableLimitChange($event.target.value)\">\n          <option value=\"10\">10</option>\n          <option value=\"25\" selected=\"selected\">25</option>\n          <option value=\"50\">50</option>\n          <option value=\"100\">100</option>\n        </select>\n      </div>\n        \n  </div>\n\n  <ul class=\"row\">\n    <li class=\"col-md-12\">\n\n      <table><tbody>\n        <tr>\n          <th>Username</th>\n          <th>Firstname</th>\n          <th>Lastname</th>\n          <th>E-mail address</th>\n          <th>Level</th>\n          <th>Status</th>\n          <th>Actions</th>\n        </tr>\n\n        <ng-container *ngIf=\"users===null\">\n          <tr><td colspan=\"8\">No user data found.</td></tr>\n        </ng-container>\n        <ng-container *ngIf=\"users!==null\">\n          <tr *ngFor=\"let user of users;\">\n            <td>{{user.username}}</td>\n            <td>{{user.firstname}}</td>\n            <td>{{user.lastname}}</td>\n            <td>{{user.email}}</td>\n            <td>{{user.level}}</td>\n            <td [ngClass]=\"{'ban':user.status=='Ban', 'pen':user.status=='Pending', 'hello-user':user.status=='Active'}\">{{user.status}}</td>\n            \n            <!-- Admin options based on level -->\n            <!-- Lower users -->\n            <td *ngIf=\"user.level < userinfoService.getUserinfo().level\">\n              <i *ngIf=\"user.status!='Active'\" class=\"fa fa-check-square-o hello-user\" aria-hidden=\"true\"\n                (click)=\"setAccountStatus(user, 'Active')\">&nbsp;</i>\n              <i *ngIf=\"user.status!='Ban'\" class=\"fa fa-times pen\" aria-hidden=\"true\"\n                (click)=\"setAccountStatus(user, 'Ban')\">&nbsp;</i>\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\n              <i class=\"fa fa-pencil-square-o edit-icon\" aria-hidden=\"true\"\n                (click)=\"adminEditUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-trash ban\" aria-hidden=\"true\"\n                (click)=\"tryDeleteAccount(user)\"></i>\n            </td>\n            <!-- Higher users -->\n            <td *ngIf=\"user.level > userinfoService.getUserinfo().level\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>\n            </td>\n            <!-- Yourself -->\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id==userinfoService.getUserinfo()._id\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>&nbsp;\n              <i class=\"fa fa-pencil-square-o edit-icon\" aria-hidden=\"true\"\n                (click)=\"adminEditUserinfo(user)\"></i>\n            </td>\n            <!-- Same level users, not you -->\n            <td *ngIf=\"user.level==userinfoService.getUserinfo().level && user._id!=userinfoService.getUserinfo()._id\">\n              <i class=\"fa fa-address-book-o hello-user\" aria-hidden=\"true\"\n                (click)=\"viewUserinfo(user)\"></i>&nbsp;\n              <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i>\n            </td>\n\n          </tr>\n        </ng-container>\n\n      </tbody></table>\n\n      <!-- Pagination -->\n      <div class=\"political-pagination pagination-div\">\n        <ul class=\"page-numbers\">\n            <li><a class=\"previous page-numbers\" (click)=\"previouseTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-left\"></i></span></a></li>\n            <li *ngFor=\"let page of pagination;\">\n              <a *ngIf=\"page!=criteria.page\" class=\"page-numbers\"\n              (click)=\"paginationChangePage(page)\">{{page+1}}</a>\n              <span *ngIf=\"page==criteria.page\" class=\"page-numbers current\">{{page+1}}</span>\n            </li>\n            <li><a class=\"next page-numbers\" (click)=\"nextTablePage()\"><span aria-label=\"Next\"><i class=\"fa fa-angle-right\"></i></span></a></li>\n        </ul>\n      </div>\n\n    </li>\n  </ul>\n</div>\n\n<!-- Delete user panel -->\n<div *ngIf=\"subpage=='Try delete'\" class=\"political-blog-large\">\n  <h1 style=\"margin-bottom:20px;\"><strong>{{'You are about to ' | translate:settingService.getLanguage() }}<span class=\"ban\">{{'DELETE a user' | translate:settingService.getLanguage() }}</span></strong></h1>\n  <h3 style=\"margin-bottom:20px;\">{{'Username' | translate:settingService.getLanguage() }}: <span class=\"hello-user\" style=\"font-weight:600;\">{{userOnHand.username}}</span></h3>\n  <input type=\"submit\" class=\"political-simple-btn delete-btn\" value=\"{{'DELETE' | translate:settingService.getLanguage() }}\" (click)=\"deleteAccount()\">\n  <input type=\"submit\" class=\"political-simple-btn\" value=\"{{'Cancel' | translate:settingService.getLanguage() }}\" (click)=\"goBackToUserTable()\">\n</div>\n\n<!-- View user profile -->\n<ng-container *ngIf=\"subpage=='View user' && userOnHand!==null\">\n  <input class=\"political-simple-btn back-btn\" type=\"submit\" \n    (click)=\"goBackToUserTable()\" value=\"{{'Go back' | translate:settingService.getLanguage() }}\">\n  <app-profile-form [userDetail]=\"userOnHand\"></app-profile-form>\n</ng-container>\n\n<!-- Edit user information -->\n<ng-container *ngIf=\"subpage=='Edit user' && userOnHand!==null\">\n  <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn back-btn\" type=\"submit\" \n    (click)=\"goBackToUserTable()\" value=\"ย้อนกลับไป\">\n  <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn back-btn\" type=\"submit\" \n    (click)=\"goBackToUserTable()\" value=\"Go back\">\n  <input class=\"political-simple-btn warning-btn\" type=\"submit\" style=\"float:right; margin-right:10px;\"\n    (click)=\"goToAdminPrivilageSetting()\" value=\"Admin pivilage setting\">\n  <app-profile-edit-form [userDetail]=\"userOnHand\"\n    (userDetailUpdated)=\"userDetailUpdatedDone($event)\"></app-profile-edit-form>\n</ng-container>\n\n<!-- Admin privilage setting -->\n<ng-container *ngIf=\"subpage=='Admin setting' && userOnHand!==null\">\n  <input *ngIf=\"settingService.getLanguage()=='Thai'\" class=\"political-simple-btn back-btn\" type=\"submit\" \n    (click)=\"goBackToUserTable()\" value=\"ย้อนกลับไป\">\n  <input *ngIf=\"settingService.getLanguage()=='English'\" class=\"political-simple-btn back-btn\" type=\"submit\" \n    (click)=\"goBackToUserTable()\" value=\"Go back\">\n  <app-admin-privilage-setting-form [userinfo]=\"userOnHand\"\n  (userinfoUpdated)=\"userPrivilageUpdatedDone($event)\"></app-admin-privilage-setting-form>\n</ng-container>"

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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageAdminUserTableComponent = /** @class */ (function () {
    function PageAdminUserTableComponent(socketioService, settingService, userinfoService, adminService, pageService) {
        this.socketioService = socketioService;
        this.settingService = settingService;
        this.userinfoService = userinfoService;
        this.adminService = adminService;
        this.pageService = pageService;
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
        this.pageService.setPage('User Table');
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
            admin_service_1.AdminService,
            page_service_1.PageService])
    ], PageAdminUserTableComponent);
    return PageAdminUserTableComponent;
}());
exports.PageAdminUserTableComponent = PageAdminUserTableComponent;


/***/ }),

/***/ "./src/app/page-check-status/page-check-status.component.css":
/***/ (function(module, exports) {

module.exports = "\n.political-contact-form {font-size: 18px;}\n.political-contact-form a, .political-contact-form span {color: #228ae6; font-weight: 600;}\n"

/***/ }),

/***/ "./src/app/page-check-status/page-check-status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n\n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2>{{'Status' | translate:settingService.getLanguage() }}:\n              <span [ngClass]=\"{'ban':userinfoService.getUserinfo().status=='Ban', 'pen':userinfoService.getUserinfo().status=='Pending', 'hello-user':userinfoService.getUserinfo().status=='Active'}\">{{userinfoService.getUserinfo().status}}</span>\n            </h2>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-2\"></div>\n\n          <div class=\"col-md-8\">\n            <div class=\"political-contact-form\">\n              {{'Hello,' | translate:settingService.getLanguage() }} <span>{{userinfoService.getUserinfo().username}}</span>{{'.' | translate:settingService.getLanguage() }}\n              \n              <br><br>\n              <ng-container *ngIf=\"userinfoService.getUserinfo().status=='Active'\">\n                {{'Your account has been approved, and you can use our service.' | translate:settingService.getLanguage() }}\n              </ng-container>\n              <ng-container *ngIf=\"userinfoService.getUserinfo().status=='Pending'\">\n                {{'Your account has been created. Please wait for our administrators to approve your account before you can use our service.' | translate:settingService.getLanguage() }}\n              </ng-container>\n              <ng-container *ngIf=\"userinfoService.getUserinfo().status=='Ban'\">\n                {{'Your account is currently banned.' | translate:settingService.getLanguage() }}\n              </ng-container>\n\n              <br><br>{{'If you have any concerns, please ' | translate:settingService.getLanguage() }}<a routerLink=\"/contact\">{{'contact us' | translate:settingService.getLanguage() }}</a>{{'.' | translate:settingService.getLanguage() }}\n            </div>\n          </div>\n\n       </div>\n      </div>\n\n  </div>\n</div>"

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

module.exports = "input:disabled {cursor: not-allowed;}\n\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password],\n.political-contact-form form textarea {\n    color: #000000;\n    font-size: 16px;\n}\n\n@media screen and (min-width: 990px) {\n    .political-contact-text {\n        height: 200px;\n    }\n}"

/***/ }),

/***/ "./src/app/page-contact/page-contact.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n\n        <div class=\"political-main-section\">\n            <div class=\"political-fancy-title\">\n              <div class=\"container\">\n                <div class=\"row\">\n                  <div class=\"col-md-12\"><h2>{{'Get in Touch' | translate:settingService.getLanguage() }}</h2></div>\n                </div>\n              </div>\n            </div>\n            <div class=\"container\">\n              <div class=\"row\">\n    \n                <div class=\"col-md-12\">\n                  <div class=\"political-contact-info\">\n                    <ul class=\"row\">\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-location-pin\"></i>\n                          <h6>{{'Meet Us' | translate:settingService.getLanguage() }}</h6>\n                          <p [innerHTML]=\"'IPST<br>924 Sukhumvit Rd<br>Phra Khanong, Khlong Toei<br>Bangkok 10110 Thailand' | translate:settingService.getLanguage()\"></p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-phone-call\"></i>\n                          <h6>{{'Call Us' | translate:settingService.getLanguage() }}</h6>\n                          <p>{{'+66 2 392 4021' | translate:settingService.getLanguage() }}</p>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-envelope\"></i>\n                          <h6>{{'E-mail Us' | translate:settingService.getLanguage() }}</h6>\n                          <a href=\"mailto:nsric@ipst.ac.th\">nsric@ipst.ac.th</a>\n                          <a href=\"mailto:sarun_sla@hotmail.com\">sarun_sla@hotmail.com</a>\n                        </div>\n                      </li>\n                      <li class=\"col-md-3\">\n                        <div class=\"political-contact-text\">\n                          <i class=\"icon church-print\"></i>\n                          <h6>{{'Fax Us' | translate:settingService.getLanguage() }}</h6>\n                          <p>{{'+66 2 381 0750' | translate:settingService.getLanguage() }}</p>\n                        </div>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n    \n              </div>\n          </div>\n        </div>\n\n        <div class=\"container\">\n          <div class=\"row\">\n            \n            <div class=\"col-md-8\">\n              <div class=\"political-contact-form\">\n                <h2 class=\"political-section-heading\">{{'Message Us Now' | translate:settingService.getLanguage() }}</h2>\n                <p>\n                  {{'After we received your message, we will reply to you within 2 business days. Thank you!' | translate:settingService.getLanguage() }}\n                </p>\n\n                <form #form=\"ngForm\" (ngSubmit)=\"sendMessage(form)\" ngNativeValidate>\n                  <ul>\n                    <li><input class=\"reg-input\" type=\"text\" name=\"name\" value=\"\" placeholder=\"{{'Your name' | translate:settingService.getLanguage() }}\" ngModel required></li>\n                    <li><input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" placeholder=\"{{'Your e-mail address' | translate:settingService.getLanguage() }}\" ngModel required></li>\n                    <li class=\"political-full-form\"><textarea name=\"message\" placeholder=\"{{'Message' | translate:settingService.getLanguage() }}\" ngModel required></textarea></li>\n                  </ul>\n                  <div style=\"text-align:center;\"><input type=\"submit\" value=\"{{'Send Message' | translate:settingService.getLanguage() }}\" class=\"\"></div>\n                </form>\n\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"political-contact-map\">\n                <!-- <div #gmap id=\"map\"></div> -->\n                <img src=\"assets/img/bg/google-map-static.JPG\">\n              </div>\n            </div>\n          </div>\n        </div>\n    \n</div>"

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

/***/ "./src/app/page-home/page-home.component.css":
/***/ (function(module, exports) {

module.exports = ".political-main-content {\n    padding: 120px 0px 40px 0px;\n}\n\n@media screen and (max-width:1200px) {\n    .political-main-content {\n        padding: 50px 0px 40px 0px;\n    }  \n}"

/***/ }),

/***/ "./src/app/page-home/page-home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-banner\">\n\t\t<div class=\"political-banner-layer\">\n\t\t\t  <span class=\"political-banner-transparent\"></span>\n\t\t\t  <img src=\"assets/img/bg/02.jpg\" alt=\"\" width=\"100%\" height=\"auto\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-5\">\n                    <div class=\"political-banner-thumb\">\n                        <figure><img src=\"extra-images/banner-thumb-img1.jpg\" alt=\"\"></figure>\n                        <div class=\"political-banner-thumb-text\" style=\"padding:15px 45px;\">\n                            <h2 style=\"line-height:35px; color:#ffffff;\">DPST Manager, a Choice for Smarter Future</h2>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"political-banner-caption\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 right\">\n                        <div class=\"political-banner-form\">\n\n                            <!-- Log in welcome -->\n                            <h1 style=\"line-height:55px;\">{{'Welcome to DPST Database Manager' | translate:settingService.getLanguage() }}</h1>\n                            <ng-container *ngIf=\"userinfoService.getUserinfo()===null\">\n                                <h2>{{'Register to our community' | translate:settingService.getLanguage() }}: </h2>\n                                <form>\n                                    <ul>\n                                        <li><input type=\"text\" value=\"\" placeholder=\"{{'Your name' | translate:settingService.getLanguage() }}\"></li>\n                                        <li><input type=\"email\" value=\"\" placeholder=\"{{'Your E-mail address' | translate:settingService.getLanguage() }}\"></li>\n                                        <li><input type=\"submit\" value=\"{{'Register' | translate:settingService.getLanguage() }}\" (click)=\"pageService.setPage('Register')\"></li>\n                                    </ul>\n                                </form>\n                            </ng-container>\n                        \n                      </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"political-main-content\" style=\"padding-bottom:0;\">\n\t\t<div class=\"political-main-section political-service-listfull\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <div class=\"political-service-list\">\n\n                      <ul>\n                          <li>\n                              <i class=\"icon church-interface\"></i>\n                              <h3>{{'About Application' | translate:settingService.getLanguage() }}</h3>\n                              <p>\n                                  This web application will help DPST to manage the data of DPST students and teachers\n                                  <strong>faster, easier, and efficiently</strong>.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-arrow2\"></i>\n                              <h3>{{'Mission' | translate:settingService.getLanguage() }}</h3>\n                              <p>\n                                  We hope to help building the DPST community, \n                                  and this application can connect DPST people with others.\n                              </p>\n                          </li>\n                          <li>\n                              <i class=\"icon church-eye\"></i>\n                              <h3>{{'How to Use' | translate:settingService.getLanguage() }}</h3>\n                              <p>\n                                  It is easy. You just need to register and \n                                  <strong style=\"cursor:pointer;\" (click)=\"pageService.setPage('Register')\">become a member</strong>.\n                              </p>\n                          </li>\n                      </ul>\n\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <figure class=\"political-service-add\">\n                    <video id=\"intro-video\" width=\"100%\" height=\"auto\" controls>\n                      <source src=\"assets/video/thebigdatasolution.com - sm.mp4\" type=\"video/mp4\">\n                    </video>\n                  </figure>\n                </div>\n            </div>\n        </div>\n\t\t</div>\n</div>"

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

module.exports = "\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password] {\n    color: #000000;\n    font-size: 16px;\n}\n.reg-input {\n    height: 45px;\n    margin: 0;\n    padding-left: 15px;\n    width: 100%;\n}\n.input-label {\n    color: #000000;\n}\n.req {\n    color: red;\n}\n.error-message {\n    height: 30px;\n    color: red;\n    font-size: 14px;\n}\n.political-contact-form form ul li {\n    margin: 0 0 0 0;\n}\n.last-input {\n    color: #000000;\n    margin: 0 0 25px 0 !important;\n}\n.last-input a {\n    color: #228ae6;\n    font-weight: 600;\n}"

/***/ }),

/***/ "./src/app/page-login/page-login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n    \n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2>{{'Log In' | translate:settingService.getLanguage() }}</h2>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-3\"></div>\n        \n        <div class=\"col-md-6\">\n          <div class=\"political-contact-form\">\n            \n            <form #login=\"ngForm\" (ngSubmit)=\"memberLogIn(login)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">{{'Username' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">{{'Password' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div class=\"error-message\"><span *ngIf=\"loginFail\">* {{'Wrong username or password' | translate:settingService.getLanguage() }}</span></div>\n                </li>\n                <li class=\"last-input\">\n                  <input name=\"rememberme\" type=\"checkbox\" ngModel> {{'Remember me' | translate:settingService.getLanguage() }}\n                </li>\n                <li class=\"last-input\" style=\"text-align:right;\">\n                  {{'Forgot' | translate:settingService.getLanguage() }} <a (click)=\"pageService.setPage('Forgot username')\">{{'username' | translate:settingService.getLanguage() }}</a> / \n                  <a (click)=\"pageService.setPage('Forgot password')\">{{'password' | translate:settingService.getLanguage() }}</a> ?\n                </li>\n              </ul>\n              <div style=\"text-align:center;\"><input type=\"submit\" value=\"{{'Log In' | translate:settingService.getLanguage() }}\" class=\"\"></div>\n            </form>\n\n          </div>\n        </div>\n        \n      </div>\n    </div>\n    \n  </div>\n</div>"

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
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var socketio_service_1 = __webpack_require__("./src/app/services/socketio.service.ts");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var setting_service_1 = __webpack_require__("./src/app/services/setting.service.ts");
var authentication_service_1 = __webpack_require__("./src/app/services/authentication.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var cookie_service_1 = __webpack_require__("./src/app/services/cookie.service.ts");
var PageLoginComponent = /** @class */ (function () {
    function PageLoginComponent(socketioService, pageService, settingService, authService, userinfoService, cookieService, router) {
        this.socketioService = socketioService;
        this.pageService = pageService;
        this.settingService = settingService;
        this.authService = authService;
        this.userinfoService = userinfoService;
        this.cookieService = cookieService;
        this.router = router;
        this.loginFail = false;
    }
    PageLoginComponent.prototype.ngOnInit = function () {
        if (this.userinfoService.getUserinfo() !== null)
            this.router.navigate(['/']);
    };
    PageLoginComponent.prototype.memberLogIn = function (form) {
        var _this = this;
        this.authService.login(form.value)
            .then(function (result) {
            if (result.status) {
                if (form.value.rememberme === true)
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
        this.router.navigate(['/']);
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
            cookie_service_1.CookieService,
            router_1.Router])
    ], PageLoginComponent);
    return PageLoginComponent;
}());
exports.PageLoginComponent = PageLoginComponent;


/***/ }),

/***/ "./src/app/page-register/page-register.component.css":
/***/ (function(module, exports) {

module.exports = "\n.reg-input[type=text], .reg-input[type=email], .reg-input[type=password] {\n    color: #000000;\n    font-size: 16px;\n}\n.reg-input {\n    height: 45px;\n    margin: 0;\n    padding-left: 15px;\n    width: 100%;\n}\n.input-label {\n    color: #000000;\n}\n.req {\n    color: red;\n}\n.error-message {\n    height: 30px;\n    color: red;\n    font-size: 14px;\n}"

/***/ }),

/***/ "./src/app/page-register/page-register.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"political-main-content\">\n  <div class=\"political-main-section\">\n    <div class=\"political-fancy-title\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h2>{{'Register' | translate:settingService.getLanguage() }}</h2>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-3\"></div>\n        \n        <div class=\"col-md-6\">\n          <div class=\"political-contact-form\">\n\n            <form #register=\"ngForm\" (ngSubmit)=\"registerMember(register)\" ngNativeValidate>\n              <ul>\n                <li><div class=\"input-label\">{{'First name' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"firstname\" value=\"\" ngModel required></li>\n                <li><div class=\"input-label\">{{'Last name' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"text\" name=\"lastname\" value=\"\" ngModel required></li>\n                <li>\n                  <div class=\"input-label\">\n                    {{'Username' | translate:settingService.getLanguage() }}\n                    ({{'used for logging in' | translate:settingService.getLanguage() }})\n                  </div>\n                  <input class=\"reg-input\" type=\"text\" name=\"username\" value=\"\" ngModel required>\n                  <div class=\"error-message\" *ngIf=\"usernameInUse\">* {{'Username is already in use' | translate:settingService.getLanguage() }}</div>\n                </li>\n                <li><div class=\"input-label\">{{'E-mail address' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"email\" name=\"email\" value=\"\" ngModel required>\n                  <div class=\"error-message\" *ngIf=\"emailInUse\">* {{'E-mail is already in use' | translate:settingService.getLanguage() }}</div>\n                </li>\n                <li><div class=\"input-label\">{{'Password' | translate:settingService.getLanguage() }} ({{'5 letters minimum' | translate:settingService.getLanguage() }})</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"password\" value=\"\" ngModel required>\n                  <div class=\"error-message\" *ngIf=\"passTooShort\">* {{'Password is too short' | translate:settingService.getLanguage() }}</div>\n                </li>\n                <li><div class=\"input-label\">{{'Confirm password' | translate:settingService.getLanguage() }}</div>\n                  <input class=\"reg-input\" type=\"password\" name=\"confirmPassword\" value=\"\" ngModel required>\n                  <div class=\"error-message\" *ngIf=\"passNotMatch\">* {{'Password does not match' | translate:settingService.getLanguage() }}</div>\n                </li>\n              </ul>\n              <div style=\"text-align:center\"><input type=\"submit\" value=\"{{'Register' | translate:settingService.getLanguage() }}\" class=\"\"></div>\n            </form>\n\n          </div>\n        </div>\n        \n      </div>\n    </div>\n  </div>\n</div>"

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
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageUserEditProfileComponent = /** @class */ (function () {
    function PageUserEditProfileComponent(pageService, userinfoService, router) {
        this.pageService = pageService;
        this.userinfoService = userinfoService;
        this.router = router;
        this.userDetail = null;
    }
    PageUserEditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageService.setPage('Edit Profile');
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
            this.router.navigate(['/user-panel/profile']);
        }
    };
    PageUserEditProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-edit-profile',
            template: __webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService,
            userinfo_service_1.UserinfoService,
            router_1.Router])
    ], PageUserEditProfileComponent);
    return PageUserEditProfileComponent;
}());
exports.PageUserEditProfileComponent = PageUserEditProfileComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-history/page-user-history.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-user-panel/page-user-history/page-user-history.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  page-user-history works!\n</p>\n"

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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageUserHistoryComponent = /** @class */ (function () {
    function PageUserHistoryComponent(pageService) {
        this.pageService = pageService;
    }
    PageUserHistoryComponent.prototype.ngOnInit = function () {
        this.pageService.setPage('History');
    };
    PageUserHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-history',
            template: __webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService])
    ], PageUserHistoryComponent);
    return PageUserHistoryComponent;
}());
exports.PageUserHistoryComponent = PageUserHistoryComponent;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var page_user_edit_profile_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-edit-profile/page-user-edit-profile.component.ts");
var page_user_history_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-history/page-user-history.component.ts");
var page_user_panel_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-panel.component.ts");
var page_user_profile_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-profile/page-user-profile.component.ts");
var page_user_setting_component_1 = __webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.ts");
var auth_guard_service_1 = __webpack_require__("./src/app/services/auth-guard.service.ts");
var routes = [
    { path: 'user-panel', component: page_user_panel_component_1.PageUserPanelComponent,
        canActivate: [auth_guard_service_1.AuthGuardService],
        canActivateChild: [auth_guard_service_1.AuthGuardService],
        children: [
            { path: '',
                children: [
                    { path: 'profile', component: page_user_profile_component_1.PageUserProfileComponent, data: { pagename: 'Profile' } },
                    { path: 'edit-profile', component: page_user_edit_profile_component_1.PageUserEditProfileComponent, data: { pagename: 'Edit Profile' } },
                    { path: 'history', component: page_user_history_component_1.PageUserHistoryComponent, data: { pagename: 'History' } },
                    { path: 'settings', component: page_user_setting_component_1.PageUserSettingComponent, data: { pagename: 'Settings' } },
                    { path: '', redirectTo: 'profile', pathMatch: 'full' }
                ]
            }
        ]
    }
];
var PageUserPanelRoutingModule = /** @class */ (function () {
    function PageUserPanelRoutingModule() {
    }
    PageUserPanelRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PageUserPanelRoutingModule);
    return PageUserPanelRoutingModule;
}());
exports.PageUserPanelRoutingModule = PageUserPanelRoutingModule;


/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel.component.css":
/***/ (function(module, exports) {

module.exports = "li.active a {color:#228ae6; font-weight:600;}"

/***/ }),

/***/ "./src/app/page-user-panel/page-user-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"political-subheader\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n\n                <div class=\"political-subheader-wrap\">\n                    <h1>{{'User Panel' | translate:settingService.getLanguage() }}</h1>\n                    <ul class=\"political-breadcrumb\">\n                        <li><a routerLink=\"/\">{{'Homepage' | translate:settingService.getLanguage() }}</a></li>\n                        <li>{{'User Panel' | translate:settingService.getLanguage() }}</li>\n                        <li class=\"active\">{{pageService.getPage() | translate:settingService.getLanguage() }}</li>\n                    </ul>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"political-main-content\">\n    <div class=\"political-main-section\">\n        <div class=\"container\">\n            <div class=\"row\">\n\n                <!-- User panel sidebar -->\n                <aside class=\"col-md-3\">\n                    <div class=\"widget widget_cetagories\">\n                        <h2 class=\"political-widget-heading\">{{'User Menu' | translate:settingService.getLanguage() }}</h2>\n                        <ul>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"profile\">{{'Profile' | translate:settingService.getLanguage() }}</a></li>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"edit-profile\">{{'Edit Profile' | translate:settingService.getLanguage() }}</a></li>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"history\">{{'History' | translate:settingService.getLanguage() }}</a></li>\n                            <li routerLinkActive=\"active\">\n                                <a routerLink=\"settings\">{{'Settings' | translate:settingService.getLanguage() }}</a></li>\n                        </ul>\n                    </div>\n                </aside>\n\n                <!-- User panel subpages -->\n                <div class=\"col-md-9\">\n                    <router-outlet></router-outlet>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>"

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
    function PageUserPanelComponent(settingService, pageService) {
        this.settingService = settingService;
        this.pageService = pageService;
    }
    PageUserPanelComponent.prototype.ngOnInit = function () {
    };
    PageUserPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-panel',
            template: __webpack_require__("./src/app/page-user-panel/page-user-panel.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-panel.component.css")]
        }),
        __metadata("design:paramtypes", [setting_service_1.SettingService,
            page_service_1.PageService])
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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var userinfo_service_1 = __webpack_require__("./src/app/services/userinfo.service.ts");
var PageUserProfileComponent = /** @class */ (function () {
    function PageUserProfileComponent(userinfoService, pageService) {
        this.userinfoService = userinfoService;
        this.pageService = pageService;
        this.userDetail = null;
    }
    PageUserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageService.setPage('Profile');
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
        __metadata("design:paramtypes", [userinfo_service_1.UserinfoService,
            page_service_1.PageService])
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

module.exports = "<p>\n  page-user-setting works!\n</p>\n"

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
var page_service_1 = __webpack_require__("./src/app/services/page.service.ts");
var PageUserSettingComponent = /** @class */ (function () {
    function PageUserSettingComponent(pageService) {
        this.pageService = pageService;
    }
    PageUserSettingComponent.prototype.ngOnInit = function () {
        this.pageService.setPage('Settings');
    };
    PageUserSettingComponent = __decorate([
        core_1.Component({
            selector: 'app-page-user-setting',
            template: __webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.html"),
            styles: [__webpack_require__("./src/app/page-user-panel/page-user-setting/page-user-setting.component.css")]
        }),
        __metadata("design:paramtypes", [page_service_1.PageService])
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

/***/ "./src/app/services/auth-guard.service.ts":
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
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(userinfoService) {
        this.userinfoService = userinfoService;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        console.log('AuthGuard#canActivate called');
        return true; // TODO
        // return this.userinfoService.getUserinfo() !== null;
    };
    AuthGuardService.prototype.canActivateChild = function (childRoute, state) {
        return this.canActivate(childRoute, state);
    };
    AuthGuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [userinfo_service_1.UserinfoService])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;


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