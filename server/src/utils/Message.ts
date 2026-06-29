//--------------------------------------------------------------
export const bindMessage = (rawMsg: string, variables: any): string => {
  try {
    // this function replaces {{}} placeholders in a string with values from object, pass in 2nd arg value in object key value pair
    // e.g., `"Hello, {{name}}!

    // set var in message {
    return rawMsg.replace(/{{(.*?)}}/g, (match, key) => {
      return key.trim() in variables ? variables[key.trim()] : match;
    });
    // } set var in message
  } catch (e) {
    return "";
  }
};
