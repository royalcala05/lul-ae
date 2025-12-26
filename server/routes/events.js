import express from "express";

const router = express.Router();

function getCalendarConfig() {
  const apiKey = String(process.env.GOOGLE_CALENDAR_API_KEY || "").trim();
  const calendarId = String(process.env.GOOGLE_CALENDAR_ID || "").trim();
  return { apiKey, calendarId };
}

function buildEventsUrl({ apiKey, calendarId }) {
  const base = "https://www.googleapis.com/calendar/v3/calendars";
  const timeMin = new Date().toISOString();
  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: "true",
    orderBy: "startTime",
    timeMin,
    maxResults: "3",
  });
  return `${base}/${encodeURIComponent(calendarId)}/events?${params.toString()}`;
}

router.get("/events", async (req, res) => {
  try {
    const { apiKey, calendarId } = getCalendarConfig();
    if (!apiKey || !calendarId) {
      return res.status(400).json({ error: "Missing calendar configuration." });
    }

    const url = buildEventsUrl({ apiKey, calendarId });
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: "Calendar fetch failed.", details: text });
    }

    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    const events = items.slice(0, 3).map((item) => {
      const start = item?.start?.dateTime || item?.start?.date || "";
      return {
        id: item?.id || item?.etag || item?.htmlLink,
        title: item?.summary || "Untitled event",
        start,
      };
    });

    return res.json({ events });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
