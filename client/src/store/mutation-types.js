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
export const SEARCH_TITLES_INVENTORY_LOADING = "SEARCH_TITLES_INVENTORY_LOADING";

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
export const SEARCH_ISSUES_SHOW_SELECTED_ITEM = "SEARCH_ISSUES_SHOW_SELECTED_ITEM";

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
export const CURRENT_DRAFT_COVER_PHOTO_SAVING = "CURRENT_DRAFT_COVER_PHOTO_SAVING";
export const CURRENT_DRAFT_COVER_PHOTO_UPDATE = "CURRENT_DRAFT_COVER_PHOTO_UPDATE";
export const CURRENT_DRAFT_COVER_PHOTO_CLEAR = "CURRENT_DRAFT_COVER_PHOTO_CLEAR";

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

/* v2 Inventory Linnworks SEARCHING */
export const SEARCH_LINNWORKS_INVENTORY_LOADING = "SEARCH_LINNWORKS_INVENTORY_LOADING";
export const SEARCH_LINNWORKS_INVENTORY_RESULTS = "SEARCH_LINNWORKS_INVENTORY_RESULTS";

export const SELECTED_LINNWORKS_ITEM_LOADING = "SELECTED_LINNWORKS_ITEM_LOADING";
export const SELECTED_LINNWORKS_ITEM_RESULT = "SELECTED_LINNWORKS_ITEM_RESULT";
export const SELECTED_LINNWORKS_ITEM_CLEAR = "SELECTED_LINNWORKS_ITEM_CLEAR";

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
export const PRICE_SEARCH_RESULTS_EBAY_ACTIVE = "PRICE_SEARCH_RESULTS_EBAY_ACTIVE";
export const PRICE_SEARCH_RESULTS_EBAY_ENDED = "PRICE_SEARCH_RESULTS_EBAY_ENDED";
export const PRICE_SEARCH_RESULTS_MYCOMICSHOP = "PRICE_SEARCH_RESULTS_MYCOMICSHOP";
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
export const SEARCH_PRODUCTS_RESULTS_RESET = "SEARCH_PRODUCTS_RESULTS_RESET";
export const SEARCH_CARDS_LOADING = "SEARCH_CARDS_LOADING";
/* crud */
export const BOX_ACTION_RESULTS = "BOX_ACTION_RESULTS";
export const BOX_ACTION_LOADING = "BOX_ACTION_LOADING";
export const CARD_ACTION_RESULTS = "CARD_ACTION_RESULTS";
export const CARD_ACTION_LOADING = "CARD_ACTION_LOADING";
/* items */
export const SEARCH_PRODUCTS_RESULTS = "SEARCH_PRODUCTS_RESULTS";
export const SEARCH_PRODUCTS_LOADING = "SEARCH_PRODUCTS_LOADING";

/* LOTS */
export const UPDATE_LOT_DRAFT_IMAGES = "UPDATE_LOT_DRAFT_IMAGES";
export const SET_IMAGE_TO_CROP = "SET_IMAGE_TO_CROP";
export const RESET_LOT_DRAFT = "RESET_LOT_DRAFT";
export const CURRENT_LOT_DRAFT_UPDATE = "CURRENT_LOT_DRAFT_UPDATE";
export const CURRENT_LOT_DRAFT_SAVING = "CURRENT_LOT_DRAFT_SAVING";

/* GTCS */
export const UPDATE_GTC_DRAFT_IMAGES = "UPDATE_GTC_DRAFT_IMAGES";
export const GTC_SET_IMAGE_TO_CROP = "GTC_SET_IMAGE_TO_CROP";
export const RESET_GTC_DRAFT = "RESET_GTC_DRAFT";
export const CURRENT_GTC_DRAFT_UPDATE = "CURRENT_GTC_DRAFT_UPDATE";
export const CURRENT_GTC_DRAFT_SAVING = "CURRENT_GTC_DRAFT_SAVING";
export const CURRENT_GTC_DRAFT_LOAD = "CURRENT_GTC_DRAFT_LOAD";

/* audit log */
export const AUDIT_LOG_LOADING = "AUDIT_LOG_LOADING";
export const AUDIT_LOG_RESULTS = "AUDIT_LOG_RESULTS";

/* analytics */
export const ANALYTICS_LOADING = "ANALYTICS_LOADING";
export const ANALYTICS_RESULTS = "ANALYTICS_RESULTS";

/*Title Match */
export const OUR_TITLES_SEARCH_RESULTS_LOADING = "OUR_TITLES_SEARCH_RESULTS_LOADING";
export const OUR_TITLES_SEARCH_RESULTS_SET = "OUR_TITLES_SEARCH_RESULTS_SET";
export const OUR_TITLES_SELECTED_SET = "OUR_TITLES_SELECTED_SET";
export const OUR_TITLES_SELECTED_CLEAR = "OUR_TITLES_SELECTED_CLEAR";
export const OUR_ISSUES_SEARCH_RESULTS_LOADING = "OUR_ISSUES_SEARCH_RESULTS_LOADING";
export const OUR_ISSUES_SEARCH_RESULTS_SET = "OUR_ISSUES_SEARCH_RESULTS_SET";
/* theirs */
export const THEIR_TITLES_SEARCH_RESULTS_LOADING = "THEIR_TITLES_SEARCH_RESULTS_LOADING";
export const THEIR_TITLES_SEARCH_RESULTS_SET = "THEIR_TITLES_SEARCH_RESULTS_SET";
export const THEIR_TITLES_SELECTED_SET = "THEIR_TITLES_SELECTED_SET";
export const THEIR_TITLES_SELECTED_CLEAR = "THEIR_TITLES_SELECTED_CLEAR";
export const THEIR_ISSUES_SEARCH_RESULTS_SET = "THEIR_ISSUES_SEARCH_RESULTS_SET";
export const THEIR_ISSUES_SEARCH_RESULTS_LOADING = "THEIR_ISSUES_SEARCH_RESULTS_LOADING";

