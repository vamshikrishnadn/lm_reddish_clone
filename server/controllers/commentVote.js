const Post = require('../models/post');
const User = require('../models/user');
const Products = require('../models/products');

//
const upvoteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res.status(404).send({ message: 'User does not exist in database.' });
  }

  const targetComment = post.comments.find(c => c._id.toString() === commentId);

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  if (!commentAuthor) {
    return res.status(404).send({ message: 'Comment author does not exist in database.' });
  }

  if (targetComment.upvotedBy.includes(user._id.toString())) {
    targetComment.upvotedBy = targetComment.upvotedBy.filter(
      u => u.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma--;
  } else {
    targetComment.upvotedBy = targetComment.upvotedBy.concat(user._id);
    targetComment.downvotedBy = targetComment.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma++;
  }

  targetComment.pointsCount = targetComment.upvotedBy.length - targetComment.downvotedBy.length;

  post.comments = post.comments.map(c => (c._id.toString() !== commentId ? c : targetComment));

  await post.save();
  await commentAuthor.save();

  res.status(201).end();
};

const downvoteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res.status(404).send({ message: 'User does not exist in database.' });
  }

  const targetComment = post.comments.find(c => c._id.toString() === commentId);

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  if (!commentAuthor) {
    return res.status(404).send({ message: 'Comment author does not exist in database.' });
  }

  if (targetComment.downvotedBy.includes(user._id.toString())) {
    targetComment.downvotedBy = targetComment.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma++;
  } else {
    targetComment.downvotedBy = targetComment.downvotedBy.concat(user._id);
    targetComment.upvotedBy = targetComment.upvotedBy.filter(
      u => u.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma--;
  }

  targetComment.pointsCount = targetComment.upvotedBy.length - targetComment.downvotedBy.length;

  post.comments = post.comments.map(c => (c._id.toString() !== commentId ? c : targetComment));

  await post.save();
  await commentAuthor.save();

  res.status(201).end();
};

const upvoteReply = async (req, res) => {
  const { id, commentId, replyId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res.status(404).send({ message: 'User does not exist in database.' });
  }

  const targetComment = post.comments.find(c => c._id.toString() === commentId);

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const targetReply = targetComment.replies.find(r => r._id.toString() === replyId);

  if (!targetReply) {
    return res.status(404).send({
      message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
    });
  }

  const replyAuthor = await User.findById(targetReply.repliedBy);

  if (!replyAuthor) {
    return res.status(404).send({ message: 'Reply author does not exist in database.' });
  }

  if (targetReply.upvotedBy.includes(user._id.toString())) {
    targetReply.upvotedBy = targetReply.upvotedBy.filter(u => u.toString() !== user._id.toString());

    replyAuthor.karmaPoints.commentKarma--;
  } else {
    targetReply.upvotedBy = targetReply.upvotedBy.concat(user._id);
    targetReply.downvotedBy = targetReply.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    );

    replyAuthor.karmaPoints.commentKarma++;
  }

  targetReply.pointsCount = targetReply.upvotedBy.length - targetReply.downvotedBy.length;

  targetComment.replies = targetComment.replies.map(r =>
    r._id.toString() !== replyId ? r : targetReply
  );

  post.comments = post.comments.map(c => (c._id.toString() !== commentId ? c : targetComment));

  await post.save();
  await replyAuthor.save();

  res.status(201).end();
};
const downvoteReply = async (req, res) => {
  const { id, commentId, replyId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res.status(404).send({ message: 'User does not exist in database.' });
  }

  const targetComment = post.comments.find(c => c._id.toString() === commentId);

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const targetReply = targetComment.replies.find(r => r._id.toString() === replyId);

  if (!targetReply) {
    return res.status(404).send({
      message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
    });
  }

  const replyAuthor = await User.findById(targetReply.repliedBy);

  if (!replyAuthor) {
    return res.status(404).send({ message: 'Reply author does not exist in database.' });
  }

  if (targetReply.downvotedBy.includes(user._id.toString())) {
    targetReply.downvotedBy = targetReply.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    );

    replyAuthor.karmaPoints.commentKarma++;
  } else {
    targetReply.downvotedBy = targetReply.downvotedBy.concat(user._id);
    targetReply.upvotedBy = targetReply.upvotedBy.filter(u => u.toString() !== user._id.toString());

    replyAuthor.karmaPoints.commentKarma--;
  }

  targetReply.pointsCount = targetReply.upvotedBy.length - targetReply.downvotedBy.length;

  targetComment.replies = targetComment.replies.map(r =>
    r._id.toString() !== replyId ? r : targetReply
  );

  post.comments = post.comments.map(c => (c._id.toString() !== commentId ? c : targetComment));

  await post.save();
  await replyAuthor.save();

  res.status(201).end();
};

const addProduct = async (req, res) => {
  await Products.create({ ...req.body, addedBy: req.user });
  res.status(201).send({ data: true });
};

const getProducts = async (req, res) => {
  const products = await Products.find({})
    .populate([{ model: 'User', path: 'addedBy' }])
    .sort({ createdOn: -1 });
  res.status(201).send({ payload: products });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  await Products.findByIdAndUpdate(id, { ...req.body });

  res.status(201).send({ payload: true });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Products.findByIdAndDelete(id);

  res.status(201).send({ payload: true });
};

const buyProduct = async (req, res) => {
  const { id } = req.params;
  const requester = await User.findById(req?.body?.requesterId);
  const existingRequester = requester?.buyers ?? [];
  delete req?.body?.requesterId;
  console.log('🚀 ~ buyProduct ~ requester:', requester, req.user);
  await Products.findByIdAndUpdate(id, {
    buyers: [...existingRequester, { ...req.body, requester }],
  });

  res.status(201).send({ payload: true });
};

module.exports = {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  buyProduct,
};
