export function mapLinks(menu: string, place?: string) {
  const q = encodeURIComponent(`${place ?? ""} ${menu} 맛집`.trim());
  return { naver: `https://map.naver.com/p/search/${q}`, kakao: `https://map.kakao.com/?q=${q}` };
}
