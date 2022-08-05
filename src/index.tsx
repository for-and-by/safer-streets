import MapProvider from "~/components/map/provider";
import Map from "~/components/map/map";

function App() {
  return (
    <MapProvider>
      <div className="layer z-10">
        <Map className="absolute inset-0"></Map>
      </div>
      <div className="layer clamp z-20"></div>
    </MapProvider>
  );
}

export default App;
