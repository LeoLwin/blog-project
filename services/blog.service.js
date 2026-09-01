import * as repo from "../repositories/blog.repository.js";
import * as Response from "../config/response.helper.js";

export const getBlogs = async () => {
    try {
        const blogs = await repo.findAll();
        console.log("blogs : ", blogs)
        return Response.success(blogs, "Blogs fetched successfully");
    } catch (err) {
        return Response.internalServerError(err.message);
    }
};

export const getBlogById = async (id) => {
    try {
        const blog = await repo.findById(id);
        if (!blog) return Response.notFound("Blog not found");
        return Response.success(blog, "Blog fetched successfully");
    } catch (err) {
        return Response.internalServerError(err.message);
    }
};

export const createBlog = async (payload) => {
    try {
        console.log("Service payload : ", payload)
        const blog = await repo.create(payload);
        return Response.created(null, "Blog created successfully");
    } catch (err) {
        return Response.internalServerError(err.message);
    }
};

export const updateBlog = async (id, payload) => {
    try {
        const blog = await repo.update(id, payload);
        if (!blog) return Response.notFound("Blog not found");
        return Response.success(blog, "Blog updated successfully");
    } catch (err) {
        return Response.internalServerError(err.message);
    }
};

export const deleteBlog = async (id) => {
    try {
        const blog = await repo.remove(id);
        if (!blog) return Response.notFound("Blog not found");
        return Response.success(blog, "Blog deleted successfully");
    } catch (err) {
        return Response.internalServerError(err.message);
    }
};