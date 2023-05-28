// Function to divide data into pages
export const divideData = (listProduct) => {
  const pageSize = 10;
  let dataSplitPage = {};
  let final = Math.ceil(listProduct.length / pageSize);
  let term = 1;
  let listTerm = [];
  let startIndex = 0;
  while (term <= final) {
    listTerm = listProduct.slice(startIndex, startIndex + pageSize);
    dataSplitPage[term] = listTerm;
    term += 1;
    startIndex += pageSize;
  }
  return dataSplitPage;
};

// Get product data for the current page index
export const getProductData = (data, pageIndex) => {
  return data[pageIndex];
};
