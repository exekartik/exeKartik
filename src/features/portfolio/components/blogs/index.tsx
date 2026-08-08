import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { BLOG_POSTS } from "@/features/portfolio/data/blogs"

import { BlogItem } from "./blog-item"

const ID = "blog"

export function Blogs() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Blog</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="p-2">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BLOG_POSTS.map((post, index) => (
            <li key={post.id} className="h-full">
              <BlogItem
                post={post}
                imageLoading={index <= 3 ? "eager" : "lazy"}
              />
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
