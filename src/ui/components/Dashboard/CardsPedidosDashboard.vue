<template>
    <v-col cols="12" sm="6" md="4">
        <v-card class="card pa-5 d-flex justify-space-between align-center" height="109" max-width="300">
            <div class="container-icon" :style="{background: background}">
                <v-icon size="40" :color="color">
                    {{ icon }}
                </v-icon>
            </div>

            <div class="container-value">
                <div v-if="!loading" class="value">{{ value }}</div>
                <v-progress-circular v-else class="value" color="var(--primary-color)" indeterminate
                                     background-color="var(--opacity-primary-color)">
                </v-progress-circular>

                <small class="text">{{ text }}</small>
            </div>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name: "CardsPedidosDashboard",
    props: {
        value: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        background: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.card {
    border-radius: 12px;
}

.container-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    width: 64px;
    height: 64px;
}

.container-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
}

.container-value .value {
    font-size: 32px;
    font-weight: 800;
    height: 20px;
}

.container-value .text {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey-color);
}
</style>