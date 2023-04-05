const { Schema, model } = require('mongoose');

// Schema for User model
const userSchema = new Schema(
    {
      username: { 
        type: String, 
        required: true,
        trim: true, // removes spaces from both sides of string
        unique: true, // username must be unique
    },
    email: {
        type: String, 
        required: true,
        unique: true, // username must be unique
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v); //  match a valid email address
            },
            message: props => `${props.value} is not a valid email. Please try again!`
          },
    },
    thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
    friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // self-ref
            },
        ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

// Virtual to get length of the user's friends array
userSchema
.virtual('friendCount ')
// use getter
.get(function () {
  return this.friends.length;
});

// Init User model
const User = model('user', userSchema);

module.exports = User;