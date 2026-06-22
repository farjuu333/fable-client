// import { getTokenServer } from "../getTokenServer";

// const baseURl = process.env.SERVER_URL;

// export const getProduct = async (page) => {
//   if (!page) {
//     page = 1;
//   }
//   const token = await getTokenServer();
//   const res = await fetch(`${baseURl}/writer/products?page=${page}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

// export const getAllEbooks = async (search) => {
//   const res = await fetch(`${baseURl}/ebook?search=${search}`);
//   const data = await res.json();

//   return data;
// };

// export const getProductById = async (id) => {
//   const res = await fetch(`${baseURl}/ebooks/${id}`);
//   const data = await res.json();
//   return data;
// };

const baseURl = process.env.SERVER_URL;
export const getManageEbooks = async (bookId,status = 'Published') => {
   const res = await fetch(`${baseURl}/api/manage?bookId=${bookId}&status=${status}`);
   return res.json();
  }