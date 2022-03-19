import StatusPedido from "../enums/statusPedido";

export default class PedidoStatusModel {
    constructor(
        idPedidoStatus,
        idPedido,
        status,
        createdAt
    ) {
        this.idPedidoStatus = idPedidoStatus;
        this.idPedido = idPedido;
        this.status = status;
        this.createdAt = createdAt;
    }

    get descricao() {
        switch (this.status.value) {
            case StatusPedido.EmAberto.value:
                return "Aguardando o pedido ser aceito";
            case StatusPedido.Aceito.value:
                return "Seu pedido já está em preparo";
            case StatusPedido.EmRotaDeEntrega.value:
                return "O pedido está em rota de entrega";
            case StatusPedido.ProntoParaRetirada.value:
                return "O pedido está pronto para ser retirado";
            case StatusPedido.Finalizado.value:
                return "Pedido Entregue! Avalie seu pedido";
            case StatusPedido.Cancelado.value:
                return "Pedido cancelado";
            default:
                return "";
        }
    }

    get horaDisplay() {
        return `${this.createdAt.getHours()}:${this.createdAt.getMinutes()}`;
    }

    static fromJson(json) {
        if (!json) return null;

        return new PedidoStatusModel(
            json.id_pedido_status,
            json.id_pedido,
            StatusPedido.fromIndex(json.status),
            json.created_at ? new Date(json.created_at) : null
        );
    }
}