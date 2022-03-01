export default class LoginModel {
    constructor(
        usuario,
        senha
    ) {
        this.usuario = usuario;
        this.senha = senha;
    }

    toJson() {
        return {
            "usuario": this.usuario,
            "senha": this.senha
        };
    }
}