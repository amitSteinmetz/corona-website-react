import { createContext, useState, useEffect } from "react";
import { SectionModel } from "../models/section.model";
import { Card } from "../models/card.model";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [sections, setSections] = useState<SectionModel[]>();

  // First website initialization
  useEffect(() => {
    fetch("https://localhost:7287/api/Sections")
      .then((res) => res.json())
      .then((data: SectionModel[]) => {
        setSections(data);
        console.log(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // On new time-range of graph was chosen
  function onChangeGraphDataTimeRange(
    sectionId: number,
    cardId: number,
    timeRange: string
  ) {
    fetch(`https://localhost:7287/api/Cards/${sectionId}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeRange),
    })
      .then((res) => res.json())
      .then((updatedCard: Card) => {
        const updatedSections: SectionModel[] = sections.map((section) => {
          if (section.id === sectionId) {
            const updatedCards = section.cards.map((card) =>
              card.id === cardId ? updatedCard : card
            );
            return { ...section, cards: updatedCards };
          }
          return section;
        });
        setSections(updatedSections);
      })
      .catch((err) => console.error("Amit Error:", err));
  }

  return (
    <DataContext.Provider value={{ sections, onChangeGraphDataTimeRange }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
