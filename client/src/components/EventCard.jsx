export default function EventCard({
  title,
  date,
  description,
  image,
  tag,
  tagColor = "var(--lul-red)",
  tagTextColor = "#fff",
}) {
  return (
    <article className="event-card">
      {image ? (
        <img className="event-card-image" src={image} alt={title} />
      ) : (
        <div className="event-card-placeholder" aria-hidden="true" />
      )}
      <div className="event-card-body">
        <div className="d-flex align-items-center gap-2">
          {tag && (
            <span className="event-card-tag" style={{ background: tagColor, color: tagTextColor }}>
              {tag}
            </span>
          )}
          <span className="event-card-meta">{date}</span>
        </div>
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-desc">{description}</p>
      </div>
    </article>
  );
}
