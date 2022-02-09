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

export {extractNumber, sort, toMoney}