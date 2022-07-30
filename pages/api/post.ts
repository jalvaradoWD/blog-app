// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, unstable_getServerSession } from 'next-auth';
import nc from 'next-connect';

import connectDB from '../../middleware/mongodb';
import Post from '../../models/post.model';
import { authOptions } from './auth/[...nextauth]';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Not Signed In' });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const createdPost = await Post.create({
    title: 'Testing Title',
    description: 'Testing Description',
  });

  res.json(createdPost);
});

export default connectDB(handler);
