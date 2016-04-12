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
    var folderPath, HomePage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            folderPath = '/app/pages/homePage';
            HomePage = (function () {
                function HomePage() {
                }
                HomePage.prototype.ngOnInit = function () {
                };
                HomePage.prototype.ngOnChanges = function (changes) {
                };
                HomePage = __decorate([
                    core_1.Component({
                        selector: 'home-page',
                        templateUrl: folderPath + '/homePage.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomePage);
                return HomePage;
            })();
            exports_1("HomePage", HomePage);
        }
    }
});
//# sourceMappingURL=homePage.js.map