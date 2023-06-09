
const express = require('express');
const router = express.Router();
const member = require('../controllres/memberController');
const employee = require('../controllres/employeeController');
const position = require('../controllres/positionController')
const food = require('../controllres/foodController')
const drink = require('../controllres/drinkController')
const typeFood = require('../controllres/tFoodController')
const typeDrink = require('../controllres/tDrinkController')
const status = require('../controllres/statusController')
const order = require('../controllres/orderController')
const orderFood = require('../controllres/orderFoodController')
const orderDrink = require('../controllres/orderDrinkController')
const register = require('../controllres/registerController')
const auth = require('../controllres/authController')
// const verifyToken = require('../middleware/middleware');
//router everything

// member
router.get("/member",  member.getMember);
// router.post('/login',member.login)
router.post("/member/register", member.register); // สมัครสมาชิก
router.post("/member/update/:id",  member.updateMember);
router.get("/member/get/:id" ,  member.getMemberId);
// employee
router.get("/employee",  employee.getEmployee);
router.post("/employee/create", employee.addemployee);
router.post("/employee/update/:id", employee.updateEmployee);
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

// status
router.get("/status", status.getstatus1);

// type Food
router.get("/typeFood", typeFood.getTypeFood);

// type Drink
router.get("/typeDrink", typeDrink.getTypeDrink);

//  Order
router.get("/order", order.getOrder);
router.post("/order/create", order.addorder);

//  Order food
router.get("/orderFood", orderFood.getOrderFood);
router.post("/orderFood/create", orderFood.getOrderFood);

//  Order drink
router.get("/orderDrink", orderDrink.getOrderDrink);
router.post("/orderDrink/create", orderDrink.addorderdrink);

// register
router.post('/register', register.add_user);
router.post('/login', auth.loginUser);
router.post('/login/employee', auth.loginEmployee);
router.post('/logout', auth.logout);

module.exports = router;