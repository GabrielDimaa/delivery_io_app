import ProdutoModel from "./produtoModel";
import PedidoComplementoItemModel from "./pedidoComplementoItemModel";

export default class PedidoItemModel {
    constructor(
        idPedidoItem,
        idPedido,
        idProduto,
        descricao,
        valorUnitario,
        valorTotal,
        quantidade,
        descricaoSubcategoria,
        produto,
        complementos
    ) {
        this.idPedidoItem = idPedidoItem;
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.descricao = descricao;
        this.valorUnitario = valorUnitario;
        this.valorTotal = valorTotal;
        this.quantidade = quantidade;
        this.descricaoSubcategoria = descricaoSubcategoria;
        this.produto = produto;
        this.complementos = complementos;
    }

    get complementosDisplay() {
        const complementosDescricao = this.complementos.map(it => it.descricao);
        return complementosDescricao.join(", ");
    }

    toJson() {
        return {
            "id_pedido_item": this.idPedidoItem,
            "id_pedido": this.idPedido,
            "id_produto": this.idProduto,
            "descricao": this.descricao,
            "valor_unitario": this.valorUnitario,
            "valor_total": this.valorTotal,
            "quantidade": this.quantidade,
            "descricao_subcategoria": this.descricaoSubcategoria,
            "complemento_itens": this.complementos?.map(it => it.json()) ?? []
        }
    }

    static fromJson(json) {
        if (!json) return null;

        return new PedidoItemModel(
            json.id_pedido_item,
            json.id_pedido,
            json.id_produto,
            json.descricao,
            json.valor_unitario,
            json.valor_total,
            json.quantidade,
            json.descricao_subcategoria,
            ProdutoModel.fromJson(json.produto),
            json.complemento_itens?.map(it => PedidoComplementoItemModel.fromJson(it)) ?? []
        );
    }

    clone() {
        return new PedidoItemModel(
            this.idPedidoItem,
            this.idPedido,
            this.idProduto,
            this.descricao,
            this.valorUnitario,
            this.valorTotal,
            this.quantidade,
            this.descricaoSubcategoria,
            this.produto?.clone(),
            this.complementos?.map(it => it.clone()) ?? []
        );
    }
}