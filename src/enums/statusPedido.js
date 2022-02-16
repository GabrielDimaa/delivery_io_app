export default class StatusPedido {
    static EmAberto = new StatusPedido("Em aberto", 1);
    static Aceito = new StatusPedido("Aceito", 2);
    static EmRotaDeEntrega = new StatusPedido("Em rota de entrega", 3);
    static ProntoParaRetirada = new StatusPedido("Pronto para retirada", 4);
    static Finalizado = new StatusPedido("Finalizado", 5);
    static Cancelado = new StatusPedido("Cancelado", 6);

    constructor(descricao, value) {
        this.descricao = descricao;
        this.value = value;
    }

    static fromIndex(value) {
        switch (value) {
            case StatusPedido.EmAberto.value:
                return StatusPedido.EmAberto;
            case StatusPedido.Aceito.value:
                return StatusPedido.Aceito;
            case StatusPedido.EmRotaDeEntrega.value:
                return StatusPedido.EmRotaDeEntrega;
            case StatusPedido.ProntoParaRetirada.value:
                return StatusPedido.ProntoParaRetirada;
            case StatusPedido.Finalizado.value:
                return StatusPedido.Finalizado;
            case StatusPedido.Cancelado.value:
                return StatusPedido.Cancelado;
            default:
                return null;
        }
    }
}