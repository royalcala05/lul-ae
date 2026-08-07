import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { featuredPost, blogPosts } from "../data/blogPosts";
import { apiUrl } from "../lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const hardcodedPost = [featuredPost, ...blogPosts].find((p) => p.slug === slug);
  const [submittedPost, setSubmittedPost] = useState(null);
  const [checkedSubmitted, setCheckedSubmitted] = useState(false);

  useEffect(() => {
    if (hardcodedPost) return;
    let alive = true;
    (async () => {
      try {
        const response = await fetch(apiUrl("/api/blog-posts"));
        if (!response.ok) return;
        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        const found = posts.find((p) => p.slug === slug) || null;
        if (alive) setSubmittedPost(found);
      } finally {
        if (alive) setCheckedSubmitted(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug, hardcodedPost]);

  const post = hardcodedPost || submittedPost;

  if (!post && !hardcodedPost && !checkedSubmitted) {
    return (
      <div className="theme-classic bg-sand page-with-fixed-nav">
        <section className="py-5">
          <div className="container text-center text-muted">Loading...</div>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="theme-classic bg-sand page-with-fixed-nav">
        <section className="py-5">
          <div className="container text-center">
            <p className="text-muted mb-3">We couldn't find that article.</p>
            <Link to="/blog" className="btn btn-lul-red">
              Back to The Alpha Epsilon Collective
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="theme-classic bg-sand page-with-fixed-nav">
      <article className="blog-article">
        <div className="container">
          <Link to="/blog" className="blog-article-back">
            ‹ Back to The Alpha Epsilon Collective
          </Link>

          <div className="blog-article-kicker">
            <span className="blog-tag" style={{ background: post.tagColor, color: post.tagTextColor }}>
              {post.tag}
            </span>
            <span className="blog-article-date">{post.date}</span>
          </div>

          <h1 className="blog-article-headline">{post.title}</h1>
          <p className="blog-article-byline">By The Brothers of Alpha Epsilon</p>

          <img
            src={post.image}
            alt={post.title}
            className="blog-article-image"
            style={{ objectPosition: post.imagePosition || "center" }}
          />

          <div className="blog-article-body">
            {post.body.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "has-dropcap" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="blog-article-footer">
            <Link to="/blog" className="blog-readmore-link">
              Read More From The Alpha Epsilon Collective
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
