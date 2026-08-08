import type { BlogPost } from "../types/blogs"

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "node-thread-pool",
    title: "Inside the Node.js Thread Pool: How libuv Powers Concurrency",
    link: "https://medium.com/@kartikvskumarsingh/node-js-thread-pool-under-the-hood-aa8efa8fb079",
    image: "/images/blogs/node-thread-pool.jpg",
    publishedAt: "2024-05-15",
    platform: "Medium",
    summary:
      "Deep dive into libuv, event loop mechanics, worker threads, and non-blocking I/O operations in Node.js.",
  },
  {
    id: "js-interview-prep",
    title: "JavaScript Interview Prep: Last-Minute Revision Guide",
    link: "https://medium.com/@kartikvskumarsingh/javascript-interview-prep-last-minute-revision-fdbc4ad8db0f",
    image: "/images/blogs/js-interview-prep.jpg",
    publishedAt: "2024-06-10",
    platform: "Medium",
    summary:
      "A concise revision cheatsheet covering event loop, call stack, closures, scope chain, and prototypes.",
  },
  {
    id: "ai-social-prompts",
    title:
      "10 AI Prompts That Will Write Your Social Media Copy for Next Month",
    link: "https://medium.com/@kartikvskumarsingh/10-ai-prompts-that-will-write-your-social-media-copy-for-the-next-month-c95fe4ef78d2",
    image: "/images/blogs/ai-social-media-prompts.jpg",
    publishedAt: "2024-07-01",
    platform: "Medium",
    summary:
      "High-converting generative AI prompt frameworks for automated post creation and content strategy.",
  },
  {
    id: "js-this-call-apply-bind",
    title: "The Magic of 'this', call(), apply(), & bind() in JavaScript",
    link: "https://medium.com/@kartikvskumarsingh",
    image: "/images/blogs/js-this-call-apply-bind.png",
    publishedAt: "2024-08-05",
    platform: "Hashnode",
    summary:
      "Mastering execution context, dynamic scope binding, function invocation rules, and partial application.",
  },
]
