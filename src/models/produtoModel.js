import CategoriaModel from "./categoriaModel";
import SubcategoriaModel from "./subcategoriaModel";

export default class ProdutoModel {
    constructor(
        idProduto,
        descricao,
        idCategoria,
        idSubcategoria,
        preco,
        sobre,
        ativo,
        createdAt,
        categoria,
        subcategoria
    ) {
        this.idProduto = idProduto;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
        this.idSubcategoria = idSubcategoria;
        this.preco = preco;
        this.sobre = sobre;
        this.ativo = ativo;
        this.createdAt = createdAt;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
    }

    toJson() {
        return {
            "id_produto": this.idProduto,
            "descricao": this.descricao,
            "id_categoria": this.idCategoria,
            "id_subcategoria": this.idSubcategoria,
            "preco": this.preco,
            "sobre": this.sobre,
            "ativo": this.ativo,
        };
    }

    static fromJson(json) {
        if (!json) return null;

        return new ProdutoModel(
            json.id_produto,
            json.descricao,
            json.id_categoria,
            json.id_subcategoria,
            json.preco,
            json.sobre,
            json.ativo,
            json.created_at ? new Date(json.created_at) : null,
            CategoriaModel.fromJson(json.categoria),
            SubcategoriaModel.fromJson(json.subcategoria)
        );
    }

    clone() {
        return new ProdutoModel(
            this.idProduto,
            this.descricao,
            this.idCategoria,
            this.idSubcategoria,
            this.preco,
            this.sobre,
            this.ativo,
            this.createdAt,
            this.categoria?.clone(),
            this.subcategoria?.clone()
        );
    }
}