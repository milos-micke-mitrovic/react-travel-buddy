import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

import Card from "./UI/Card";
import CircleButton from "./UI/Buttons/CircleButton";
import Button from "./UI/Buttons/Button";
import { citiesData } from "../api/citiesData";
import { calculateDistance } from "../utils";
import markerImage from "../assets/images/marker.png";

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData: {
    cityOfOrigin: string;
    cityOfDestinations: string[];
    dateOfTrip: string;
    numberOfPassengers: number;
  } | null = location.state && location.state.formData;

  const formattedDate = formData?.dateOfTrip
    ? format(new Date(formData.dateOfTrip), "MMM d, yyyy")
    : "";

  // Calculate distances between cities
  const distances: number[] = [];
  let totalDistance = 0;

  if (formData) {
    let previousCityData = citiesData.find(
      (city) => city.name === formData.cityOfOrigin
    )!;
    if (previousCityData) {
      formData.cityOfDestinations.forEach((destinationCity) => {
        const destCityData = citiesData.find(
          (city) => city.name === destinationCity
        );
        if (destCityData) {
          const distance = calculateDistance(
            previousCityData.latitude,
            previousCityData.longitude,
            destCityData.latitude,
            destCityData.longitude
          );
          distances.push(distance);
          totalDistance += distance;
          previousCityData = destCityData;
        }
      });
    }
  }

  return (
    <Card>
      <div className="flex flex-col justify-center items-center w-full gap-2">
        <div className="flex mb-4">
          <div className="flex flex-col mt-9 mr-4 w-48 gap-[52px]">
            {formData?.cityOfDestinations.map((destinationCity, index) => (
              <div
                className="speech-bubble right w-24 self-end"
                key={destinationCity}
              >
                {distances[index].toFixed(2)} km
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-1">
            <CircleButton additionalClasses="!cursor-default">
              <></>
            </CircleButton>

            <div className="vertical-dots"></div>

            {formData?.cityOfDestinations.map((_, index: number) => (
              <React.Fragment key={index}>
                {index < formData.cityOfDestinations.length - 1 ? (
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

          <div className="flex flex-col ml-4 w-48 gap-[52px]">
            {formData?.cityOfOrigin}

            {formData?.cityOfDestinations.map(
              (cityOfDestination, index: number) => (
                <div key={index}>{cityOfDestination}</div>
              )
            )}
          </div>
        </div>

        <p>
          <span className="text-main-dark font-bold">
            {totalDistance.toFixed(2)} km
          </span>{" "}
          is total distance
        </p>

        <p>
          <span className="text-main-dark font-bold">
            {formData?.numberOfPassengers}
          </span>{" "}
          {formData && formData.numberOfPassengers > 1
            ? "passengers"
            : "passenger"}
        </p>

        <p>
          <span className="text-main-dark font-bold">{formattedDate}</span>
        </p>

        <Button
          additionalClasses="w-16 mt-6"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Back
        </Button>
      </div>
    </Card>
  );
};

export default SearchResults;
