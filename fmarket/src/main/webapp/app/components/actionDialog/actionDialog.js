System.register(['angular2/core', '../modalDialog/modalDialog'], function(exports_1) {
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
                    this.positiveLabel = 'OK';
                    this.cancelLabel = 'Cancel';
                    this.loadedEmitter = new core_1.EventEmitter();
                }
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], ActionDialog.prototype, "title");
                __decorate([
                    core_1.Input('positive-label'), 
                    __metadata('design:type', String)
                ], ActionDialog.prototype, "positiveLabel");
                __decorate([
                    core_1.Input('cancel-label'), 
                    __metadata('design:type', String)
                ], ActionDialog.prototype, "cancelLabel");
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ActionDialog.prototype, "loadedEmitter");
                ActionDialog = __decorate([
                    core_1.Component({
                        selector: 'action-dialog',
                        templateUrl: 'app/components/actionDialog/actionDialog.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ActionDialog);
                return ActionDialog;
            })(modalDialog_1.ModalDialog);
            exports_1("ActionDialog", ActionDialog);
        }
    }
});
//# sourceMappingURL=actionDialog.js.map