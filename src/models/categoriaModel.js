import SubcategoriaModel from "./subcategoriaModel";

export default class CategoriaModel {
    constructor(
        idCategoria,
        descricao,
        subcategorias
    ) {
        this.idCategoria = idCategoria;
        this.descricao = descricao;
        this.subcategorias = subcategorias;
    }

    toJson() {
        return {
            "id_categoria": this.idCategoria,
            "descricao": this.descricao,
            "subcategorias": this.subcategorias.map(it => it.toJson())
        };
    }

    static fromJson(json) {
        if (json === null) return null;

        return new CategoriaModel(
            json.id_categoria,
            json.descricao,
            json.subcategorias?.map(it => SubcategoriaModel.fromJson(it)) ?? []
        );
    }

    clone() {
        return new CategoriaModel(
            this.idCategoria,
            this.descricao,
            this.subcategorias
        );
    }
}