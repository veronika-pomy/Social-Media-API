// Array of users
const username = [
    {
        username: 'mathrocks43',
        email: 'math.rocks@email.com'
    },
    {
        username: 'doglover7',
        email: 'dogs.are.awesome@email.com'
    },
    {
        username: 'cheese_38',
        email: 'c33se@email.com'
    },
    {
        username: 'click2',
        email: 'click_click@email.com'
    },
];

// Array of thoughts
const thought = [
    {
        thoughtText: 'I love math!',
        username: 'mathrocks43',
        reactions: [ 
            {
                reactionBody: 'Me too!',
                username: 'cheese_38'
            }
        ],
    },
    {
        thoughtText: 'This is my fav math problem:...',
        username: 'mathrocks43',
        reactions: [ 
            {
                reactionBody: 'Woah math is hard',
                username: 'doglover7'
            }
        ],
    },
    {
        thoughtText: 'Dogs are the best',
        username: 'doglover7',
        reactions: [
            {
                reactionBody: 'I love dogs too <3',
                username: 'mathrocks43'
            }
        ],
    },
    {
        thoughtText: 'Here is an updated list of the most popular dogs!',
        username: 'doglover7',
        reactions: [ 
            {
                reactionBody: 'clickclickclickclick',
                username: 'click2'
            },
            {
                reactionBody: 'What a great list, super helpful',
                username: 'cheese_38'
            }
        ],
    },
    {
        thoughtText: 'Looking for a new market to try new cheeses. Any suggestions?',
        username: 'cheese_38',
        reactions: [ ],
    },
    {
        thoughtText: 'click click',
        username: 'click2',
        reactions: [ ],
    },
];

// Export arrays for use in seed.js
module.exports = { username, thought };