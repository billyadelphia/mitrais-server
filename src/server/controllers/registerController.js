import User from '../models/user';

export default {
    async index(req, res) {
        try {
            let request = req.body;
            await User.create(req.body);
            res.status(200);
            res.json({
                message: 'User Created successfully'
            });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.json({
                message: err.errors
            });
        }

    }
};