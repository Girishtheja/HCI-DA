const Answer = require('../models/answer')
const express = require('express')
const router = express.Router()

router.get('/answers/:id', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.id }).populate('userId', 'account')
    res.json(answers).status(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/add-answer', async (req, res) => {
  console.log("called")
  const { questionId, userId, content, upvotes, downvotes,code,codeLanguage } = req.body
  const answer = new Answer({
    questionId: questionId,
    userId: userId,
    content: content,
    code:code,
    codeLanguage:codeLanguage,
    upvotes: upvotes,
    downvotes: downvotes
  })
  try {
    const newAnswer = await answer.save()
    return res.json(newAnswer).status(200)
  }
  catch (err) {
    return res.json(err).status(500)
  }
})

router.post('/upvote/:id', async (req, res) => {

  console.log("dasds")
  try {
    const answerId = req.params.id;
    const userId = req.body.userId; // assuming you're sending the userId in the request body
    const answer = await Answer.findById(answerId);

    // check if the user has already upvoted the answer
    const userUpvotedIndex = answer.upvotes.findIndex(upvote => upvote.upvote.toString() === userId);
    if (userUpvotedIndex !== -1) {
      // delete the upvote record
      answer.upvotes.splice(userUpvotedIndex, 1);
      await answer.save();
      return res.json(answer);
    }

    // remove the user's downvote if they had downvoted earlier
    const userDownvotedIndex = answer.downvotes.findIndex(downvote => downvote.downvote.toString() === userId);
    if (userDownvotedIndex !== -1) {
      answer.downvotes.splice(userDownvotedIndex, 1);
    }

    // add the upvote to the answer document
    answer.upvotes.push({ upvote: userId });
    await answer.save();

    res.json(answer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/downvote/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const userId = req.body.userId; // assuming you're sending the userId in the request body
    const answer = await Answer.findById(answerId);

    // check if the user has already downvoted the answer
    const userDownvotedIndex = answer.downvotes.findIndex(downvote => downvote.downvote.toString() === userId);
    if (userDownvotedIndex !== -1) {
      // delete the upvote record
      answer.downvotes.splice(userDownvotedIndex, 1);
      await answer.save();
      return res.json(answer);
    }

    // remove the user's upvote if they had upvoted earlier
    const userUpvotedIndex = answer.upvotes.findIndex(upvote => upvote.upvote.toString() === userId);
    if (userUpvotedIndex !== -1) {
      answer.upvotes.splice(userUpvotedIndex, 1);
    }

    // add the downvote to the answer document
    answer.downvotes.push({ downvote: userId });
    await answer.save();

    res.json(answer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/upvotes/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);
    res.json({ length: answer.upvotes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/downvotes/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);
    res.json({ length: answer.downvotes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.put('/modify/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const { content, userId } = req.body;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check if authenticated user is the same as the user who posted the answer
    if (answer.userId.toString() !== userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    answer.content = content;
    await answer.save();

    res.json(answer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check if authenticated user is the same as the user who posted the answer
    if (answer.userId.toString() !== req.body.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Answer.deleteOne({ _id: answerId });

    res.json({ msg: 'Answer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;