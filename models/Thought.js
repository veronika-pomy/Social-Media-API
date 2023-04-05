const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema for Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            // use getter method to format timestamp n query ???
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ Reaction ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

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