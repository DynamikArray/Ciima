/* MAIN API HANDLERS */
export const ADD_API_CALL = "ADD_API_CALL";
export const REMOVE_API_CALL = "REMOVE_API_CALL";
export const UPDATE_LOADING_SCREEN_FLAG = "UPDATE_LOADING_SCREEN_FLAG";
export const UPDATE_API_STATUS = "UPDATE_API_STATUS";

/* Search Titles */
export const SEARCH_TITLES_SELECTED_SET = "SEARCH_TITLES_SELECTED_SET";
export const SEARCH_TITLES_SELECTED_CLEAR = "SEARCH_TITLES_SELECTED_CLEAR";
export const SEARCH_TITLES_INVENTORY_SET = "SEARCH_TITLES_INVENTORY_SET";
export const SEARCH_TITLES_INVENTORY_CLEAR = "SEARCH_TITLES_INVENTORY_CLEAR";
export const SEARCH_TITLES_INVENTORY_LOADING =
  "SEARCH_TITLES_INVENTORY_LOADING";

export const SEARCH_UPC_RESULTS_SET = "SEARCH_UPC_RESULTS_SET";
export const SEARCH_UPC_RESULTS_LOADING = "SEARCH_UPC_RESULTS_LOADING";

export const SEARCH_TITLES_RESULTS_SET = "SEARCH_TITLES_RESULTS_SET";
export const SEARCH_TITLES_RESULTS_CLEAR = "SEARCH_TITLES_RESULTS_CLEAR";
export const SEARCH_TITLES_RESULTS_LOADING = "SEARCH_TITLES_RESULTS_LOADING";

/* Search Issues */
export const SEARCH_ISSUES_RESULTS_SET = "SEARCH_ISSUES_RESULTS_SET";
export const SEARCH_ISSUES_RESULTS_CLEAR = "SEARCH_ISSUES_RESULTS_CLEAR";
export const SEARCH_ISSUES_RESULTS_LOADING = "SEARCH_ISSUES_RESULTS_LOADING";
export const SEARCH_ISSUES_SELECTED_ITEM = "SEARCH_ISSUES_SELECTED_ITEM";
export const SEARCH_ISSUES_SHOW_SELECTED_ITEM =
  "SEARCH_ISSUES_SHOW_SELECTED_ITEM";

/* Search Ebay Categories */
export const SEARCH_EBAY_CATEGORIES_LOADING = "SEARCH_EBAY_CATEGORIES_LOADING";
export const SEARCH_EBAY_CATEGORIES_RESULTS = "SEARCH_EBAY_CATEGORIES_RESULTS";
export const SEARCH_EBAY_CATEGORIES_CLEAR = "SEARCH_EBAY_CATEGORIES_CLEAR";

/* Current Draft */
export const CURRENT_DRAFT_CLEAR = "CURRENT_DRAFT_CLEAR";
/* Current Draft Details */
export const CURRENT_DRAFT_UPDATE = "CURRENT_DRAFT_UPDATE";
export const CURRENT_DRAFT_SAVING = "CURRENT_DRAFT_SAVING";

/* Current Draft Title */
export const CURRENT_DRAFT_TITLE_ADD = "CURRENT_DRAFT_TITLE_ADD";
export const CURRENT_DRAFT_TITLES_REORDER = "CURRENT_DRAFT_TITLES_REORDER";
export const CURRENT_DRAFT_TITLE_REMOVE = "CURRENT_DRAFT_TITLE_REMOVE";
/* Current Draft Issues */
export const CURRENT_DRAFT_ISSUE_ADD = "CURRENT_DRAFT_ISSUE_ADD";
export const CURRENT_DRAFT_ISSUE_REMOVE = "CURRENT_DRAFT_ISSUE_REMOVE";
export const CURRENT_DRAFT_ISSUES_REORDER = "CURRENT_DRAFT_ISSUES_REORDER";
/* Current Draft Cover Photo */
export const CURRENT_DRAFT_COVER_PHOTO_SAVING =
  "CURRENT_DRAFT_COVER_PHOTO_SAVING";
export const CURRENT_DRAFT_COVER_PHOTO_UPDATE =
  "CURRENT_DRAFT_COVER_PHOTO_UPDATE";
export const CURRENT_DRAFT_COVER_PHOTO_CLEAR =
  "CURRENT_DRAFT_COVER_PHOTO_CLEAR";

/* Open Drafts */
export const OPEN_DRAFTS_RESULTS = "OPEN_DRAFTS_RESULTS";
export const OPEN_DRAFTS_LOADING = "OPEN_DRAFTS_LOADING";
export const OPEN_DRAFTS_LISTED = "OPEN_DRAFTS_LISTED";

/* Edit Existing Open Draft */
export const EDIT_DRAFT_LOAD = "EDIT_DRAFT_LOAD";
export const EDIT_DRAFT_LOADING = "EDIT_DRAFT_LOADING";
export const EDIT_DRAFT_UPDATED = "EDIT_DRAFT_UPDATED";
export const EDIT_DRAFT_CLEAR = "EDIT_DRAFT_CLEAR";

