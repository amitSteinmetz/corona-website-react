import { createContext, useState } from "react";
import { Card } from "../models/card.model";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const cards: Card[] = [
    {
      cardTitle: "מאומתים אתמול",
      cardBody: {
        mainData: [{ amount: "2", text: null }],
        additionalData: [
          {
            amount: "0",
            text: "מחצות",
          },
          {
            amount: "4,860,604",
            text: 'סה"כ',
          },
        ],
      },
    },

    {
      cardTitle: "חולים פעילים",
      cardBody: {
        mainData: [{ amount: "368", text: null }],
        additionalData: [
          {
            amount: "169",
            text: 'בבי"ח',
          },
        ],
      },
    },

    {
      cardTitle: "מתחסנים",
      cardBody: {
        mainData: [
          { amount: "6,725,492", text: "מנה 1" },
          { amount: "6,148,759", text: "מנה 2" },
          { amount: "4,475,775", text: "מנה 3" },
          { amount: "838,902", text: "מנה 4" },
          { amount: "407,546", text: "אומיקרון" },
        ],
        additionalData: null,
      },
    },

    {
      cardTitle: "נפטרים מצטבר",
      cardBody: {
        mainData: [{ amount: "13,171", text: null }],
        additionalData: null,
      },
    },

    {
      cardTitle: "אחוז נבדקים חיוביים אתמול",
      cardBody: {
        mainData: [{ amount: "1.96%", text: null }],
        additionalData: [
          { amount: "102", text: "נבדקים לגילוי הנגיף אתמול" },
          { amount: "109", text: "כלל הבדיקות אתמול" },
        ],
      },
    },
  ];

  const [dataSections, setDataSections] = useState([
    {
      sectionTitle: "מבט על",
      sectionCards: cards,
    },
  ]);

  return (
    <DataContext.Provider value={{ dataSections }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
