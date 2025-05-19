import { createContext, useState } from "react";
import { TextualCard, Card, GraphicalCard } from "../models/card.model";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const sectionsCards = [
    [
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
        type: "textual",
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
        type: "textual",
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
        type: "textual",
      },

      {
        cardTitle: "נפטרים מצטבר",
        cardBody: {
          mainData: [{ amount: "13,171", text: null }],
          additionalData: null,
        },
        type: "textual",
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
        type: "textual",
      },

      {
        cardTitle: "סיכום 7 ימים אחרונים",
        children: [
          {
            cardTitle: "מספר המאומתים",
            cardBody: {
              mainData: [{ amount: "49", text: null }],
              additionalData: [{ amount: "+32.4%", text: "משבעה ימים קודמים" }],
            },
            type: "textual",
          },
          {
            cardTitle: "מספר נפטרים",
            cardBody: {
              mainData: [{ amount: "0", text: null }],
              additionalData: [{ amount: "0%", text: "משבעה ימים קודמים" }],
            },
            type: "textual",
          },
          {
            cardTitle: "מספר נבדקים",
            cardBody: {
              mainData: [{ amount: "49", text: null }],
              additionalData: [
                { amount: "+1%", text: "משבעה ימים קודמים" },
                { amount: "2.3%", text: "נבדקים חיוביים" },
              ],
            },
            type: "textual",
          },
        ],
      },
    ],
  ];

  const sections = [
    {
      sectionTitle: "מבט על",
      sectionCards: sectionsCards[0],
    },
  ];

  const [dataSections, setDataSections] = useState(sections);

  return (
    <DataContext.Provider value={{ dataSections }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
