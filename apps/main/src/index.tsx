import { Provider } from "react-redux";
import store from "~/store";

import Index from "~/features/layout";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
