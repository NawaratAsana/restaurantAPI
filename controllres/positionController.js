const position = require('../model/position')

module.exports.getPosition = async (req, res) => {
    try {
        const Position = await position.find();
        res.json(Position);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.addPosition = async (req, res) => {
    const NewPosition = new position({
        name: req.body.name,

    });
    try {
        const saveposition = await NewPosition.save();
        res.json(saveposition);
    } catch (err) {
        res.json({ message: err });
    }
}