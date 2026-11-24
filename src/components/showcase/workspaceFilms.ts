// chapter times for the keynote-style films in public/work/altcore-workspace/films (written by the film editor)
export const FILMS: Record<string, { duration: number; chapters: { id: string; t: number }[] }> = {
  admin: { duration: 16.07, chapters: [{ id: "admin-tour", t: 1.8 }, { id: "settings-look", t: 10.13 }] },
  ai: { duration: 47.87, chapters: [{ id: "ai-assistant-jobs", t: 1.8 }, { id: "ai-assistant-file", t: 15.5 }, { id: "ai-ask-anything", t: 25.03 }, { id: "ai-workspace-setup", t: 37.7 }] },
  business: { duration: 41.7, chapters: [{ id: "sales-pipeline-deal", t: 1.8 }, { id: "sales-estimate-boq", t: 11.53 }, { id: "ops-requests-inventory", t: 18.87 }, { id: "ops-rnd-vendors", t: 27.9 }, { id: "team-people-hrms", t: 32.97 }] },
  create: { duration: 25.17, chapters: [{ id: "create-board", t: 1.8 }, { id: "create-notebook", t: 10.27 }, { id: "files-documents-drive", t: 18.37 }] },
  day: { duration: 40.2, chapters: [{ id: "day-check-in", t: 2.0 }, { id: "day-plan-standup", t: 11.23 }, { id: "day-announcement", t: 22.2 }, { id: "day-meeting-reminder", t: 33.67 }] },
  projects: { duration: 42.83, chapters: [{ id: "projects-new", t: 1.8 }, { id: "projects-tour", t: 17.43 }, { id: "projects-show-desk", t: 35.87 }] },
  talk: { duration: 48.47, chapters: [{ id: "chat-messages", t: 1.8 }, { id: "chat-voice-note-summary", t: 11.57 }, { id: "chat-video-call-ai-notes", t: 16.2 }, { id: "calendar-views-and-repeat", t: 29.0 }, { id: "search-ctrl-k", t: 43.7 }] },
  tasks: { duration: 44.27, chapters: [{ id: "tasks-today-and-board", t: 1.8 }, { id: "tasks-new-and-ask", t: 13.7 }, { id: "tasks-task-page", t: 30.83 }, { id: "inbox-approve", t: 37.37 }] },
};
