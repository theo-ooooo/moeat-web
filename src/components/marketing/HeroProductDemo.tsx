export function HeroProductDemo() {
  return (
    <div className="productDemo">
      <div className="demoWindow">
        <div className="demoChrome">
          <span />
          <span />
          <span />
          <b>MOEAT PICK</b>
        </div>
        <div className="demoBody">
          <small>STEP 2 OF 3</small>
          <h2>오늘은 어떤 느낌인가요?</h2>
          <div className="demoChips">
            <span className="on">든든하게</span>
            <span>가볍게</span>
            <span className="on">깔끔하게</span>
            <span>자극적으로</span>
          </div>
          <div className="demoResult">
            <div className="demoRank">1</div>
            <div>
              <small>PICK 01</small>
              <strong>비빔밥</strong>
              <p>든든하고 깔끔한 한 끼에 잘 맞아요</p>
            </div>
            <i>→</i>
          </div>
        </div>
      </div>
      <div className="demoPlace">
        <span>주변 맛집</span>
        <strong>성수역 주변 비빔밥 맛집 5곳</strong>
        <small>메뉴를 정하면 갈 곳까지 이어드려요</small>
      </div>
    </div>
  );
}
