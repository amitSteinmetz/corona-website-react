import ThemeProvider from "./ThemeContext";
import DataProvider from "./DataContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
