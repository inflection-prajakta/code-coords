import { Blogs } from "./mongodb";

export const getAllBlogs = async () => {
  const blogs = await (await Blogs()).find({}).toArray();
  return blogs;
};

export const createBlogs = async (newBlog) => {
  const blog = await (await Blogs()).insertOne(newBlog);
  return blog;
};
