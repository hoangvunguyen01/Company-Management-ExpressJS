const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Employee = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        birth_day: { type: Date, required: true, default: Date.now },
        gender: { type: String, required: true },
        address: { type: String, required: true },
        position: { type: Number, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        salary: { type: Number, required: true },
        start_date: { type: Date, required: true, default: Date.now },
        days_off: { type: Number, required: true },
        account: {
            username: { type: String },
            password: { type: String },
            first_time: { type: Boolean },
        },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);

mongoose.plugin(slug);

Employee.plugin(AutoIncrement);
Employee.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Employee', Employee);
