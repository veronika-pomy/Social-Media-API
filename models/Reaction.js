const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
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
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

// Getter to format timestamp
function dateNow (createdAt) {
  return `${dayjs(createdAt).format('MMMM Do, YYYY')} at ${dayjs(createdAt).format('H:mm a')}`
};

module.exports = reactionSchema;
  