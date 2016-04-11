System.register(['angular2/core', '../modalDialog/modalDialog', '../../models/subscriber'], function(exports_1) {
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
    var core_1, modalDialog_1, subscriber_1;
    var CreateSubscriberDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modalDialog_1_1) {
                modalDialog_1 = modalDialog_1_1;
            },
            function (subscriber_1_1) {
                subscriber_1 = subscriber_1_1;
            }],
        execute: function() {
            CreateSubscriberDialog = (function (_super) {
                __extends(CreateSubscriberDialog, _super);
                function CreateSubscriberDialog() {
                    _super.call(this);
                    this.modaleMode = "newSubscriber";
                    this.title = "Add new user";
                    this.cancelLabel = 'Cancel';
                    this.positiveLabel = 'Create User';
                    this.loadedEmitter = new core_1.EventEmitter();
                }
                CreateSubscriberDialog.prototype.ngOnInit = function () {
                    this.loadedEmitter.emit(this);
                    this.responseObject = new subscriber_1.Subscriber();
                };
                CreateSubscriberDialog.prototype.clearData = function () {
                    this.responseObject = new subscriber_1.Subscriber();
                };
                CreateSubscriberDialog.prototype.setValue = function (subscriber) {
                    this.responseObject = subscriber;
                };
                CreateSubscriberDialog.prototype.getValue = function () {
                    return this.responseObject;
                };
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "title", void 0);
                __decorate([
                    core_1.Input('cancel-label'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "cancelLabel", void 0);
                __decorate([
                    core_1.Input('positive-label'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "positiveLabel", void 0);
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CreateSubscriberDialog.prototype, "loadedEmitter", void 0);
                CreateSubscriberDialog = __decorate([
                    core_1.Component({
                        selector: 'create-subscriber-dialog',
                        templateUrl: 'app/components/createSubscriberDialog/createSubscriberDialog.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], CreateSubscriberDialog);
                return CreateSubscriberDialog;
            })(modalDialog_1.ModalDialog);
            exports_1("CreateSubscriberDialog", CreateSubscriberDialog);
        }
    }
});
//# sourceMappingURL=createSubscriberDialog.js.map