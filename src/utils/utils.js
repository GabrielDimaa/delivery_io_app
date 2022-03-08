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

function convertTZ(date) {
    if (!date) return null;

    if (typeof date === "string") date = new Date(date);
    return new Date(date.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
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

export {extractNumber, sort, toMoney, formatterPhone, convertTZ, getPayloadJWT}