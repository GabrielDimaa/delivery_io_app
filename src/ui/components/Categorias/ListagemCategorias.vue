<template>
    <div id="table-categorias">
        <v-data-table :headers="headersCategoria" hide-default-header :items="dataTable" item-key="id_categoria" class="elevation-2"
                      :footer-props="footerProps" :items-per-page="5" no-data-text="">
            <template v-slot:item="props">
                <div class="flex item-categoria">
                    <span>{{ props.item.descricao }}</span>
                    <div>
                        <ButtonActionTable :onClick="(_) => onClickUpdate(props.item)" :icon="'mdi-pencil'" :color="'var(--secondary-color)'"/>
                        <ButtonActionTable :onClick="(_) => onClickDelete(props.item)" :icon="'mdi-delete'" :color="'var(--error-color)'"/>
                    </div>
                </div>

                <v-data-table :headers="headersSubcategoria" :items="props.item.subcategorias"
                              item-key="id_subcategoria"
                              no-data-text=""
                              :disable-sort="props.isMobile"
                              hide-default-footer>
                    <template v-if="props.item.subcategorias.length > 0" v-slot:item="props">
                        <div class="flex item-subcategoria">
                            <span>{{ props.item.descricao }}</span>
                        </div>
                    </template>
                </v-data-table>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import ButtonActionTable from "../shared/ButtonActionTable";

export default {
    name: "ListagemCategorias",
    components: {ButtonActionTable},
    props: {
        dataTable: {
            type: Array,
            default: () => {return [];},
        },
        onClickUpdate: {
            type: Function,
            required: true
        },
        onClickDelete: {
            type: Function,
            required: true
        }
    },
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
        }
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
    padding: 12px 15px;
    font-size: 14px;
}
</style>