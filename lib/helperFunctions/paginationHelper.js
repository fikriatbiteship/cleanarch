const existenceHelper = require("./existenceHelper");

exports.paginateFromRequest = ({ page, limit }) => {
  const nPage = Number(page);
  const nLimit = Number(limit);

  return {
    page: existenceHelper.numberExists(nPage) ? nPage : 1,
    limit: existenceHelper.numberExists(nLimit) ? nLimit : 10,
  };
};

exports.paginateResult = ({ page, limit, count }) => ({
  currentPage: existenceHelper.numberExists(page) ? page : 1,
  totalPage: Math.ceil(count / limit),
  totalData: count,
});

exports.paginateToResponse = (paginateResult) => ({
  current_page: paginateResult.currentPage,
  total_page: paginateResult.totalPage,
  total_data: paginateResult.totalData,
});
