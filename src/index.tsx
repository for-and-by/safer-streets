import Map from "~/features/map/context";

function App() {
  return (
    <div className="absolute inset-0">
      <Map className="layer z-10" />
      <div className="layer clamp z-20"></div>
    </div>
  );
}

export default App;
