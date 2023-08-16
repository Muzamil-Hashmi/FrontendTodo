// export const sortTodos = (todos, sortBy) => {
//     return todos.slice().sort((a, b) => {
//         if (sortBy === "asc") {
//             return a.title.localeCompare(b.title); // Sort in ascending order
//         } else {
//             return b.title.localeCompare(a.title); // Sort in descending order
//         }
//     });
// };

export const sortTodos = (todos, sortBy) => {
  return todos.slice().sort((a, b) => {
    if (sortBy === "asc") {
      return a.title.localeCompare(b.title); // Sort in ascending order
    } else {
      return b.title.localeCompare(a.title); // Sort in descending order
    }
  });
};