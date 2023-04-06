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
        username: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            get: dateNow,
        },
        reactions: [ Reaction ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// getter for timestamp now
function dateNow ( ) {
    return Date.now
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