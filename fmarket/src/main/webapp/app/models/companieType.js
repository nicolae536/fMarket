System.register([], function(exports_1) {
    var CompanieType;
    return {
        setters:[],
        execute: function() {
            CompanieType = (function () {
                function CompanieType(id, name, companies) {
                    this.isInEditMode = false;
                    this.id = id;
                    this.name = name;
                    //this.companies_no = companies;
                }
                return CompanieType;
            })();
            exports_1("CompanieType", CompanieType);
        }
    }
});
//# sourceMappingURL=companieType.js.map