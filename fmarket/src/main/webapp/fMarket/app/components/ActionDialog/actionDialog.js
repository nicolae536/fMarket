System.register(['angular2/core', '../ModalDialog/modalDialog'], function(exports_1, context_1) {
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
    var core_1, modalDialog_1;
    var ActionDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modalDialog_1_1) {
                modalDialog_1 = modalDialog_1_1;
            }],
        execute: function() {
            ActionDialog = (function (_super) {
                __extends(ActionDialog, _super);
                function ActionDialog() {
                    _super.call(this);
                    this.loadedEmitter = new core_1.EventEmitter();
                }
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ActionDialog.prototype, "loadedEmitter", void 0);
                ActionDialog = __decorate([
                    core_1.Component({
                        selector: 'action-dialog'
                    }),
                    core_1.View({
                        templateUrl: 'app/components/ActionDialog/actionDialog.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ActionDialog);
                return ActionDialog;
            }(modalDialog_1.ModalDialog));
            exports_1("ActionDialog", ActionDialog);
        }
    }
});
//# sourceMappingURL=actionDialog.js.map