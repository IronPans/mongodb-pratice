module.exports = {
    lastModified(schema, options) {
        schema.add({ lastMod: Date });

        schema.pre('save', function (next) {
            this.lastMod = new Date;
            next()
        });
    }
}