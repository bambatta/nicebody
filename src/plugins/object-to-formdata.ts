import objectToFormdata from "object-to-formdata";

export default (context, inject) => {
  inject("objectToFormdata", objectToFormdata);
};
