import CategoriaModel from "./categoriaModel";

export default class ComplementoModel {
    constructor(
        idComplemento,
        descricao,
        preco,
        idCategoria,
        categoria
    ) {
        this.idComplemento = idComplemento;
        this.descricao = descricao;
        this.preco = preco;
        this.idCategoria = idCategoria;
        this.categoria = categoria;
    }

    toJson() {
        return {
            "id_complemento": this.idComplemento,
            "descricao": this.descricao,
            "preco": this.preco,
            "id_categoria": this.idCategoria
        };
    }

    static fromJson(json) {
        if (!json) return null;

        return new ComplementoModel(
            json.id_complemento,
            json.descricao,
            json.preco,
            json.id_categoria,
            CategoriaModel.fromJson(json.categoria)
        );
    }
}