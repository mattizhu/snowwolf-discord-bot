const {Schema, model} = require('mongoose');

const projectSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true, enum: ['current', 'upcoming']},
    dateStart: Date,
    dateEnd: Date,
    createdAt: {type: Date, default: Date.now}
});

module.exports = model('projects', projectSchema);
