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

export {extractNumber, sort, toMoney, formatterPhone}