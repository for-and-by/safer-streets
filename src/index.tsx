import { Provider } from "react-redux";
import store from "~/store";

import MapProvider from "~/components/map/provider";
import Map from "~/components/map/map";

function App() {
  return (
    <Provider store={store}>
      <MapProvider>
        <div className="layer z-10">
          <Map className="absolute inset-0"></Map>
        </div>
        <div className="layer clamp z-20"></div>
      </MapProvider>
    </Provider>
  );
}

export default App;
