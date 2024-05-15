import { getMe } from "../apis/auth";

export async function rootLoader(): Promise<any> {
  return getMe();
}
