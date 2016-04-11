System.register(['angular2/core'], function(exports_1) {
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
                    this.confirmAction = new core_1.EventEmitter();
                }
                ModalDialog.prototype.show = function (message, responseObject) {
                    this.showModal = true;
                    this.message = message ? message : "";
                    this.responseObject = responseObject;
                };
                ModalDialog.prototype.hide = function () {
                    this.showModal = false;
                    this.message = "";
                    this.responseObject = this.responseObject['getNewInstance'] && typeof this.responseObject['getNewInstance'] == "function" ? this.responseObject['getNewInstance']() : null;
                };
                ModalDialog.prototype.positiveAction = function () {
                    this.confirmAction.emit(this.responseObject);
                };
                ModalDialog.prototype.cancelAction = function () {
                    this.hide();
                };
                ModalDialog.prototype.stopPropagation = function ($event) {
                    $event.stopPropagation();
                };
                __decorate([
                    core_1.Output('action-confirmed'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialog.prototype, "confirmAction", void 0);
                return ModalDialog;
            })();
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