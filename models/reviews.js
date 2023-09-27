const { func } = require("joi");
const mongoose = require("mongoose");
const product = require("./product");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "please provide some text"],
      maxlength: [1000, "e don do abeg"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
          $group: {
            _id: "$product",
            averageRating: { $avg: "$rating" }, // Corrected field name
            numOfReviews: { $sum: 1 },
          },
        },
      ]);
      
    // console.log(result);
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },

      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: (result[0]?.numOfReviews || 0),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Reviews", ReviewSchema);
