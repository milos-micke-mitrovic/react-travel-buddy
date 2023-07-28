import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormLabel from "./UI/FormLabel";
import InputDropdown from "./UI/InputDropdown";
import SquareButton from "./UI/Buttons/SquareButton";
import CircleButton from "./UI/Buttons/CircleButton";
import Card from "./UI/Card";
import Button from "./UI/Buttons/Button";
import useCitySearch from "../hooks/useCitySearch";
import markerImage from "../assets/images/marker.png";
import MiniCalendar from "./MiniCalendar";
import { todayDate } from "../utils";

const Home: React.FC = () => {
  const [cityOfDestinationFields, setCityOfDestinationFields] = useState<
    string[]
  >([""]);
  const [dateOfTrip, setDateOfTrip] = useState<string>(
    todayDate().split("/").reverse().join("-")
  );
  const [isMiniCalendarOpen, setIsMiniCalendarOpen] = useState<boolean>(false);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(0);

  const navigate = useNavigate();

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

  const openMiniCalendar = () => {
    setIsMiniCalendarOpen((prev) => !prev);
  };

  const handleDateChange = (date: string) => {
    setDateOfTrip(date);
    setIsMiniCalendarOpen(false);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      cityOfOrigin: searchTerms[0],
      cityOfDestinations: cityOfDestinationFields.filter(
        (field) => field !== ""
      ),
      dateOfTrip: dateOfTrip,
      numberOfPassengers: numberOfPassengers,
    };

    if (!isFormValid) {
      alert("Please fill in all the required fields before submitting.");
      return;
    }

    navigate("/search-results", { state: { formData } });
  };

  const handleSelectCity = (city: string, index: number) => {
    addSearchTerm(index, city);

    setCityOfDestinationFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index - 1] = city;
      return newFields;
    });

    setShowSearchResults((prevShowResults) => {
      const newShowResults = [...prevShowResults];
      newShowResults[index] = false;
      return newShowResults;
    });
  };

  const isFormValid =
    searchTerms[0] !== "" &&
    cityOfDestinationFields.every((field) => field !== "") &&
    dateOfTrip !== "" &&
    new Date(dateOfTrip).getTime() >= new Date().setHours(0, 0, 0, 0) && // Check if dateOfTrip is greater than or equal to today's date (ignoring the time)
    numberOfPassengers > 0;

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex flex-col items-center mr-10 mt-8">
          <CircleButton additionalClasses="!cursor-default">
            <></>
          </CircleButton>

          <div className="vertical-dots"></div>

          {cityOfDestinationFields.map((_, index) => (
            <React.Fragment key={index}>
              {index < cityOfDestinationFields.length - 1 ? (
                <>
                  <CircleButton additionalClasses="!cursor-default">
                    <></>
                  </CircleButton>

                  <div className="vertical-dots"></div>
                </>
              ) : (
                <img src={markerImage} className="w-4 h-5" alt="Marker" />
              )}
            </React.Fragment>
          ))}
        </div>

        <CircleButton additionalClasses="!cursor-default mt-7 pb-[1px]">
          &#43;
        </CircleButton>
      </div>

      <form className="w-full h-full" onSubmit={onSubmitHandler}>
        {/* City of Origin */}
        <div className="mb-4">
          <FormLabel htmlFor="cityOfOrigin" label="City of origin" />

          <input
            type="text"
            id="cityOfOrigin"
            value={searchTerms[0] || ""}
            onChange={(e) => addSearchTerm(0, e.target.value)}
            className="mt-1 h-10 p-2 border border-gray-300 rounded-lg w-11/12"
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

            <div className="flex items-center justify-between">
              <input
                type="text"
                id={`cityOfDestination_${index}`}
                value={searchTerms[index + 1] || ""}
                onChange={(e) => addSearchTerm(index + 1, e.target.value)}
                className="mt-1 p-2 h-10 border border-gray-300 rounded-lg w-11/12"
              />

              {index > 0 && (
                <CircleButton
                  onClick={() => handleRemoveCityOfDestinationField(index)}
                >
                  &#10005;
                </CircleButton>
              )}
            </div>

            {showSearchResults[index + 1] &&
              searchResults[index + 1] &&
              searchResults[index + 1].length > 0 && (
                <InputDropdown
                  liItems={searchResults[index + 1]}
                  onClick={handleSelectCity}
                  index={index + 1}
                />
              )}
          </div>
        ))}

        {/* Add Destination Button */}
        <div
          onClick={handleAddCityOfDestinationField}
          className="text-main-dark cursor-pointer mb-4  flex items-center"
        >
          Add Destination
        </div>

        {/* Date of the Trip */}
        <div className="mb-4">
          <FormLabel htmlFor="dateOfTrip" label="Date" />

          <div
            onClick={openMiniCalendar}
            className="flex justify-center items-center border border-gray-300 rounded-lg p-2 mt-1 h-10 max-w-min cursor-pointer"
          >
            {dateOfTrip
              ? new Date(dateOfTrip).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : todayDate()}
          </div>

          {isMiniCalendarOpen && (
            <MiniCalendar
              selectedDate={dateOfTrip || ""}
              onDateChange={handleDateChange}
              onBlur={() => setIsMiniCalendarOpen(false)}
            />
          )}
        </div>

        {/* Number of Passengers */}
        <div className="mb-4">
          <FormLabel label="Passengers" />

          <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-2 mt-1 h-10 max-w-min">
            <SquareButton onClick={handleDecreasePassengers}>
              &#45;
            </SquareButton>

            {numberOfPassengers}

            <SquareButton onClick={handleIncreasePassengers}>
              &#43;
            </SquareButton>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={!isFormValid}>
          Search
        </Button>
      </form>
    </Card>
  );
};

export default Home;
