import { SHOW_SINGLE_GIST} from "./constant";

export const singleGistData = (data = [], action) => {
  switch (action.type) {
    case SHOW_SINGLE_GIST:

      return [action];
    default:
      return data;
  }
};
