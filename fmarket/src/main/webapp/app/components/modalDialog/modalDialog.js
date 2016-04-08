System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ModalDialog, DialogActionResult;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ModalDialog = (function () {
                function ModalDialog() {
                    this.showModal = false;
                    this.loadedEmitter = new core_1.EventEmitter();
                }
                ModalDialog.prototype.show = function (message) {
                    this.showModal = true;
                    this.message = message ? message : "";
                    var me = this;
                    return new Promise(function (resolve, reject) {
                        me.resolveModal = resolve;
                    });
                };
                ModalDialog.prototype.hide = function () {
                    this.showModal = false;
                };
                ModalDialog.prototype.ngOnInit = function () {
                    this.loadedEmitter.emit(this);
                    console.log('modal inited');
                };
                ModalDialog.prototype.positiveAction = function () {
                    this.showModal = false;
                    this.resolveModal(DialogActionResult.POSITIVE);
                };
                ModalDialog.prototype.cancelAction = function () {
                    console.log('sending close event');
                    this.showModal = false;
                    this.resolveModal(DialogActionResult.CANCEL);
                };
                ModalDialog.prototype.stopPropagation = function ($event) {
                    $event.stopPropagation();
                };
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialog.prototype, "loadedEmitter", void 0);
                return ModalDialog;
            }());
            exports_1("ModalDialog", ModalDialog);
            /**
             * The possible reasons a modal has been closed.
             */
            (function (DialogActionResult) {
                DialogActionResult[DialogActionResult["POSITIVE"] = 0] = "POSITIVE";
                DialogActionResult[DialogActionResult["CANCEL"] = 1] = "CANCEL";
            })(DialogActionResult || (DialogActionResult = {}));
            exports_1("DialogActionResult", DialogActionResult);
        }
    }
});
/**
 * Models the result of closing a modal dialog.
 */
//# sourceMappingURL=modalDialog.js.map