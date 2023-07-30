const order = require('../model/order');
const orderDrink = require("../model/orderDrink");
const orderFood = require("../model/orderFood");

module.exports.createOrder = async (req, res) => {
  try {
    const {
      total_amount,
      order_date,
      member_id,
      employee_id,
      delivery_type,
      payment_status,
      status,
      foods,
      drinks,
    } = req.body;

    // Create a new Order document
    const newOrder = new order({
      total_amount,
      order_date,
      member_id,
      employee_id,
      status,
      delivery_type,
      payment_status,
    });

    // Create arrays for OrderFood and OrderDrink items
    const foodItems = [];
    const drinkItems = [];

    // Iterate through each food item and create OrderFood document
    for (const food of foods) {
      const foodItem = {
        quantity: food.quantity,
        order_id: newOrder._id,
        food_id: food.food_id,
      };
      foodItems.push(foodItem);
    }

    // Iterate through each drink item and create OrderDrink document
    for (const drink of drinks) {
      const drinkItem = {
        quantity: drink.quantity,
        order_id: newOrder._id,
        drink_id: drink.drink_id,
      };
      drinkItems.push(drinkItem);
    }

    // Save the new Order document to the database
    await newOrder.save();

    // Save the OrderFood documents to the database
    await orderFood.insertMany(foodItems);

    // Save the OrderDrink documents to the database
    await orderDrink.insertMany(drinkItems);

    // Respond with success status and the newly created Order document
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    // If an error occurs, respond with an error status and error message
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to get the history of food and drink orders for a specific order_id
module.exports.getOrderHistory = async (req, res) => {
  try {
    const { order_id } = req.params;

    // Find all OrderFood documents that match the order_id
    const foodOrders = await orderFood.find({ order_id });

    // Find all OrderDrink documents that match the order_id
    const drinkOrders = await orderDrink.find({ order_id });

    // Create an array to store the food order history
    const foodOrderHistory = [];

    // Iterate through each OrderFood document and retrieve food details
    for (const foodOrder of foodOrders) {
      const foodId = foodOrder.food_id;

      // Find the corresponding food document using the foodId
      const foodDetails = await food.findById(foodId);

      // Create an object with food order details and food information
      const orderHistoryItem = {
        quantity: foodOrder.quantity,
        food: foodDetails,
      };

      // Push the order history item to the array
      foodOrderHistory.push(orderHistoryItem);
    }

    // Create an array to store the drink order history
    const drinkOrderHistory = [];

    // Iterate through each OrderDrink document and retrieve drink details
    for (const drinkOrder of drinkOrders) {
      const drinkId = drinkOrder.drink_id;

      // Find the corresponding drink document using the drinkId
      const drinkDetails = await drink.findById(drinkId);

      // Create an object with drink order details and drink information
      const orderHistoryItem = {
        quantity: drinkOrder.quantity,
        drink: drinkDetails,
      };

      // Push the order history item to the array
      drinkOrderHistory.push(orderHistoryItem);
    }

    res.status(200).json({ success: true, foodOrderHistory, drinkOrderHistory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Function to update food and drink orders for a specific order_id
module.exports.updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { foods, drinks } = req.body;

    // Update OrderFood documents for the specific order_id
    if (foods && foods.length > 0) {
      // Iterate through each food item in the request body and update the quantity in OrderFood
      for (const foodItem of foods) {
        const { food_id, quantity } = foodItem;

        // Find the OrderFood document that matches the order_id and food_id
        const orderFoodItem = await orderFood.findOneAndUpdate(
          { order_id, food_id },
          { quantity }
        );

        // If the OrderFood document doesn't exist, create a new one
        if (!orderFoodItem) {
          await orderFood.create({ order_id, food_id, quantity });
        }
      }
    }

    // Update OrderDrink documents for the specific order_id
    if (drinks && drinks.length > 0) {
      // Iterate through each drink item in the request body and update the quantity in OrderDrink
      for (const drinkItem of drinks) {
        const { drink_id, quantity } = drinkItem;

        // Find the OrderDrink document that matches the order_id and drink_id
        const orderDrinkItem = await orderDrink.findOneAndUpdate(
          { order_id, drink_id },
          { quantity }
        );

        // If the OrderDrink document doesn't exist, create a new one
        if (!orderDrinkItem) {
          await orderDrink.create({ order_id, drink_id, quantity });
        }
      }
    }

    res.status(200).json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};