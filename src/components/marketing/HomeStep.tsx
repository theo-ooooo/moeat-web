type HomeStepProps = {
  number: "01" | "02" | "03";
  title: string;
  description: string;
};

export function HomeStep({ number, title, description }: HomeStepProps) {
  return (
    <article className={`step step${number}`}>
      <small>STEP {number}</small>
      <div className="stepPreview" aria-hidden="true">
        {number === "01" && (
          <>
            <i>혼자</i>
            <i>같이</i>
          </>
        )}
        {number === "02" && (
          <>
            <i className="checked">든든하게</i>
            <i>깔끔하게</i>
            <i className="blocked">매운 음식 제외</i>
          </>
        )}
        {number === "03" && (
          <>
            <span>
              <b>1</b>
              <strong>비빔밥</strong>
              <em>94%</em>
            </span>
            <span>
              <b>2</b>
              <strong>쌀국수</strong>
              <em>89%</em>
            </span>
          </>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
