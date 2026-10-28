const CHAPTER_ID = 854;

const EVENT_API =
  `https://gdg.community.dev/api/event_slim/for_chapter/${CHAPTER_ID}/` +
  '?page_size=1&status=Live&include_cohosted_events=true' +
  '&visible_on_parent_chapter_only=true&order=start_date' +
  '&fields=title,start_date,description_short,cropped_banner_url,url,event_type_title';

export interface CommunityEvent {
  title: string;
  startDate: string;
  descriptionShort: string;
  bannerUrl: string;
  url: string;
  eventType: string;
}

interface EventSlimResponse {
  results?: Array<{
    title: string;
    start_date: string;
    description_short: string;
    cropped_banner_url: string;
    url: string;
    event_type_title: string;
  }>;
}

/**
 * Fetches the next upcoming GDG Pisa event from the (undocumented, public)
 * Bevy/community.dev API. Not an official contract: may change or go away
 * without notice, hence the null-on-any-failure behavior — callers must
 * always have a fallback UI.
 */
export async function fetchUpcomingEvent(): Promise<CommunityEvent | null> {
  try {
    const res = await fetch(EVENT_API);
    if (!res.ok) return null;
    const data = (await res.json()) as EventSlimResponse;
    const first = data.results?.[0];
    if (!first) return null;
    return {
      title: first.title,
      startDate: first.start_date,
      descriptionShort: first.description_short,
      bannerUrl: first.cropped_banner_url,
      url: first.url,
      eventType: first.event_type_title,
    };
  } catch {
    return null;
  }
}
