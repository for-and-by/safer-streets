import { Provider } from "react-redux";
import store from "~/features/store";

import Layout from "~/features/app/layout";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
