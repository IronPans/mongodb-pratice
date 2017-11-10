const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validation = require('../common/validation');

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 6
    },
    age: {
        type: Number,
        min: 18,
        max: 30,
        required: true
    },
    sex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '`{PATH}` 是 `{VALUE}`， 您必须确认您的性别!'
        },
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: validation.phone,
            message: '`{PATH}` 必须是有效的11位手机号码!'
        },
        required: true
    },
    address: {
        city: {type: String},
        street: {type: String}
    }
}, {collection: 'users'});

/**
 * 进阶篇
 * @type {VirtualType}
 */
const address = UsersSchema.virtual('address.full');

address.get(function() {
    return this.address.city + ' ' + this.address.street;
});

address.set(function(v) {
    const split = v.split(' ');
    this.address.city = split[0];
    this.address.street = split[1];
});

mongoose.model('users', UsersSchema);