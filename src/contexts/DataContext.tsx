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

        type: "textual",
      },

      {
        title: "חולים פעילים",

        mainData: [{ amount: "368", text: null }],
        additionalData: [
          {
            amount: "169",
            text: 'בבי"ח',
          },
        ],

        type: "textual",
      },

      {
        title: "מתחסנים",

        mainData: [
          { amount: "6,725,492", text: "מנה 1" },
          { amount: "6,148,759", text: "מנה 2" },
          { amount: "4,475,775", text: "מנה 3" },
          { amount: "838,902", text: "מנה 4" },
          { amount: "407,546", text: "אומיקרון" },
        ],
        additionalData: null,

        type: "textual",
      },

      {
        title: "נפטרים מצטבר",

        mainData: [{ amount: "13,171", text: null }],
        additionalData: null,

        type: "textual",
      },

      {
        title: "אחוז נבדקים חיוביים אתמול",

        mainData: [{ amount: "1.96%", text: null }],
        additionalData: [
          { amount: "102", text: "נבדקים לגילוי הנגיף אתמול" },
          { amount: "109", text: "כלל הבדיקות אתמול" },
        ],

        type: "textual",
      },

      {
        title: "סיכום 7 ימים אחרונים",
        type: "container",
        children: [
          {
            title: "מספר המאומתים",

            mainData: [{ amount: "49", text: null }],
            additionalData: [{ amount: "+32.4%", text: "משבעה ימים קודמים" }],

            type: "textual",
          },
          {
            title: "מספר נפטרים",

            mainData: [{ amount: "0", text: null }],
            additionalData: [{ amount: "0%", text: "משבעה ימים קודמים" }],

            type: "textual",
          },
          {
            title: "מספר נבדקים",

            mainData: [{ amount: "49", text: null }],
            additionalData: [
              { amount: "+1%", text: "משבעה ימים קודמים" },
              { amount: "2.3%", text: "נבדקים חיוביים" },
            ],

            type: "textual",
          },
        ],
      },
    ],

    [
      {
        title: "ממוצע מאומתים שבועי",
        option: {
          grid: {
            left: 70,
            right: 20,
            top: 40,
            bottom: 40,
          },
          tooltip: {
            trigger: "item",
          },
          xAxis: {
            type: "category",
            data: ["20.04-26.04", "27.04-03.05", "04.05-10.05", "dummy-point"],
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#e0e0e0", // same color as grid lines
              },
            },
            axisLabel: {
              margin: 30,
              align: "left",
              rotate: 20,
              fontSize: 10,
              color: "black",
              formatter: (value, index) => (index === 3 ? "" : value),
            },
          },
          yAxis: {
            type: "value",
            name: "ממוצע מאומתים",
            min: 0,
            max: 10,
            interval: 2,
            nameLocation: "middle", // vertical middle
            nameRotate: 90, // rotate vertically
            offset: 10,
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Open Sans",
              align: "center",
              padding: [0, 0, 30, 0], // shift it away from the axis if needed
            },
          },
          series: [
            {
              type: "line",
              step: "end",
              data: [5, 5, 7, 7],
              lineStyle: {
                color: "#0068f5",
                width: 2,
              },
              symbol: "circle",
              symbolSize: 1,

              emphasis: {
                focus: "series",
                symbol: "circle",
                scale: 8,
                symbolSize: 16,
              },
              label: {
                show: true,
                position: "top",
                fontSize: 14,
                fontFamily: "Open Sans",
                color: "#333",
                padding: [0, 0, 0, 50],
              },
              markArea: {
                silent: true,
                itemStyle: {
                  color: "rgba(0, 104, 245, 0.03)", // blue with opacity
                },
                data: [
                  [
                    { xAxis: "27.04-03.05" }, // start at this x-axis label
                    { xAxis: "04.05-10.05" }, // end at this x-axis label
                  ],
                ],
              },
            },
          ],
        },
        type: "graphical",
      },
    ],
  ];

  const [sections, setSections] = useState<SectionModel[]>([
    {
      title: "מבט על",
      cards: sectionsCards[0],
    },
    {
      title: "מדדים מרכזיים",
      relatedLinks: ["https://www.google.com", "https://www.google.com"],
      cards: sectionsCards[1],
    },
  ]);

  return (
    <DataContext.Provider value={{ sections }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
