import PedidoItemModel from "./pedidoItemModel";
import StatusPedido from "../enums/statusPedido";
import TipoEntrega from "../enums/tipoEntrega";
import {convertTZ} from "../utils/utils";

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
        tempoEstimado,
        itens
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
        this.tempoEstimado = tempoEstimado;
        this.itens = itens;
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
            convertTZ(json.created_at),
            convertTZ(json.finalizado_at),
            json.tempo_estimado,
            json.itens?.map(it => PedidoItemModel.fromJson(it)) ?? []
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
            this.tempoEstimado,
            this.itens
        );
    }
}