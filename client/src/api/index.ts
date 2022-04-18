import { RequestResult } from "./utils";

const makeRequest = async (endpoint: string, requestInit?: RequestInit) => {
  try {
    const response = await fetch(endpoint, requestInit);
    if (response.ok) {
      if (response.headers.get("Content-Type")?.split(";")[0] === "application/json") return await response.json();
      else return new RequestResult("Invalid content type");
    } else return new RequestResult(`Unexpected response status ${response.status}`);
  } catch (e) {
    return new RequestResult((e as Error).message);
  }
};

export default makeRequest;