/* Delete exsting Draft */
export const DELETE_DRAFT_LOADING = "DELETE_DRAFT_LOADING";
export const DELETE_DRAFT_STATUS = "DELETE_DRAFT_STATUS";

/* Settings */
export const INIT_SETTINGS = "INIT_SETTINGS";
export const TOGGLE_UTILITY_DRAWER = "TOGGLE_UTILITY_DRAWER";
export const SET_DEFAULT_PRODUCT_TYPE = "SET_DEFAULT_PRODUCT_TYPE";
export const UTILITY_DRAWER_WIDTH = "UTILITY_DRAWER_WIDTH";
export const UTILITY_DRAWER_TAB = "UTILITY_DRAWER_TAB";

/* Inventory */
export const SEARCH_INVENTORY_RESULTS = "SEARCH_INVENTORY_RESULTS";
export const SEARCH_INVENTORY_LOADING = "SEARCH_INVENTORY_LOADING";
export const UPDATE_INVENTORY_LOADING = "UPDATE_INVENTORY_LOADING";
export const UPDATE_INVENTORY_RESPONSE = "UPDATE_INVENTORY_RESPONSE";

/* Ebay */
export const SEARCH_EBAY_RESULTS = "SEARCH_EBAY_RESULTS";
export const SEARCH_EBAY_LOADING = "SEARCH_EBAY_LOADING";
export const SEARCH_EBAY_ACTIVE_RESULTS = "SEARCH_EBAY_ACTIVE_RESULTS";
export const SEARCH_EBAY_ACTIVE_LOADING = "SEARCH_EBAY_ACTIVE_LOADING";
export const SEARCH_EBAY_ENDED_RESULTS = "SEARCH_EBAY_ENDED_RESULTS";
export const SEARCH_EBAY_ENDED_LOADING = "SEARCH_EBAY_ENDED_LOADING";

/* PRICING */
export const PRICE_SEARCH_LOADING = "PRICE_SEARCH_LOADING";
export const PRICE_SEARCH_STRING = "PRICE_SEARCH_STRING";
export const PRICE_SEARCH_RESULTS_EBAY_ACTIVE =
  "PRICE_SEARCH_RESULTS_EBAY_ACTIVE";
export const PRICE_SEARCH_RESULTS_EBAY_ENDED =
  "PRICE_SEARCH_RESULTS_EBAY_ENDED";
export const PRICE_SEARCH_RESULTS_MYCOMICSHOP =
  "PRICE_SEARCH_RESULTS_MYCOMICSHOP";
export const PRICE_SEARCH_CLEAR = "PRICE_SEARCH_CLEAR";

/* Locations Boxes & Cards */
export const SELECTED_BOX_RESULT = "SELECTED_BOX";
export const SELECTED_BOX_RESET = "SELECTED_BOX_RESET";
export const SELECTED_CARD_RESULT = "SELECTED_CARD";
export const SELECTED_CARD_RESET = "SELECTED_CARD_RESET";
/* search */
export const SEARCH_BOXES_RESULTS = "SEARCH_BOXES_RESULTS";
export const SEARCH_BOXES_LOADING = "SEARCH_BOXES_LOADING";
export const SEARCH_CARDS_RESULTS = "SEARCH_CARDS_RESULTS";
export const SEARCH_CARDS_LOADING = "SEARCH_CARDS_LOADING";
/* crud */
export const BOX_ACTION_RESULTS = "BOX_ACTION_RESULTS";
export const BOX_ACTION_LOADING = "BOX_ACTION_LOADING";
export const CARD_ACTION_RESULTS = "CARD_ACTION_RESULTS";
export const CARD_ACTION_LOADING = "CARD_ACTION_LOADING";
/* items */
export const SEARCH_PRODUCTS_RESULTS = "SEARCH_PRODUCTS_RESULTS";
export const SEARCH_PRODUCTS_LOADING = "SEARCH_PRODUCTS_LOADING";

export const UPDATE_LOT_DRAFT_IMAGES = "UPDATE_LOT_DRAFT_IMAGES";
export const SET_IMAGE_TO_CROP = "SET_IMAGE_TO_CROP";
export const RESET_LOT_DRAFT = "RESET_LOT_DRAFT";
export const CURRENT_LOT_DRAFT_UPDATE = "CURRENT_LOT_DRAFT_UPDATE";
export const CURRENT_LOT_DRAFT_SAVING = "CURRENT_LOT_DRAFT_SAVING";

/* audit log */
export const AUDIT_LOG_LOADING = "AUDIT_LOG_LOADING";
export const AUDIT_LOG_RESULTS = "AUDIT_LOG_RESULTS";

/* analytics */
export const ANALYTICS_LOADING = "ANALYTICS_LOADING";
export const ANALYTICS_RESULTS = "ANALYTICS_RESULTS";
