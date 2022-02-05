function extractNumber(value) {
    return value.replaceAll(".", "").replaceAll(",", ".");
}

function sort(a, b) {
    return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
}

export {extractNumber, sort}