const express = require('express')
const router = express.Router()
const Request = require('../models/request')

router.post('/add-requests', async (req, res) => {
    const { address, nftType } = req.body

    try {

        let existingRequest = await Request.findOne({ address: address, nftType: nftType, isApproved: false })
        if (existingRequest) {
            return res.status(200).json({ message: "Request already exists" })
        }

    }
    catch (e) {
        console.log(e)
    }

    // check if request already exists and is approved
    try {
        existingRequest = await Request.findOne({ address: address, nftType: nftType, isApproved: true })
        if (existingRequest) {
            return res.status(500).json({ message: "ALready Approved" })
        }
    }
    catch (e) {
        console.log(e)
    }

    const request = new Request({
        address: address,
        nftType: nftType,
        isApproved: false
    })
    try {
        const newRequest = await request.save()
        return res.json(newRequest).status(200)
    }
    catch (err) {
        console.log(err)
        return res.json(err).status(500)
    }
})

router.put('/update-requests/:id', async (req, res) => {

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true })
        if (!request) {
            return res.status(404).json({ message: "Request not found" })
        }
        const newRequest = await request.save()
        return res.json(newRequest).status(200)
    }
    catch (err) {
        console.log(err)
        return res.json(err).status(500)
    }
});



// get all non-approved requests
router.get('/get-requests', async (req, res) => {
    try {
        const req = await Request.find({ isApproved: false })
        return res.json(req).status(200)
    }
    catch (err) {
        return res.json(err).status(500)
    }
});

module.exports = router;