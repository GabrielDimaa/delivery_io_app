export default class TipoEntrega {
    static Entrega = TipoEntrega("Entrega", 1);
    static Retirada = TipoEntrega("Retirada", 2);

    constructor(descricao, value) {
        this.descricao = descricao;
        this.value = value;
    }

    static fromIndex(value) {
        switch (value) {
            case TipoEntrega.Entrega.value:
                return TipoEntrega.Entrega;
            case TipoEntrega.Retirada.value:
                return TipoEntrega.Retirada;
            default:
                return null;
        }
    }
}