export const OUR_ISSUES_SELECTED_SET = "OUR_ISSUES_SELECTED_SET";
export const OUR_ISSUES_SELECTED_CLEAR = "OUR_ISSUES_SELECTED_CLEAR";
export const THEIR_ISSUES_SELECTED_SET = "THEIR_ISSUES_SELECTED_SET";
export const THEIR_ISSUES_SELECTED_CLEAR = "THEIR_ISSUES_SELECTED_CLEAR";
export const FILTER_COMIC_TYPES_SET = "FILTER_COMIC_TYPES_SET";
export const FILTER_VARIANTS_SET = "FILTER_VARIANTS_SET";
export const FILTER_HAS_MATCH_SET = "FILTER_HAS_MATCH_SET";
export const ISSUE_MATCH_SET = "ISSUE_MATCH_SET";

export const SEARCH_PRICELIST_RESULTS_SET = "SEARCH_PRICELIST_RESULTS_SET";
export const GET_PRICELIST_RECORD_SET = "GET_PRICELIST_RECORD_SET";
export const PRICELIST_LOADING = "PRICELIST_LOADING";
export const REMOVE_ISSUE_MATCH_FROM_ISSUE_LIST = "REMOVE_ISSUE_MATCH_FROM_ISSUE_LIST";

/* REPORTS */
export const SEARCH_SOLD_ITEMS_LOADING = "SEARCH_SOLD_ITEMS_LOADING";
export const SEARCH_SOLD_ITEMS_RESULTS = "SEARCH_SOLD_ITEMS_RESULTS";
export const SEARCH_SOLD_ITEMS_CLEAR = "SEARCH_SOLD_ITEMS_CLEAR";
export const SEARCH_CATEGORY_SALES_LOADING = "SEARCH_CATEGORY_SALES_LOADING,";
export const SEARCH_CATEGORY_SALES_RESULTS = "SEARCH_CATEGORY_SALES_RESULTS";
export const SEARCH_CATEGORY_SALES_CLEAR = "SEARCH_CATEGORY_SALES_CLEAR";

/* OUT OF SYNC PRICES */
export const OUT_OF_SYNC_PRICES_LOADING = "OUT_OF_SYNC_PRICES_LOADING";
export const SET_OUT_OF_SYNC_PRICES = "SET_OUT_OF_SYNC_PRICES";

/* REPRICING SERVICE */
export const SEARCH_NEED_REPRICING_ITEMS_LOADING = "SEARCH_NEED_REPRICING_ITEMS_LOADING";
export const SEARCH_NEED_REPRICING_ITEMS_RESULTS = "SEARCH_NEED_REPRICING_ITEMS_RESULTS";
export const SEARCH_NEED_REPRICING_ITEMS_CLEAR = "SEARCH_NEED_REPRICING_ITEMS_CLEAR";

export const SEARCH_BEEN_REPRICED_ITEMS_LOADING = "SEARCH_BEEN_REPRICED_ITEMS_LOADING";
export const SEARCH_BEEN_REPRICED_ITEMS_RESULTS = "SEARCH_BEEN_REPRICED_ITEMS_RESULTS";
export const SEARCH_BEEN_REPRICED_ITEMS_CLEAR = "SEARCH_BEEN_REPRICED_ITEMS_CLEAR";
export const REMOVE_NEED_REPRICING_ITEM_BY_ID = "REMOVE_NEED_REPRICING_ITEM_BY_ID";
export const SEARCH_REPRICING_LOG_LOADING = "SEARCH_REPRICING_LOG_LOADING";
export const SEARCH_REPRICING_LOG_RESULTS = "SEARCH_REPRICING_LOG_RESULTS";

/* PRicing SERVICE */
export const PRICING_SERVICE_SEARCH_LOADING = "PRICING_SERVICE_SEARCH_LOADING";
export const PRICING_SERVICE_SEARCH_RESULTS = "PRICING_SERVICE_SEARCH_RESULTS";

/* DASHBOARD */
export const DASHBOARD_LOADING = "DASHBOARD_LOADING";
export const DASHBOARD_DAILY_RESULTS = "DASHBOARD_DAILY_RESULTS";
export const DASHBOARD_DAILY_RESULTS_CLEAR = "DASHBOARD_DAILY_RESULTS_CLEAR";

/* Repacking Service */
export const REPACKING_SERVICE_SEARCH_LOADING = "REPACKING_SERVICE_SEARCH_LOADING";
export const REPACKING_SERVICE_SEARCH_RESULTS = "REPACKING_SERVICE_SEARCH_RESULTS";
export const REPACKING_SERVICE_PENDING_RESULTS = "REPACKING_SERVICE_PENDING_RESULTS";
export const REPACKING_SERVICE_PENDING_LOADING = "REPACKING_SERVICE_PENDING_LOADING";
export const REPACKING_SERVICE_COMPLETED_RESULTS = "REPACKING_SERVICE_COMPLETED_RESULTS";
export const REPACKING_SERVICE_COMPLETED_LOADING = "REPACKING_SERVICE_COMPLETED_LOADING";
