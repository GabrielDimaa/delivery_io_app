import ProdutoModel from "./produtoModel";

export default class PedidoComplementoItemModel {
    constructor(
        idPedidoComplementoItem,
        idPedidoItem,
        idPedido,
        idComplemento,
        descricao,
        valorUnitario,
        valorTotal,
        quantidade,
        descricaoCategoria,
        complemento
    ) {
        this.idPedidoComplementoItem = idPedidoComplementoItem;
        this.idPedidoItem = idPedidoItem;
        this.idPedido = idPedido;
        this.idComplemento = idComplemento;
        this.descricao = descricao;
        this.valorUnitario = valorUnitario;
        this.valorTotal = valorTotal;
        this.quantidade = quantidade;
        this.descricaoCategoria = descricaoCategoria;
        this.complemento = complemento;
    }

    toJson() {
        return {
            "id_pedido_complemento_item": this.idPedidoComplementoItem,
            "id_pedido_item": this.idPedidoItem,
            "id_pedido": this.idPedido,
            "id_complemento": this.idComplemento,
            "descricao": this.descricao,
            "valor_unitario": this.valorUnitario,
            "valor_total": this.valorTotal,
            "quantidade": this.quantidade,
            "descricao_categoria": this.descricaoCategoria
        }
    }

    static fromJson(json) {
        if (!json) return null;

        return new PedidoComplementoItemModel(
            json.id_pedido_complemento_item,
            json.id_pedido_item,
            json.id_pedido,
            json.id_complemento,
            json.descricao,
            json.valor_unitario,
            json.valor_total,
            json.quantidade,
            json.descricao_categoria,
            ComplementoModel.fromJson(json.complemento)
        );
    }

    clone() {
        return new PedidoComplementoItemModel(
            this.idPedidoComplementoItem,
            this.idPedidoItem,
            this.idPedido,
            this.idComplemento,
            this.descricao,
            this.valorUnitario,
            this.valorTotal,
            this.quantidade,
            this.descricaoCategoria,
            this.complemento?.clone()
        );
    }
}