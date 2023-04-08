const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dayjs = require('dayjs');

var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

// Schema for Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: dateNow,
        },
        reactions: [ Reaction ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Getter to format timestamp
function dateNow (createdAt) {
    return `${dayjs(createdAt).format('MMMM Do, YYYY')} at ${dayjs(createdAt).format('H:mm a')}`
};

// Virtual to get numebr of reactions to a thought
thoughtSchema
.virtual('reactionCount')
// use getter
.get(function () {
    return this.reactions.length;
});


// Init Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;