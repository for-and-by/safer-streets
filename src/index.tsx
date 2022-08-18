import { Provider } from "react-redux";
import store from "~/store";

import Index from "~/components/layout";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
