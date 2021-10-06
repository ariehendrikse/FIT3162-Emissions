import HasCoordinates from "../model/HasCoordinates";
export type MapBoxSearchResult = ({name: string} & HasCoordinates)
export const searchLocation = (text: string) => {
  const TOKEN = 'pk.eyJ1IjoiYXJpZWhlbmRyaWtzZSIsImEiOiJja3U2OXA4N3UzNnA3MnVxaHlmOTkzZHBjIn0.Ykl1qpTqORkJ16KJyLUR7Q'

  return new Promise((resolve: (result: MapBoxSearchResult[]) => void, reject) => {
    let url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${text.replace(' ','%20')}.json?access_token=${TOKEN}`
    console.log(`Fetching ${url}`)
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data: {features: {place_name: string, center: [number, number]}[]}) => {
        let results = data?.features?.map(f => ({
          name: f.place_name, 
          coordinates: {
            lat: f.center[1],
            lon: f.center[0],
        }}))
        console.log(`Results `, results)

        resolve(results ? results : [])
      })
      .catch(error => {
        reject(error)
      });
  });  
}

