import {User} from "../../models/user";
import {AccountStatus} from "../../models/user";

export var USERS: User[] = [
    new User(1,"asd","def@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
    new User(9,"asdg","asd@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
    new User(2,"zxcb","gadf@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
    new User(4,"qerg","zxcb@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
    new User(5,"bsdf","q3t@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
    new User(6,"adbv","cxz@def.com", "user", AccountStatus.AUTO, new Date(), new Date(), new Date(), new Date(), new Date(),12,"Cluj",10,10,"asd"),
];