import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const LocationSearchComponent = () => (
  <div>
    <GooglePlacesAutocomplete
      apiKey="AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o"
    />
  </div>
);

export default LocationSearchComponent;