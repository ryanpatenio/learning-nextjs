export default function convertToJSON<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}