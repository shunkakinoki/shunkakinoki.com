// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}
