const handlePagination = (start, end, data, page, limit) => {
  let results = {};
  const maxPage = Math.ceil(data.length / limit);

  if (page === 0) {
    results.previous = null;
    results.next = page + 1;
  } else if (page === maxPage) {
    results.previous = page - 1;
    results.next = null;
  } else {
    results.previous = page - 1;
    results.next = page + 1;
  }

  const paginatedResponse = data.slice(start, end);
  results.results = paginatedResponse;
  return results;
};

module.exports = handlePagination;
