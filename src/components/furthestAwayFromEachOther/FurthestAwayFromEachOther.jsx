import React from "react";

export const FurthestAwayFromEachOther = ({ users }) => {
  const differenceBetweenGeoCoordinates = users
    .map((user) => ({
      ...user,
      differenceCoordinates:
        user.address.geolocation.lat - user.address.geolocation.long,
    }))
    .sort((a, b) => a.differenceCoordinates - b.differenceCoordinates);

  const sortUsers = differenceBetweenGeoCoordinates.sort(
    (a, b) => a.differenceCoordinates - b.differenceCoordinates
  );

  const minUserCoordinates = sortUsers.reduce(
    (acc, curr) =>
      acc.differenceCoordinates < curr.differenceCoordinates ? acc : curr,
    {}
  );
  const maxUserCoordinates = sortUsers.reduce(
    (acc, curr) =>
      acc.differenceCoordinates > curr.differenceCoordinates ? acc : curr,
    {}
  );

  // COPY IN STACKOVERFLOW
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2) + " km";
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      {users.length >= 1 && (
        <div>
          <h1>Furthest away from each other:</h1>
          <p>
            <b>The furthest distance between the two users is</b>{" "}
            <span>
              {getDistanceFromLatLonInKm(
                minUserCoordinates.address.geolocation.lat,
                minUserCoordinates.address.geolocation.long,
                maxUserCoordinates.address.geolocation.lat,
                maxUserCoordinates.address.geolocation.long
              )}
            </span>{" "}
            <b>between users </b>
            <span>{`${minUserCoordinates.name.firstname} ${minUserCoordinates.name.lastname} and ${maxUserCoordinates.name.firstname} ${maxUserCoordinates.name.lastname}`}</span>
          </p>
        </div>
      )}
    </div>
  );
};
