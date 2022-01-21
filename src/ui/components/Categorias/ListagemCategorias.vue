<template>
    <div id="table-categorias">
        <v-data-table :headers="headersCategoria" :items="dataTable" item-key="categoria" class="elevation-2"
                      :footer-props="footerProps" :items-per-page="5">
            <template v-slot:item="props">
                <div class="flex item-categoria">
                    <span>{{ props.item.descricao }}</span>
                    <div>
                        <v-btn elevation="0" color="transparent" fab x-small>
                            <v-icon color="var(--secondary-color)">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn elevation="0" color="transparent" fab x-small>
                            <v-icon color="var(--error-color)">mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </div>

                <v-data-table :headers="headersSubcategoria" :items="props.item.subcategorias"
                              item-key="subcategoria"
                              hide-default-footer>
                    <template v-slot:item="props">
                        <div class="flex item-subcategoria">
                            <span>{{ props.item.descricao }}</span>
                            <div>
                                <v-btn elevation="0" color="transparent" fab x-small>
                                    <v-icon color="var(--secondary-color)">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn elevation="0" color="transparent" fab x-small>
                                    <v-icon color="var(--error-color)">mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </template>
                </v-data-table>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: "ListagemCategorias",
    data: () => ({
        headersCategoria: [
            {
                text: "Categorias",
                align: "left",
                value: "descricao",
            }
        ],
        headersSubcategoria: [
            {
                text: "Subcategorias",
                align: "left",
                value: "descricao",
            }
        ],
        footerProps: {
            "items-per-page-text": "Categorias por página:",
            "items-per-page-options": [1, 5, 10, 15, -1],
            "items-per-page-all-text": "Todas",
            "page-text": "",
            "options": {
                itemsPerPage: 5,
            },
        },
        dataTable: [
            {
                descricao: "Bebidas",
                subcategorias: [
                    {descricao: "Refrigerante"},
                    {descricao: "Suco"},
                    {descricao: "Cerveja"}
                ],
            },
            {
                descricao: "Lanches",
                subcategorias: [
                    {descricao: "Pizza"},
                    {descricao: "Hamburger"},
                    {descricao: "Batata frita"}
                ],
            },
            {
                descricao: "Doces",
                subcategorias: [
                    {descricao: "Brigadeiro"},
                    {descricao: "Beijinho"},
                ],
            },
        ],
    }),
}
</script>

<style scoped>
#table-categorias .flex {
    display: flex;
    align-items: center;
}

#table-categorias .item-categoria {
    padding: 10px 15px;
    background: var(--opacity-primary-color);
    font-weight: 600;
    font-size: 15px;
    justify-content: space-between;
}

#table-categorias .item-subcategoria {
    border-bottom: #dadadc solid 1px;
    padding: 10px 15px;
    font-size: 14px;
    justify-content: space-between;
}
</style>