
const CustomerValidation = async (req, res, next) => {


    const { name, value, since } = req.body; 

    if (!name)
        return res.status(400).json( { error: 'name is required'} );

    if (!value)
        return res.status(400).json( { error: 'value is required'} );

    if (!since)
        return res.status(400).json( { error: 'since is required'} );    

    next();
    

}

module.exports = CustomerValidation;