/**
 * Created by NicolaeB on 5/26/2016.
 */
var NewCompanyRequest = (function () {
    function NewCompanyRequest(name, email, phone, contactPerson, address, cityId, companyDomainId, demandDomains) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.contactPerson = contactPerson;
        this.address = address;
        this.cityId = cityId;
        this.companyDomainId = companyDomainId;
        this.demandDomains = demandDomains;
    }
    NewCompanyRequest.getEmptyCompany = function () {
        return new NewCompanyRequest("", "", "", "", "", -1, -1, []);
    };
    return NewCompanyRequest;
})();
exports.NewCompanyRequest = NewCompanyRequest;
//# sourceMappingURL=newCompanyRequest.js.map