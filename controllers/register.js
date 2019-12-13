const register = async (req, res, next) => {
    //TODO: register user
    console.log(req.body);
    const data = req.body;
    res.success({data});
};

module.exports = register;