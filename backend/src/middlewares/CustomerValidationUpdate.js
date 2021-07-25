const CustomerValidationUpdate = async (req, res, next) => {


    const { name, value, since } = req.body; 

    if (!name && !value && !since)
        return res.status(400).json( { error: 'name or value or since are required to update'} );

    next();
    

}

module.exports = CustomerValidationUpdate;