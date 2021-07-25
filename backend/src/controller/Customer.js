const CustomerModel = require('../model/CustomerModel');


class CustomerController {

    async create(req, res){
        const customer = new CustomerModel(req.body);
        await customer.save()
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' });
        });
    }

    async update(req, res){
        await CustomerModel.findOneAndUpdate({'_id': req.params.id}, req.body, { new: true})
        .then(response => {
            if (!response){
                return res.status(400).json({error: 'Customer not found'});
            }
            return res.status(200).json(response);
            
        })
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' })
        });
    }

    async all (req, res){

        await CustomerModel.find().sort('since')
        .then( response => {
            
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' });
        });

    }
    async getById (req, res){
        
        await CustomerModel.findById(req.params.id)
        .then( response => {

            if (response)
            return res.status(200).json(response);
            else
            return res.status(400).json({error: 'Customer not found'});

        })
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' });
        });

    }

    async delete (req, res){
        
        await CustomerModel.deleteOne({'_id': req.params.id})
        .then( response => {

            if (!!response)
            return res.status(200).json({ msg: "Successfully deleted"});
            else
            return res.status(400).json({ msg: "Delete routine failed"});
        })
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' });
        });

    }

    async getByName (req, res){
        const name = req.params.name;
        const reg = new RegExp(`^${name}`, 'i');
        
        await CustomerModel.find({ name: { $regex: reg }})
        .then(response => {
            if (response.length == 0){
                return res.status(400).json({ msg: "Customer not found" });    
            }
            return res.status(200).json(response);
        })  
        .catch(error => {
            return res.status(500).json({ error: error.message, msg: 'Customer not found' });
        })
    }

    async getLastInsertId(){
        await CustomerModel.find().sort({"_id" : -1}).limit(1)
            .then( response => {
                console.log('dentro', response[0]._id);
                if(!!response[0]._id){
                    return response[0]._id;
                }

                return 0;
        });
    }

    
}

module.exports = new CustomerController();