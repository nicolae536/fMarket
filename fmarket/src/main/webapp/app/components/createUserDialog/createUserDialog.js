System.register(['angular2/core', '../modalDialog/modalDialog', '../../models/user'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, modalDialog_1, user_1;
    var CreateUserDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modalDialog_1_1) {
                modalDialog_1 = modalDialog_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            CreateUserDialog = (function (_super) {
                __extends(CreateUserDialog, _super);
                function CreateUserDialog() {
                    _super.call(this);
                    this.modaleMode = "newUser";
                    this.title = "Add new user";
                    this.cancelLabel = 'Cancel';
                    this.positiveLabel = 'Create User';
                    this.loadedEmitter = new core_1.EventEmitter();
                    this.cityList = ["Cluj", "Dorna", "Blaj"];
                    this.statusList = ["Active", "Inactive", "Pending"];
                    this.newUser = new user_1.User();
                }
                CreateUserDialog.prototype.editUser = function (user, cityList, statusList) {
                    this.title = "Name: " + user.name;
                    this.positiveLabel = 'Edit';
                    this.setValue(user);
                    return this.show(cityList, statusList);
                };
                CreateUserDialog.prototype.setValue = function (user) {
                    this.newUser = user;
                };
                CreateUserDialog.prototype.getValue = function () {
                    return this.newUser;
                };
                CreateUserDialog.prototype.show = function (cityList, statusList) {
                    this.showModal = true;
                    this.cityList = cityList;
                    this.statusList = statusList;
                    var me = this;
                    return new Promise(function (resolve, reject) {
                        me.resolveModal = resolve;
                    });
                };
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], CreateUserDialog.prototype, "title", void 0);
                __decorate([
                    core_1.Input('cancel-label'), 
                    __metadata('design:type', String)
                ], CreateUserDialog.prototype, "cancelLabel", void 0);
                __decorate([
                    core_1.Input('positive-label'), 
                    __metadata('design:type', String)
                ], CreateUserDialog.prototype, "positiveLabel", void 0);
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CreateUserDialog.prototype, "loadedEmitter", void 0);
                CreateUserDialog = __decorate([
                    core_1.Component({
                        selector: 'create-user-dialog'
                    }),
                    core_1.View({
                        templateUrl: 'app/components/createUserDialog/createUserDialog.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], CreateUserDialog);
                return CreateUserDialog;
            }(modalDialog_1.ModalDialog));
            exports_1("CreateUserDialog", CreateUserDialog);
        }
    }
});
//# sourceMappingURL=createUserDialog.js.map