const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Answer=require('../models/answer')
const Question=require('../models/question')

router.post('/signup', async (req, res) => {
    const address = req.body.address
    // console.log(address)
    const existingUser = await User.findOne({ account: address })
    if (existingUser) {
      return res.status(200).json(existingUser)
    }
  
    const user = new User({
      account: address
    })
    try {
      const newUser = await user.save()
      return res.json(newUser).status(200)
    }
    catch (err) {
      console.log(err)
      return res.json(err).status(500)
    }
})  
router.post("/all-upvotes", async (req, res) => {
  // console.log(req.body.userId)
  try {
    console.log(req.body.user)
    const answers = await Answer.find({"userId": req.body.user})
    let totalUpvotes = 0;
    answers.forEach((answer) => {
      totalUpvotes += answer.upvotes.length;
    });
    res.status(200).json({ totalUpvotes });
  
  }
  catch (error) {
    res.status(500).json({error, msg: 'Error getting upvotes'})
  }
});
router.post('/get-question-by-user', async (req, res) => {
  try {
      const questions = await Question.find({ "userId": req.body.userId })
      let arr=[]
      // console.log("Aryan here",questions);
      await Promise.all(questions.map(async (question,idx)=>{
        const answers=await Answer.find({'questionId':question._id})
        arr.push({...questions[idx]._doc, ans: answers.length})
      }))
      console.log(arr)
      return res.json(arr).status(200);
  } catch (err) {
      console.error(err);
      return res.json(err).status(500);
  }
});

module.exports = router;