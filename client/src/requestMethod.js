import axios from "axios";

const BASE_URL = `http://localhost:9000/api/`;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGVmYzk5OGZmYjZiNmUxYjEwNDdjYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjAwOTU3MSwiZXhwIjoxNjQyMjY4NzcxfQ.9Wfat4hYhe6SMxOWzC78gX_ZECF4bkAaNJq9fBkmaDw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN} ` },
});
