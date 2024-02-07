const { Schema, SchemaTypes, model } = require('mongoose');

const blogSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    slug:  {
      type: String,
      required: true,
      lowercase: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
    content: String,
    tags: [String],
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: Date,
    comments: [
        {
            user: {
                type: SchemaTypes.ObjectId,
                ref: 'User',
                required: true,
            },
            content: String,
            votes: Number
        }
    ]
});

// middleware for automatic updating of the updateAt field
blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
})

module.exports = model('Blog', blogSchema);
