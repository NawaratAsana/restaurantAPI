const Status = require('../model/status')

module.exports.getstatus1 = async (req, res) => {
    try {
        const Status1 = await Status.find();
        res.json(Status1);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}