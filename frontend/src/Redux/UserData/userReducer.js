import { SHOW_USER_DATA } from "Redux/constant";

export const UserGistData = (data = [], action) => {
  switch (action.type) {
    case SHOW_USER_DATA:
      return [action];

    default:
      return data
  }
};
