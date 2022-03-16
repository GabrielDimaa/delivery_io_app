import SubcategoriaModel from "./subcategoriaModel";
import ComplementoModel from "./complementoModel";

export default class CategoriaModel {
    constructor(
        idCategoria,
        descricao,
        subcategorias,
        complementos
    ) {
        this.idCategoria = idCategoria;
        this.descricao = descricao;
        this.subcategorias = subcategorias;
        this.complementos = complementos;
    }

    toJson() {
        return {
            "id_categoria": this.idCategoria,
            "descricao": this.descricao,
            "subcategorias": this.subcategorias.map(it => it.toJson())
        };
    }

    static fromJson(json) {
        if (!json) return null;

        return new CategoriaModel(
            json.id_categoria,
            json.descricao,
            json.subcategorias?.map(it => SubcategoriaModel.fromJson(it)) ?? [],
            json.complementos?.map(it => ComplementoModel.fromJson(it)) ?? []
        );
    }

    clone() {
        return new CategoriaModel(
            this.idCategoria,
            this.descricao,
            this.subcategorias?.map(it => it.clone()) ?? [],
            this.complementos?.map(it => it.clone()) ?? []
        );
    }
}