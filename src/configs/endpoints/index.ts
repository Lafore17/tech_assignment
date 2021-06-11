export const endpoints = {
  getIntermediaries: process.env.REACT_APP_API_URL + "/intermediaries",
  getIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/intermediaries/${id}`,
  removeIntermediary: (id: number) =>
    process.env.REACT_APP_API_URL + `/intermediaries/${id}`,
};
