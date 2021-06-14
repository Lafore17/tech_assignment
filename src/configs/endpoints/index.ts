export const endpoints = {
  // intermediaries
  getIntermediaries: process.env.REACT_APP_API_URL + "/api/intermediaries",
  getIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/api/intermediaries/${id}`,
  removeIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/api/intermediaries/${id}`,
  createIntermediary: process.env.REACT_APP_API_URL + "/api/intermediaries",
  updateIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/api/intermediaries/${id}`,
  // products
  getProducts: process.env.REACT_APP_API_URL + "/api/products",
  removeProduct: (id: number) =>
    process.env.REACT_APP_API_URL + `/api/products/${id}`,
};
