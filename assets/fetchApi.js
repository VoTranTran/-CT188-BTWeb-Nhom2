export const fetchApi = (url) => {
  const result = fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
    return result;
}