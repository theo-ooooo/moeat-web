import Link from "next/link";
import { Menu, SoloRestaurantSearch } from "@/lib/api";
import { mapLinks } from "@/lib/maps";

type SoloRestaurantResultProps = {
  search: SoloRestaurantSearch;
  menus: Menu[];
  place: string;
  onRetry: () => void;
};

export function SoloRestaurantResult({ search, menus, place, onRetry }: SoloRestaurantResultProps) {
  return (
    <section>
      <p className="progress">MOEAT PLACES</p>
      <h1>{search.title}</h1>
      <p className="muted">{search.description}</p>
      {search.restaurants.length > 0 ? (
        <div className="restaurantList soloRestaurants">
          {search.restaurants.map((restaurant) => (
            <article className="restaurantCard" key={restaurant.id}>
              <strong className="restaurantRank">{restaurant.rank}</strong>
              <div>
                <small>
                  {restaurant.matchedMenu} · {restaurant.category.split(" > ").at(-1)}
                </small>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.roadAddress || restaurant.address}</p>
                <b>{restaurant.recommendationReason}</b>
                {restaurant.phone && <span>{restaurant.phone}</span>}
              </div>
              <a href={restaurant.kakaoMapUrl} target="_blank" rel="noreferrer">
                상세보기
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="restaurantFallback">
          <h2>지도에서 바로 확인해보세요</h2>
          <p>추천 조건과 지역을 조합한 음식점 검색 링크예요.</p>
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={mapLinks(menu.name, place).kakao}
              target="_blank"
              rel="noreferrer"
            >
              {place} · {menu.name} 음식점 보기 →
            </a>
          ))}
        </div>
      )}
      <button className="secondary wide" onClick={onRetry}>
        다른 조건으로 음식점 다시 찾기
      </button>
      <Link className="textLink" href="/">
        처음으로
      </Link>
    </section>
  );
}
