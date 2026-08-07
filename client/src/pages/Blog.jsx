import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { featuredPost, blogPosts } from "../data/blogPosts";
import { apiUrl } from "../lib/api";

const START_YEAR = 2024;

function PostTag({ tag, tagColor, tagTextColor }) {
  return (
    <span className="blog-tag" style={{ background: tagColor, color: tagTextColor }}>
      {tag}
    </span>
  );
}

export default function Blog() {
  const [submittedPosts, setSubmittedPosts] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const response = await fetch(apiUrl("/api/blog-posts"));
        if (!response.ok) return;
        const data = await response.json();
        if (alive) setSubmittedPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch {
        // brother-submitted posts are additive; silently skip if unreachable
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const allPosts = useMemo(
    () => [featuredPost, ...blogPosts, ...submittedPosts],
    [submittedPosts]
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const latestYear = Math.max(currentYear, ...allPosts.map((p) => p.year));
    const list = [];
    for (let y = latestYear; y >= START_YEAR; y--) list.push(y);
    return list;
  }, [allPosts]);

  const [activeYear, setActiveYear] = useState("All");

  const filteredPosts = useMemo(
    () => (activeYear === "All" ? allPosts : allPosts.filter((p) => p.year === activeYear)),
    [allPosts, activeYear]
  );

  const [featured, ...rest] = filteredPosts;

  return (
    <div className="theme-classic bg-sand page-with-fixed-nav">
      {/* MASTHEAD */}
      <section className="blog-masthead">
        <div className="container text-center">
          <h1 className="blog-masthead-title">The Alpha Epsilon Collective</h1>
          <p className="blog-masthead-subtitle">
            Stories from brotherhood, service, and the P.A.T.H.E. initiative
          </p>
        </div>
        <div className="blog-year-nav">
          <div className="container d-flex flex-wrap justify-content-center gap-3">
            <button
              type="button"
              className={`blog-year-tab${activeYear === "All" ? " active" : ""}`}
              onClick={() => setActiveYear("All")}
            >
              All
            </button>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={`blog-year-tab${activeYear === year ? " active" : ""}`}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filteredPosts.length === 0 ? (
        <section className="py-5">
          <div className="container text-center text-muted">
            No posts yet for {activeYear}. Check back soon.
          </div>
        </section>
      ) : (
        <>
          {/* FEATURED POST */}
          <section className="pb-4 pt-4">
            <div className="container">
              <article className="lul-card overflow-hidden">
                <div className="row g-0 align-items-stretch">
                  <div className="col-lg-6 position-relative">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", objectPosition: featured.imagePosition || "center", minHeight: 280 }}
                    />
                    <div className="blog-tag-floating">
                      <PostTag {...featured} />
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex">
                    <div className="p-4 p-lg-5 d-flex flex-column justify-content-center">
                      <div className="text-muted small fw-semibold mb-2">{featured.date}</div>
                      <h2 className="fw-bold mb-3" style={{ color: "var(--lul-brown)" }}>
                        {featured.title}
                      </h2>
                      <p className="mb-3" style={{ color: "#3a3a3a" }}>
                        {featured.excerpt}
                      </p>
                      <div>
                        <Link to={`/blog/${featured.slug}`} className="blog-readmore-link">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* POST GRID */}
          {rest.length > 0 && (
            <section className="pb-5">
              <div className="container">
                <div className="row g-4">
                  {rest.map((post) => (
                    <div key={post.title} className="col-md-6 col-lg-4 d-flex">
                      <article className="lul-card overflow-hidden d-flex flex-column w-100">
                        <div className="position-relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-100"
                            style={{
                              height: 200,
                              objectFit: "cover",
                              objectPosition: post.imagePosition || "center",
                              display: "block",
                            }}
                          />
                          <div className="blog-tag-floating">
                            <PostTag {...post} />
                          </div>
                        </div>
                        <div className="p-4 d-flex flex-column flex-grow-1">
                          <div className="text-muted small fw-semibold mb-2">{post.date}</div>
                          <h3 className="fw-bold mb-2" style={{ color: "var(--lul-brown)", fontSize: "1.1rem" }}>
                            {post.title}
                          </h3>
                          <p className="mb-3" style={{ color: "#3a3a3a" }}>
                            {post.excerpt}
                          </p>
                          <div className="mt-auto">
                            <Link to={`/blog/${post.slug}`} className="blog-readmore-link">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
