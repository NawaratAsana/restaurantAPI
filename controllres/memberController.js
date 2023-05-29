const member = require('../model/member');
const { db } = require('../model/member')

module.exports.register = async (req, res) => {
    const NewMember = new member({
        name: req.body.name,
        lname: req.body.lname,
        gender: req.body.gender,
        // email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        // image: req.body.image,
        username: req.body.username,
        password: req.body.password,
        role:req.body.role,
    
 
    });
   
    try {
        const saveMember = await NewMember.save();
        res.json(saveMember);
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports.getMember = async (req, res) => {
    try {
        const Member = await member.find();
        res.json(Member);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateMember= async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await member.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.deleteMember= async (req, res) => {
    console.log(req.params)
    let data = await member.deleteOne(req.params);
    res.send(data);
}
module.exports.getMemberId=async(req,res)=>{
    try{
        const data = await member.find(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
