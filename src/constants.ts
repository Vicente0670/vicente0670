/**
 * All genres available for sorting.
 * Meant to be used for `filterParameters()` in the Forum API.
 * 
 * @author Vicente0670
 * @since 0.1.2
 * 
 */
export enum forumGenres {
  ALL = "Recent",
  ANNOUNCEMENT = "Announcement",
  GAMING = "Gaming",
  GENERAL = "General",
  MEMES = "Memes",
  MUSIC = "Music",
  OFFTOPIC = "Off-Topic",
  SUGGESTIONS = "Suggestions",
  VIDEO = "Video"
};

export enum themes {
  LIGHT = "light",
  DARK = "dark",
  // ...
}

export const forumPullAmount: number = 2;