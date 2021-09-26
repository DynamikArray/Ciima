const getTargetValueForUser = async (mysql, userId, startDate, endDate) => {
  const weeklyValueQuery = `SELECT ut.targetValue as inputTarget
                            FROM	slc_user_targets  ut
                            WHERE (ut.userId = ? AND ut.startDate = ? AND ut.endDate = ?)`;

  const params = [userId, startDate, endDate];
  const [result] = await mysql.query(weeklyValueQuery, params);
  if (result && result.length > 0) {
    return result[0].inputTarget;
  }

  const defaultValueQuery = `SELECT u.inputTarget from slc_users u where u.id = ${userId}`;
  const [defaultResult] = await mysql.query(defaultValueQuery);
  if (defaultResult && defaultResult.length > 0) {
    return defaultResult[0].inputTarget;
  }

  return 0;
};

module.exports = { getTargetValueForUser };
