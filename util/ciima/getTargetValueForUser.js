const getTargetValueForUser = async (mysql, userId) => {
  const [result] = await mysql.query(`SELECT u.inputTarget from slc_users u where u.id = ${userId}`);

  if (result && result.length > 0) {
    return result[0].inputTarget;
  }

  return 0;
};

module.exports = { getTargetValueForUser };
