const appConstants = {
  repackingService: {
    perComicPriceThreshold: 0.5,
    returnOnlyBelowThreshold: true,
    repackFlags: {
      pending: "repackPending",
      completed: "repackCompleted",
      completedDate: "repackCompletedDate",
    },
  },
  analytics: {
    targetValue: 8000,
  },
};

module.exports = appConstants;
