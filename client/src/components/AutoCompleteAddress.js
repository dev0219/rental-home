import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const loadMapScript = (callback) => {
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAkuGJruqd9MlTlr48ArHKbPIGoO4inzcs&libraries=places`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

function AutoCompleteAddress({ setAddress: setMainAddress }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const handleChange = (address) => setAddress(address);
  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      var position = await getLatLng(results[0]);
      setAddress(address);
      let { address_components } = results[0];
      let city = address_components.filter((comp) =>
        comp.types.includes("locality")
      )[0];
      let state = address_components.filter((comp) =>
        comp.types.includes("administrative_area_level_1")
      )[0];
      let country = address_components.filter((comp) =>
        comp.types.includes("country")
      )[0];
      setMainAddress({
        address: address.split(",")[0],
        city: city===undefined ? address.split(",")[1] : city["short_name"],
        state: state.short_name,
        country: country.short_name,
        position,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadMapScript(() => setScriptLoaded(true));
  }, []);
  return (
    scriptLoaded && (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="InputDiv_auto">
            <input
              {...getInputProps({
                placeholder: "*Property Address...",
                className: "location-search-input Input_addhome",
              })}
            />
            <div className="AutoCompleteDiv_auto"
              style = {{border: suggestions.length > 0 ? "1px solid #ced4da" : "none"}}
            >
              {loading && <div className="AutoCompleteItem_auto">Loading...</div>}
              {suggestions.map((suggestion, i) => {
                return (
                  <div className="AutoCompleteItem_auto"
                    key={i}
                    {...getSuggestionItemProps(suggestion)}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  );
}

export default AutoCompleteAddress;
