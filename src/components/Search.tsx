import { useRef, useState } from "react";

import useWeatherStore from "../stores/weatherStore";
import useClickOutside from "../hooks/useClickOutside";

import Button from "./Button";
import DropdownItemContainer from "./DropdownItemContainer";
import DropdownItem from "./DropdownItem";
import Input from "./Input";
import SearchIcon from "../assets/SearchIcon";

const Search: React.FC = () => {
  const { fetchForecast, loading, locations, searchLocation, searchLoading } = useWeatherStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <form className="flex gap-4 flex-col md:flex-row" onSubmit={(event) => event.preventDefault()}>
      <div className="relative inline-block text-left mr-2 lg:w-full md:w-4/5 w-full">
        <Input
          icon={<SearchIcon />}
          placeholder="Search for a place..."
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          disabled={searchLoading}
        />
        {isOpen && (
          <DropdownItemContainer ref={dropdownRef} width="full">
            {!locations && searchLoading && (
              <DropdownItem value="" field="Search in progress" onClick={() => {}} disabled />
            )}
            {locations &&
              locations?.map((location) => {
                return (
                  <DropdownItem
                    key={location.id}
                    value={`${location.lat},${location.lon}`}
                    field={`${location.name}, ${location.region}, ${location.country}`}
                    onClick={() => {
                      fetchForecast({ lat: location.lat, lon: location.lon });
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  />
                );
              })}
          </DropdownItemContainer>
        )}
      </div>
      <Button
        disabled={loading || searchLoading}
        onClick={() => {
          searchLocation(searchTerm);
          setIsOpen(true);
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
