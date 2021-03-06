import PedidoItemModel from "./pedidoItemModel";
import StatusPedido from "../enums/statusPedido";
import TipoEntrega from "../enums/tipoEntrega";
import PedidoStatusModel from "./pedidoStatusModel";

export default class PedidoModel {
    constructor(
        idPedido,
        codigoPedido,
        nome,
        telefone,
        rua,
        bairro,
        numero,
        cep,
        cidade,
        valorTotal,
        troco,
        valorPago,
        formaPagamento,
        tipoEntrega,
        status,
        observacao,
        createdAt,
        finalizadoAt,
        canceladoAt,
        tempoEstimado,
        avaliacao,
        itens,
        historicoStatus
    ) {
        this.idPedido = idPedido;
        this.codigoPedido = codigoPedido;
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.cep = cep;
        this.cidade = cidade;
        this.valorTotal = valorTotal;
        this.troco = troco;
        this.valorPago = valorPago;
        this.formaPagamento = formaPagamento;
        this.tipoEntrega = tipoEntrega;
        this.status = status;
        this.observacao = observacao;
        this.createdAt = createdAt;
        this.finalizadoAt = finalizadoAt;
        this.canceladoAt = canceladoAt;
        this.tempoEstimado = tempoEstimado;
        this.avaliacao = avaliacao;
        this.itens = itens;
        this.historicoStatus = historicoStatus;
    }

    get horarioPedidoDisplay() {
        return `${this.createdAt.toTimeString().substring(0, 5)}`;
    }

    get enderecoClienteDisplay() {
        return `${this.rua}, ${this.numero}, ${this.bairro}, ${this.complemento != null ? this.complemento + ", " : ""}${this.cidade}`;
    }

    toJson() {
        return {
            "id_pedido": this.idPedido,
            "codigo_pedido": this.codigoPedido,
            "nome": this.nome,
            "telefone": this.telefone,
            "rua": this.rua,
            "bairro": this.bairro,
            "numero": this.numero,
            "cep": this.cep,
            "cidade": this.cidade,
            "valor_total": this.valorTotal,
            "troco": this.troco,
            "valor_pago": this.valorPago,
            "forma_pagamento": this.formaPagamento,
            "tipo_entrega": this.tipoEntrega.value,
            "status": this.status.value,
            "observacao": this.observacao,
            "tempo_estimado": this.tempoEstimado,
            "avaliacao": this.avaliacao,
            "itens": this.itens?.map(it => it.toJson()) ?? []
        };
    }

    static fromJson(json) {
        if (!json) return null;

        return new PedidoModel(
            json.id_pedido,
            json.codigo_pedido,
            json.nome,
            json.telefone,
            json.rua,
            json.bairro,
            json.numero,
            json.cep,
            json.cidade,
            json.valor_total,
            json.troco,
            json.valor_pago,
            json.forma_pagamento,
            TipoEntrega.fromIndex(json.tipo_entrega),
            StatusPedido.fromIndex(json.status),
            json.observacao,
            json.created_at ? new Date(json.created_at) : null,
            json.finalizado_at ? new Date(json.finalizado_at) : null,
            json.cancelado_at ? new Date(json.cancelado_at): null,
            json.tempo_estimado,
            json.avaliacao,
            json.itens?.map(it => PedidoItemModel.fromJson(it)) ?? [],
            json.historico_status?.map(it => PedidoStatusModel.fromJson(it)) ?? []
        );
    }

    clone() {
        return new PedidoModel(
            this.idPedido,
            this.codigoPedido,
            this.nome,
            this.telefone,
            this.rua,
            this.bairro,
            this.numero,
            this.cep,
            this.cidade,
            this.valorTotal,
            this.troco,
            this.valorPago,
            this.formaPagamento,
            this.tipoEntrega,
            this.status,
            this.observacao,
            this.createdAt,
            this.finalizadoAt,
            this.canceladoAt,
            this.tempoEstimado,
            this.avaliacao,
            this.itens?.map(it => it.clone()) ?? [],
            this.historicoStatus
        );
    }
}