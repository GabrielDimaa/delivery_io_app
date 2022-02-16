export default class SubcategoriaModel {
    constructor(
        idSubcategoria,
        descricao,
        idCategoria,
        deleted
    ) {
        this.idSubcategoria = idSubcategoria;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
        this.deleted = deleted;
    }

    toJson() {
        return {
            "id_subcategoria": this.idSubcategoria,
            "descricao": this.descricao,
            "id_categoria": this.idCategoria,
            "deleted": this.deleted
        };
    }

    static fromJson(json) {
        if (json === null) return null;

        return new SubcategoriaModel(
            json.id_subcategoria,
            json.descricao,
            json.id_categoria,
            json.deleted
        );
    }

    clone() {
        return new SubcategoriaModel(
            this.idSubcategoria,
            this.descricao,
            this.idCategoria,
            this.deleted
        );
    }
}