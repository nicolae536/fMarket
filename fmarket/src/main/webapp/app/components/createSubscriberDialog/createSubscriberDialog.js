System.register(['angular2/core', '../modalDialog/modalDialog', '../../models/subscriber'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                    this.newSubscriber = new subscriber_1.Subscriber();
                }
                CreateSubscriberDialog.prototype.ngOnInit = function () {
                    this.loadedEmitter.next(this);
                    console.log('modal inited');
                };
                CreateSubscriberDialog.prototype.clearData = function () {
                    this.newSubscriber = new subscriber_1.Subscriber();
                };
                CreateSubscriberDialog.prototype.setValue = function (subscriber) {
                    this.newSubscriber = subscriber;
                };
                CreateSubscriberDialog.prototype.getValue = function () {
                    return this.newSubscriber;
                };
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "title");
                __decorate([
                    core_1.Input('cancel-label'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "cancelLabel");
                __decorate([
                    core_1.Input('positive-label'), 
                    __metadata('design:type', String)
                ], CreateSubscriberDialog.prototype, "positiveLabel");
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CreateSubscriberDialog.prototype, "loadedEmitter");
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