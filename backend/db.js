const mongoose = require("mongoose");
const mongoUrl =
	"mongodb+srv://gofood:mern123@cluster0.w2kqhyw.mongodb.net/gofood?retryWrites=true&w=majority";

const mongoDB = async () => {
	try {
		await mongoose.connect(mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");

		const fetchedData = await mongoose.connection.db
			.collection("food_items")
			.find({})
			.toArray();
		const catData = await mongoose.connection.db
			.collection("foodCategory")
			.find({})
			.toArray();

		global.food_items = fetchedData;
		global.foodCategory = catData;

		console.log("Data fetched and stored globally");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

module.exports = mongoDB;
