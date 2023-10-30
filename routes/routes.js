
const express = require('express');
const router = express.Router();
const member = require('../controllres/memberController');
const employee = require('../controllres/employeeController');
const position = require('../controllres/positionController')
const food = require('../controllres/foodController')
const drink = require('../controllres/drinkController')
const typeFood = require('../controllres/tFoodController')
const typeDrink = require('../controllres/tDrinkController')

const order = require('../controllres/orderController')
const payment = require('../controllres/payController')
const register = require('../controllres/registerController')
const auth = require('../controllres/authController')
const handler = require('../controllres/upload');

// const verifyToken = require('../middleware/middleware');


//router everything

// member
router.get("/member",  member.getMember);
// router.post('/login',member.login)
router.post("/member/register", member.register); // สมัครสมาชิก
router.post("/member/update/:id",  member.updateMember);
router.get("/member/get/:id" ,  member.getMemberId);
// employee
router.get("/employee",  employee.getemployee);
router.post("/employee/create", employee.addemployee);
router.post("/employee/update/:id", employee.updateemployee);
router.delete("/employee/delete/:id", employee.deleteEmployee);
router.get("/employee/get/:id" , employee.getEmployeeId);
// food
router.get("/food", food.getFood);
router.post("/food/create", food.addFood);
router.post("/food/update/:id", food.updateFood);
router.delete("/food/delete/:id", food.deleteFood);
router.get("/food/get/:id" , food.getFoodId);


// drink
router.get("/drink", drink.getDrink);
router.post("/drink/create", drink.addDrink);
router.post("/drink/update/:id", drink.updateDrink);
router.delete("/drink/delete/:id", drink.deleteDrink);

// position
router.get("/position", position.getPosition);
router.post("/position/create", position.addPosition);

// type Food
router.get("/typeFood", typeFood.getTypeFood);

// type Drink
router.get("/typeDrink", typeDrink.getTypeDrink);

//  Order
router.get("/order", order.getAllOrders);
router.post("/order/create", order.createOrder);
router.post("/order/update/:id", order.updateOrder);
router.get("/order/searchOrdersByMemberId/:id" , order.searchOrdersByMemberId);
router.get("/order/searchOrdersByEmployeeId/:id" , order.searchOrdersByEmployeeId);

// Payment
router.post("/payment/create",payment.createPayment);
router.post("/payment/update",payment.updatePayment);
router.get("/payment",payment.getAllPayments);
router.get("/payment/get/:id",payment.getPaymentById);
// register
router.post('/register', register.add_user);
router.post('/login', auth.loginUser);
router.post('/login/employee', auth.loginEmployee);
router.post('/logout', auth.logout);

  module.exports = router;