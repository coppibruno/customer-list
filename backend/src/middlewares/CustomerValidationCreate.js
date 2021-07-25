const CustomerController = require('../controller/Customer');

const CustomerValidation = async (req, res, next) => {


    const { name, value, since } = req.body; 

    if (!name)
        return res.status(400).json( { error: 'name is required'} );

    if (!value)
        return res.status(400).json( { error: 'value is required'} );

    if (!since)
        return res.status(400).json( { error: 'since is required'} );    

    if (!req.body.id){
        //increment id for table in frontend
        const id = await CustomerController.getLastInsertId();
        req.body.id = id + 1;
        
    }

    next();
    

}

module.exports = CustomerValidation;