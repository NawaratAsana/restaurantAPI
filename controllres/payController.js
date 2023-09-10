const Payment = require('../model/payment');
const order = require("../model/order");
 // Import the Payment model
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'df8clipqz',
    api_key: '194894554869875',
    api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y'
});

// สร้าง payment record ใหม่
module.exports.createPayment = async (req, res) => {
    try {
        const { image, order_id, payment_status } = req.body;


        const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '',);

        // Upload base64 image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`,{
          resource_type: "auto",
          folder: 'payment'
        });
    
  const payment = await Payment.create({
            order_id,
            payment_status,
            image: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        });

        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ไม่สามารถสร้าง payment ได้' });
    }
};

// Get a list of all payments
module.exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};

// Get payment details by ID
module.exports.getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch payment details' });
    }
};
module.exports.updatePayment = async (req, res) => {
    try {
      const { order_id, payment_status, image } = req.body;

      const existingPayment = await Payment.findOne({ order_id });

      if (!existingPayment) {
        return res.status(404).json({ success: false, message: "Payment record not found for the given order_id" });
      }

      let updatedData = {
        payment_status,
      };
      
        const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
          resource_type: 'auto',
          folder: 'payment',
        });

        updatedData.image = uploadedImage.secure_url;
        updatedData.public_id = uploadedImage.public_id;
      

      const options = { new: true };
      console.log('Received order_id:', order_id); // เพิ่มบรรทัดนี้
      const result = await Payment.findOneAndUpdate({ order_id }, updatedData, options);
      res.status(200).json({ success: true, payment: result });
      console.log('Updated Result:', result); // เพิ่มบรรทัดนี้
    } catch (error) {
        console.error('Error:', error); // เพิ่มบรรทัดนี้
      res.status(400).json({ success: false, message: error.message });
    }
};
