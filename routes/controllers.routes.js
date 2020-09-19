const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const Controllers = require('../models/Controllers');

const router = Router();

/* /api/controllers/register */
router.post(
    '/register',
    [
        check('id', 'Incorrect controller id').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Controller registration error'
                });
            }

            const { id, buttons, axes } = req.body;
            const candidate = await Controllers.findOne({ id, buttons, axes });

            if (!candidate) {
                const controller = new Controllers({ id, buttons, axes, count: 1 });
                await controller.save();
                res.status(200).json(controller);
            } else {
                await Controllers.updateOne({ _id: candidate._id }, { $inc: { count: 1 }});
                const result = await Controllers.findOne({ _id: candidate._id });
                res.status(200).json(result);
            }
            await res.status(200);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again'})
        }
});

/* /api/controllers/list */
router.get(
    '/list',
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Error while getting the list of controllers'
                });
            }

            const candidate = await Controllers.find();
            res.status(200).json(candidate);

        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong, please try again',
                error
            })
        }
    }
);

module.exports = router;