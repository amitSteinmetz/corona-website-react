import { moreInfoBtn } from "../../assets/svgs";

const Section = ({ sectionData }) => {
  return (
    <div className="section-container">
      <h1>{sectionData.sectionTitle}</h1>

      <div className="card">
        {sectionData.sectionCards.map((card, index: number) => (
          <div className="card" key={index}>
            <img
              src={moreInfoBtn}
              alt="more info"
              className="card__more-info-btn"
            />
            <h5 className="card__title">{card.cardTitle}</h5>
            <div className="card__body">
              <div className="data-number">{card.cardBody.dataNumber}</div>

              {card.cardBody.dataLines.map((line, index: number) => (
                <div className="data-line" key={index}>
                  <div className="data-line__amount">{line.amount}</div>
                  <div className="data-line__text">{line.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* <img src={moreInfoBtn} alt="more info" className="card__more-info-btn" />
        <h5 className="card__title">{sectionData.sectionCards[0].cardTitle}</h5>
        <div className="card__body">
          <div className="data-number">2</div>

          <div className="data-line">
            <div className="data-line__number">0</div>
            <div className="data-line__text">מחצות</div>
          </div>

          <div className="data-line">
            <div className="data-line__number">4,860,604</div>
            <div className="data-line__text">סה"כ</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Section;
