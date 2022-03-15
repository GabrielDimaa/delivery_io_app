import StatusPedido from "../enums/statusPedido";

function extractNumber(value) {
    return value.replaceAll(".", "").replaceAll(",", ".");
}

function sort(a, b) {
    return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
}

function toMoney(value, withPrefix = false) {
    value = parseFloat(value);

    if (withPrefix) {
        return value.toLocaleString("pt-br", {style: 'currency', currency: 'BRL'});
    } else {
        return value.toLocaleString("pt-br", {minimumFractionDigits: 2});
    }
}

function formatterPhone(phone) {
    phone = phone.replace(/\D/g,"");
    phone = phone.replace(/^(\d{2})(\d)/g,"($1) $2");
    phone = phone.replace(/(\d)(\d{4})$/,"$1-$2");

    return phone;
}

function getPayloadJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch(err) {
        return null;
    }
}

function getColorStatus(status) {
    switch (status) {
        case StatusPedido.Cancelado:
            return {dark: "rgba(219, 22, 47)", light: "rgba(219, 22, 47, 0.2)"};
        case StatusPedido.Aceito:
            return {dark: "rgba(10, 129, 209)", light: "rgba(10, 129, 209, 0.2)"};
        case StatusPedido.EmRotaDeEntrega:
            return {dark: "rgba(234, 115, 23)", light: "rgba(234, 115, 23, 0.2)"};
        case StatusPedido.ProntoParaRetirada:
            return {dark: "rgb(211, 0, 255)", light: "rgba(211, 0, 255, 0.2)"};
        case StatusPedido.Finalizado:
            return {dark: "rgb(19,213,90)", light: "rgba(50, 232, 117, 0.2)"};
        case StatusPedido.EmAberto:
        default:
            return {dark: "rgb(46, 196, 182)", light: "rgba(46, 196, 182, 0.2)"};
    }
}

export {extractNumber, sort, toMoney, formatterPhone, getPayloadJWT, getColorStatus}