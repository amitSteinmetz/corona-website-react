import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from "react";
import webIcon from "../../assets/images/web-icon.png";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {
  const [showSectionLinks, setShowSectionLinks] = useState(false);

  function renderCards(arr) {
    return arr.map((card, index: number) => (
      <CardRenderer
        sectionId={sectionData.id}
        card={card}
        key={index}
        hasContainerParent={card.type === "container"}
      ></CardRenderer>
    ));
  }
  // useEffect(() => {
  //   if (
  //     document.body.style.overflow === "hidden" ||
  //     parseInt(document.body.style.width) < 500
  //   ) {
  //     document.body.style.overflow = showSectionLinks ? "hidden" : "auto";
  //   }
  // }, [showSectionLinks]);

  return (
    <div
      className={`section-container ${sectionData.id === 1 && "first-section"}`}
    >
      <div className="section-container__header">
        <h1 className="section-header__title font-xl">{sectionData.title}</h1>

        {sectionData.relatedLinks.length > 0 && (
          <div
            className="section-header__subtitle"
            onClick={() => {
              setShowSectionLinks(!showSectionLinks);
            }}
            onMouseLeave={() => {
              setShowSectionLinks(false);
            }}
          >
            <span className="section-header__seperator">|</span>
            לינקים בנושא
            <GoTriangleDown className="section-header__arrowBtn" />
            {showSectionLinks && (
              <div className="subtitle__links-container">
                <div className="subtitle__links">
                  <div className="subtitle__links_line-symbol"></div>

                  <div className="subtitle__links_title bold font-base">
                    לינקים בנושא
                  </div>

                  {sectionData.relatedLinks.map((link) => (
                    <div
                      className={`links__item ${link.id === 1 && "first-link"}`}
                    >
                      <img className="web-icon" src={webIcon} alt="" />

                      <div className="links__item_content">
                        <div className="links__item_title bold font-sm">
                          {link.title}
                        </div>
                        <div className="links__item_subtitle font-xs">
                          {link.subTitle}
                        </div>
                        <a href={link.url} className="links__item_url font-xs">
                          {link.name}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="section-textual-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "textual")
        )}
      </div>

      <div className="section-graphical-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "graphical")
        )}
      </div>

      <div className="section-container-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "container")
        )}
      </div>
    </div>
  );
};

export default Section;
