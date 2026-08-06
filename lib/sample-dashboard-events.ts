export type DashboardEvent = {
  id: string;
  month: string;
  day: string;
  dateLabel: string;
  time: string;
  title: string;
  category: string;
  facilitator: string;
  location: string;
};

// Example-only data for the dashboard presentation. Replace this module with
// attendee bookings from the database when event registration is implemented.
export const upcomingEvents: readonly DashboardEvent[] = [
  {
    id: "forest-breathwork",
    month: "SEP",
    day: "12",
    dateLabel: "Saturday, September 12, 2026",
    time: "9:30 AM–12:00 PM",
    title: "Forest Breathwork & Sound Journey",
    category: "Breathwork",
    facilitator: "Maya Chen",
    location: "Redwood Grove, Oakland",
  },
  {
    id: "autumn-reset",
    month: "OCT",
    day: "04",
    dateLabel: "Sunday, October 4, 2026",
    time: "10:00 AM–4:00 PM",
    title: "Autumn Reset Day Retreat",
    category: "Retreat",
    facilitator: "The Still Room Collective",
    location: "Mill Valley, California",
  },
  {
    id: "restorative-evening",
    month: "NOV",
    day: "19",
    dateLabel: "Thursday, November 19, 2026",
    time: "6:30 PM–8:00 PM",
    title: "Restorative Yoga by Candlelight",
    category: "Yoga",
    facilitator: "Ari Bell",
    location: "Online gathering",
  },
];

export const pastEvents: readonly DashboardEvent[] = [
  {
    id: "spring-meditation",
    month: "JUN",
    day: "21",
    dateLabel: "Sunday, June 21, 2026",
    time: "8:00 AM–10:30 AM",
    title: "Summer Solstice Meditation",
    category: "Meditation",
    facilitator: "Nia Santos",
    location: "Golden Gate Park, San Francisco",
  },
  {
    id: "sound-bath",
    month: "APR",
    day: "18",
    dateLabel: "Saturday, April 18, 2026",
    time: "7:00 PM–8:30 PM",
    title: "Deep Rest Sound Bath",
    category: "Sound Healing",
    facilitator: "Owen Hart",
    location: "Lotus House, Berkeley",
  },
];
