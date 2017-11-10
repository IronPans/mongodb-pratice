const mongoose = require('mongoose');
const UsersModel = mongoose.model('users');

exports.save = (req, res) => {
    const user = new UsersModel(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400)
                .send({
                    message: err
                });
        } else {
            res.jsonp(user);
        }
    })
};

exports.getAddress = (req, res) => {
    /**
     * VirtualType
     */
    //const body = {
    //    name: 'abcd',
    //    phone: '13123123123',
    //    age: 20,
    //    sex: 'male'
    //};
    //const user = new UsersModel(body);
    //user.address.full = 'beijing 100号';
    //user.save();

    UsersModel.findById(req.query.id, (err, result) => {
        if (err) {
            return err.status(400).send({
                message: '用户不存在',
                data: []
            });
        } else {
            console.log(result);
            res.jsonp(result.address.full);
        }
    });
}