export default class LoginModel {
    constructor(
        email,
        password
    ) {
        this.email = email;
        this.password = password;
    }

    toJson() {
        return {
            "email": this.email,
            "password": this.password
        };
    }
}