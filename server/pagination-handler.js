const handlePagination = (start, end, data) => {
  const results = {};
  if (start === 0) {
    results.previous = {
      page: null,
      limit: limit,
    };
    results.next = {
      page: limit,
      limit: limit,
    };
  }
  if (start === limit) {
    results.previous = {
      page: limit,
      limit: limit,
    };
    results.next = {
      page: null,
      limit: limit,
    };
  }
  results.previous = {
    page: page - 1,
    limit: limit,
  };
  results.next = {
    page: page + 1,
    limit: limit,
  };
  const paginatedResponse = data.slice(start, end);
  results.results = paginatedResponse;
  return results;
};

module.exports = handlePagination;
