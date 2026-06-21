import type { CMSState, CMSAction } from "@/types";

/**
 * Pure reducer for CMS state. Handles all CRUD operations immutably.
 */
export function cmsReducer(state: CMSState, action: CMSAction): CMSState {
  switch (action.type) {
    /* ---------- Core ---------- */
    case "SET_STATE":
      return action.payload;

    case "RESET_STATE":
      // Caller should provide fresh initialState via SET_STATE instead
      return state;

    /* ---------- Site Settings ---------- */
    case "UPDATE_SITE_SETTINGS":
      return {
        ...state,
        siteSettings: { ...state.siteSettings, ...action.payload },
      };

    /* ---------- Menu ---------- */
    case "ADD_MENU_ITEM":
      return {
        ...state,
        menu: [...state.menu, action.payload],
      };

    case "UPDATE_MENU_ITEM":
      return {
        ...state,
        menu: state.menu.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case "DELETE_MENU_ITEM":
      return {
        ...state,
        menu: state.menu.filter((item) => item.id !== action.payload),
      };

    case "REORDER_MENU":
      return {
        ...state,
        menu: action.payload,
      };

    /* ---------- Properties ---------- */
    case "ADD_PROPERTY":
      return {
        ...state,
        properties: [action.payload, ...state.properties],
      };

    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "DELETE_PROPERTY":
      return {
        ...state,
        properties: state.properties.filter((p) => p.id !== action.payload),
      };

    /* ---------- Team ---------- */
    case "ADD_TEAM_MEMBER":
      return {
        ...state,
        team: [...state.team, action.payload],
      };

    case "UPDATE_TEAM_MEMBER":
      return {
        ...state,
        team: state.team.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };

    case "DELETE_TEAM_MEMBER":
      return {
        ...state,
        team: state.team.filter((t) => t.id !== action.payload),
      };

    /* ---------- Blog ---------- */
    case "ADD_BLOG_POST":
      return {
        ...state,
        blog: [action.payload, ...state.blog],
      };

    case "UPDATE_BLOG_POST":
      return {
        ...state,
        blog: state.blog.map((b) =>
          b.id === action.payload.id ? action.payload : b,
        ),
      };

    case "DELETE_BLOG_POST":
      return {
        ...state,
        blog: state.blog.filter((b) => b.id !== action.payload),
      };

    /* ---------- Leads ---------- */
    case "ADD_LEAD":
      return {
        ...state,
        leads: [action.payload, ...state.leads],
      };

    case "UPDATE_LEAD":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.id ? { ...l, ...action.payload } : l,
        ),
      };

    case "DELETE_LEAD":
      return {
        ...state,
        leads: state.leads.filter((l) => l.id !== action.payload),
      };

    /* ---------- Media ---------- */
    case "ADD_MEDIA":
      return {
        ...state,
        media: [action.payload, ...state.media],
      };

    case "DELETE_MEDIA":
      return {
        ...state,
        media: state.media.filter((m) => m.id !== action.payload),
      };

    /* ---------- Theme ---------- */
    case "UPDATE_THEME":
      return {
        ...state,
        theme: { ...state.theme, ...action.payload },
      };

    /* ---------- SEO ---------- */
    case "UPDATE_SEO":
      return {
        ...state,
        seo: {
          ...state.seo,
          [action.payload.page]: action.payload.data,
        },
      };

    /* ---------- Pages ---------- */
    case "UPDATE_PAGE":
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    default:
      return state;
  }
}
