/**
 * Created by nick_ on 5/5/2016.
 */
export class Role {
    public static ADMIN = 'ADMIN';
    public static USER = 'USER';
    public static ANONYMUS = 'ANONYMUS';
}

export class RoleAnonymous{
    public ANONYMUS = 'ANONYMUS';
}

export class RoleUser extends RoleAnonymous{
    public USER = 'USER';
}

export class RoleAdmin{
    public ADMIN = 'ADMIN';
}