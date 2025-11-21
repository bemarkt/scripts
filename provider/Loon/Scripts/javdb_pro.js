const url = $request.url;
const headers = $request.headers;

if (url.indexOf("/api/v1/movies/") !== -1 && url.indexOf("/play?") !== -1) {
  const authKey = Object.keys(headers).find(
    (key) => key.toLowerCase() === "authorization"
  );
  const keyToUse = authKey || "Authorization";
  headers[keyToUse] =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzU4NDg3NywidXNlcm5hbWUiOiJjaHhtMTAyNCJ9.RI3cy6hTiFd7NgzDxN8UJwWlCQEJtGGxqRryWW8jr-w";
  $done({ headers });
} else {
  $done({});
}
