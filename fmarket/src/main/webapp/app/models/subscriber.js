var Subscriber = (function () {
    function Subscriber(id, description, email, subscribeDate, unsubscribeDate, unsubscribeToken) {
        this.isInEditMode = false;
        this.id = id ? id : "";
        this.description = description ? description : "";
        this.email = email ? email : "";
        this.subscribeDate = subscribeDate ? subscribeDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.unsubscribeDate = unsubscribeDate ? unsubscribeDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.unsubscribeToken = unsubscribeToken ? unsubscribeToken : -1;
    }
    Subscriber.prototype.getNewInstance = function () {
        return new Subscriber();
    };
    return Subscriber;
})();
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map