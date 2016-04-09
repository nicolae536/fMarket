System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var FilterPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FilterPipe = (function () {
                function FilterPipe() {
                }
                FilterPipe.prototype.transform = function (value, args) {
                    if (!args[0] || args[0].length < 1) {
                        return value;
                    }
                    else if (value) {
                        args[0] = args[0].toLowerCase();
                        return value.filter(function (item) {
                            for (var key in item) {
                                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                                    (item[key].toLowerCase().indexOf(args[0]) !== -1)) {
                                    return true;
                                }
                            }
                        });
                    }
                };
                FilterPipe = __decorate([
                    core_1.Pipe({
                        name: 'filterItems',
                        pure: false
                    }), 
                    __metadata('design:paramtypes', [])
                ], FilterPipe);
                return FilterPipe;
            })();
            exports_1("FilterPipe", FilterPipe);
        }
    }
});
//# sourceMappingURL=filterPipe.js.map