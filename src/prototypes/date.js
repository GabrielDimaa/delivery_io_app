Date.prototype.toJSONLocal = function() {
    const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
    this.setHours(hoursDiff);

    return this.toISOString().replaceAll("Z", "");
};