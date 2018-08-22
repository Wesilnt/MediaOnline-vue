export function isUrl(path) {
  reg.lastIndex = 0;
  return reg.test(path);
}
export const json2formData = json => {
  if (Object.prototype.toString.call(json) !== "[object Object]") {
    return json;
  }

  const formData = new FormData();
  for (const [key, value] of Object.entries(json)) {
    formData.append(key, value);
  }
  return formData;
};
