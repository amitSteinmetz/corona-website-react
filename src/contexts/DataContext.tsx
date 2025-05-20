import { createContext, useState } from "react";
import { CardModel } from "../models/card.model";
import { SectionModel } from "../models/section.model";
import { DataContextType } from "../models/dataContextType.model";

export const DataContext = createContext<DataContextType>(null);

const DataProvider = ({ children }) => {
  const sectionsCards: CardModel[][] = [
    [
      {
        title: "מאומתים אתמול",
        body: {
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
        title: "חולים פעילים",
        body: {
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
        title: "מתחסנים",
        body: {
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
        title: "נפטרים מצטבר",
        body: {
          mainData: [{ amount: "13,171", text: null }],
          additionalData: null,
        },
        type: "textual",
      },

      {
        title: "אחוז נבדקים חיוביים אתמול",
        body: {
          mainData: [{ amount: "1.96%", text: null }],
          additionalData: [
            { amount: "102", text: "נבדקים לגילוי הנגיף אתמול" },
            { amount: "109", text: "כלל הבדיקות אתמול" },
          ],
        },
        type: "textual",
      },

      {
        title: "סיכום 7 ימים אחרונים",
        type: "container",
        children: [
          {
            title: "מספר המאומתים",
            body: {
              mainData: [{ amount: "49", text: null }],
              additionalData: [{ amount: "+32.4%", text: "משבעה ימים קודמים" }],
            },
            type: "textual",
          },
          {
            title: "מספר נפטרים",
            body: {
              mainData: [{ amount: "0", text: null }],
              additionalData: [{ amount: "0%", text: "משבעה ימים קודמים" }],
            },
            type: "textual",
          },
          {
            title: "מספר נבדקים",
            body: {
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

  const [sections, setSections] = useState<SectionModel[]>([
    {
      title: "מבט על",
      cards: sectionsCards[0],
    },
  ]);

  return (
    <DataContext.Provider value={{ sections }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
