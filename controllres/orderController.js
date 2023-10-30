const order = require("../model/order");
const orderDrink = require("../model/orderDrink");
const orderFood = require("../model/orderFood");
const Payment = require("../model/payment")

module.exports.createOrder = async (req, res) => {
  try {
    const {
      total_amount,
      order_date,
      member_id,
      employee_id,
      delivery_type,
      status,
      foods,
      drinks,
      delivery_location,

    } = req.body;

    
    let order_number_prefix = '';
    if (delivery_type === 'Dine-in') {
      order_number_prefix = 'DI';
    } else if (delivery_type === 'Takeaway') {
      order_number_prefix = 'TA';
    } else if (delivery_type === 'Delivery') {
      order_number_prefix = 'DE';
    }
       // Find the last order based on delivery_type using the static method
       const lastOrder = await order.findLastOrderByDeliveryType(delivery_type);

       // Initialize lastNumber to 0
       let lastNumber = 0;
   
       // Check if lastOrder exists, then get the lastNumber
       if (lastOrder) {
         lastNumber = parseInt(lastOrder.order_number.substring(2));
       }
       
       // Generate the order_number using the prefix and lastNumber
       const order_number = `${order_number_prefix}${(lastNumber + 1).toString().padStart(4, '0')}`;
    
    const newOrder = new order({
      order_number,
      total_amount,
      order_date,
      member_id,
      employee_id,
      status,
      delivery_type,
      delivery_location,

    });
    // Create a new payment entry
    const newPayment = new Payment({
      order_id: newOrder._id,
      payment_status: 'รอการชำระเงิน', // Assuming initial payment status

    });

    // Save the new payment entry
    await newPayment.save();


    const foodItems = [];
    const drinkItems = [];


    for (const food of foods) {
      const foodItem = {
        quantity: food.quantity,
        order_id: newOrder._id,
        food_id: food.food_id,
        detail:food.detail,
      };
      foodItems.push(foodItem);
    }


    for (const drink of drinks) {
      const drinkItem = {
        quantity: drink.quantity,
        order_id: newOrder._id,
        drink_id: drink.drink_id,
        detail:drink.detail,

      };
      drinkItems.push(drinkItem);
    }


    await newOrder.save();


    await orderFood.insertMany(foodItems);

    await orderDrink.insertMany(drinkItems);
 

    res.status(201).json({ success: true, order: newOrder,  });//order_id: newOrder._id
  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Check if the update includes status change to "cancelled"
    if (updatedData.status === "cancelled") {
      updatedData.cancellation_reason = req.body.cancellation_reason;
      // Update payment status to "cancelled" in the Payment collection
      await Payment.updateOne({ order_id: id }, { payment_status: "ยกเลิก" });
    }
    if (updatedData.status === "completed") {
      updatedData.status = req.body.status;
      // Update payment status to "cancelled" in the Payment collection
      await Payment.updateOne({ order_id: id }, { payment_status: "ชำระเงินแล้ว" });
    }
    const updatedOrder = await order.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.searchOrdersByMemberId = async (req, res) => {
  try {
    const member_id = req.params.id;

    if (!member_id) {
      return res.status(400).json({ success: false, error: 'Missing member_id parameter' });
    }


    const orders = await order.find({ member_id }).sort({ order_date: -1 });


    const combinedOrders = {};


    for (const order of orders) {

      const foundFoodOrders = await orderFood.find({ order_id: order._id });
      const foundDrinkOrders = await orderDrink.find({ order_id: order._id });

      const orderDetails = {
        _id: order._id,
        order_number:order.order_number,
        total_amount: order.total_amount,
        order_date: order.order_date,
        delivery_type: order.delivery_type,
        status: order.status,
        delivery_location: order.delivery_location,
        foodOrders: foundFoodOrders,
        drinkOrders: foundDrinkOrders,
        member_id:order.member_id,
        employee_id:order.employee_id,
      };


    
      combinedOrders[order._id] = orderDetails;
    }

    // Respond with the combined order details
    res.status(200).json({ success: true, combinedOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.searchOrdersByEmployeeId = async (req, res) => {
  try {
    const employee_id = req.params.id;

    // Check if employee_id is provided
    if (!employee_id) {
      return res.status(400).json({ success: false, error: 'Missing employee_id parameter' });
    }

    // Fetch orders that match the employee_id
    const orders = await order.find({ employee_id }).sort({ order_date: -1 });

    // Initialize an object to hold the combined order details
    const combinedOrders = {};

    // Iterate through the orders and extract details for each order_id
    for (const order of orders) {
      // Search for OrderFood and OrderDrink documents with the current order_id
      const foundFoodOrders = await orderFood.find({ order_id: order._id });
      const foundDrinkOrders = await orderDrink.find({ order_id: order._id });
      const foundPayment = await Payment.findOne({ order_id: order._id });
      // Combine the results for the current order_id

      const orderDetails = {
        _id: order._id,
        order_number:order.order_number,
        total_amount: order.total_amount,
        order_date: order.order_date,
        delivery_type: order.delivery_type,
        status: order.status,
        delivery_location: order.delivery_location,
        foodOrders: foundFoodOrders,
        drinkOrders: foundDrinkOrders,
        employee_id:order.employee_id,
        member_id:order.member_id,
        payment:foundPayment
      };



      // Add the orderDetails to the combinedOrders object
      combinedOrders[order._id] = orderDetails;
    }

    // Respond with the combined order details
    res.status(200).json({ success: true, combinedOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await order.find();

    // Initialize an object to hold the combined order details
    const combinedOrders = {};

    // Iterate through the orders and extract details for each order_id
    for (const orderItem of orders) {
      // Search for OrderFood and OrderDrink documents with the current order_id
      const foundFoodOrders = await orderFood.find({ order_id: orderItem._id });
      const foundDrinkOrders = await orderDrink.find({ order_id: orderItem._id });
      const foundPayment = await Payment.findOne({ order_id: orderItem._id });


      // Combine the results for the current order_id
      const orderDetails = {
        _id: orderItem._id,
        order_number:orderItem.order_number,
        member_id: orderItem.member_id,
        employee_id: orderItem.employee_id,
        total_amount: orderItem.total_amount,
        order_date: orderItem.order_date,
        delivery_type: orderItem.delivery_type,
        status: orderItem.status,
        delivery_location: orderItem.delivery_location,
        foodOrders: foundFoodOrders,
        drinkOrders: foundDrinkOrders,
        payment:foundPayment,
      };

      // Add the orderDetails to the combinedOrders object
      combinedOrders[orderItem._id] = orderDetails;
    }

    // Respond with the combined order details
    res.status(200).json({ success: true, combinedOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

