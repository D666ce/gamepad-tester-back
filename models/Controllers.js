const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        id: { type: String, required: true },
        buttons: { type: Number, required: false },
        axes: { type: Number, required: false },
        count: { type: Number, required: false }
    }
);

module.exports = model('Controllers', schema);