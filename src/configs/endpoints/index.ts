export const endpoints = {
  // intermediaries
  getIntermediaries: process.env.REACT_APP_API_URL + "/intermediaries",
  getIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/intermediaries/${id}`,
  removeIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/intermediaries/${id}`,
  createIntermediary: process.env.REACT_APP_API_URL + "/intermediaries",
  updateIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/intermediaries/${id}`,
  // products
  getProducts: process.env.REACT_APP_API_URL + "/products",
  removeProduct: (id: number) =>
    process.env.REACT_APP_API_URL + `/products/${id}`,
};
