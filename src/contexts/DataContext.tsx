import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [dataSections, setDataSections] = useState([
    {
      sectionTitle: "מבט על",
      sectionCards: [
        {
          cardTitle: "מאומתים אתמול",
          cardBody: {
            dataNumber: "2",
            dataLines: [
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
            dataNumber: "368",
            dataLines: [
              {
                amount: "169",
                text: 'בבי"ח',
              },
            ],
          },
        },

        {
          cardTitle: "נפטרים מצטבר",
          cardBody: {
            dataNumber: "13,171",
            dataLines: [],
          },
        },
      ],
    },
  ]);

  return (
    <DataContext.Provider value={{ dataSections }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
