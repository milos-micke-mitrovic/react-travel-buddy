import React, { useState } from "react";
import FormLabel from "./UI/FormLabel";
import useCitySearch from "../hooks/useCitySearch";
import SquareButton from "./UI/SquareButton";
import InputDropdown from "./UI/InputDropdown";

const Home: React.FC = () => {
  const [cityOfDestinationFields, setCityOfDestinationFields] = useState<
    string[]
  >([""]);
  const [dateOfTrip, setDateOfTrip] = useState<string>("");
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(0);

  const {
    searchTerms,
    addSearchTerm,
    searchResults,
    showSearchResults,
    setShowSearchResults,
  } = useCitySearch();

  const handleAddCityOfDestinationField = () => {
    setCityOfDestinationFields((prevFields) => [...prevFields, ""]);
  };

  const handleRemoveCityOfDestinationField = (index: number) => {
    setCityOfDestinationFields((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  const handleDecreasePassengers = () => {
    setNumberOfPassengers((prevPassengers) => Math.max(prevPassengers - 1, 0));
  };

  const handleIncreasePassengers = () => {
    setNumberOfPassengers((prevPassengers) => prevPassengers + 1);
  };

  const handleSubmit = () => {
    // Implement the form submission logic here
  };

  // Form validation logic (check if required fields are filled and date is in the future)
  const isFormValid =
    searchTerms[0] !== "" &&
    cityOfDestinationFields.every((field) => field !== "") &&
    new Date(dateOfTrip) > new Date() &&
    numberOfPassengers >= 0; // Allow zero or more passengers

  const handleSelectCity = (index: number, city: string) => {
    addSearchTerm(index, city);
    setShowSearchResults((prevShowResults) => {
      const newShowResults = [...prevShowResults];
      newShowResults[index] = false; // Hide the search results when a city is selected
      return newShowResults;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md">
        <form>
          {/* City of Origin */}
          <div className="mb-4">
            <FormLabel htmlFor="cityOfOrigin" label="City of Origin" />

            <input
              type="text"
              id="cityOfOrigin"
              value={searchTerms[0] || ""}
              onChange={(e) => addSearchTerm(0, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />

            {showSearchResults[0] &&
              searchResults[0] &&
              searchResults[0].length > 0 && (
                <InputDropdown
                  liItems={searchResults[0]}
                  onClick={handleSelectCity}
                  index={0}
                />
              )}
          </div>

          {/* City of Destination Fields */}
          {cityOfDestinationFields.map((_, index) => (
            <div className="mb-4" key={index}>
              <FormLabel
                htmlFor={`cityOfDestination_${index}`}
                label="City of destination"
              />

              <input
                type="text"
                id={`cityOfDestination_${index}`}
                value={searchTerms[index + 1] || ""}
                onChange={(e) => addSearchTerm(index + 1, e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />

              {showSearchResults[index + 1] &&
                searchResults[index + 1] &&
                searchResults[index + 1].length > 0 && (
                  <InputDropdown
                    liItems={searchResults[index + 1]}
                    onClick={handleSelectCity}
                    index={index + 1}
                  />
                )}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCityOfDestinationField(index)}
                  className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white"
                >
                  Remove City of Destination
                </button>
              )}
            </div>
          ))}

          {/* Add Destination Button */}
          <div
            onClick={handleAddCityOfDestinationField}
            className="text-main-dark cursor-pointer mb-4"
          >
            Add Destination
          </div>

          {/* Date of the Trip */}
          <div className="mb-4">
            <FormLabel htmlFor="dateOfTrip" label="Date of the Trip" />

            <input
              type="date"
              id="dateOfTrip"
              value={dateOfTrip}
              onChange={(e) => setDateOfTrip(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />
            {/* Implement the date input field for Date of the Trip */}
            {/* ... */}
          </div>

          {/* Number of Passengers */}
          <div className="mb-4">
            <FormLabel label="Passengers" />

            <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-2 mt-1 max-w-min">
              <SquareButton onClick={handleDecreasePassengers}>-</SquareButton>
              {numberOfPassengers}
              <SquareButton onClick={handleIncreasePassengers}>+</SquareButton>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              isFormValid
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
