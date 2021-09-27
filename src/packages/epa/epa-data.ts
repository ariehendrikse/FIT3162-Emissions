import Vehicle, { CO2Profile } from "../model/Vehicle";

export const getMakesForYear = async (value: number | string) => {
  return new Promise((resolve: (value: {name: string, value: string}[]) => void, reject) => {
    console.log("Fetching")
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${value}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        let names = Array.prototype.slice.call(data.getElementsByTagName("text"))
        let values = Array.prototype.slice.call(data.getElementsByTagName("value"))
        let elements = names.map((v,i) => {
          return {name: v.innerHTML, value: values[i].innerHTML}
        });
        resolve(elements)
      })
      .catch(error => {
        reject(error)
      });
  });  

}

export const getModelsForMakeAndYear =  (year?: string) => async (make: string) => {
  return new Promise((resolve: (value: {name: string, value: string}[]) => void, reject) => {
    console.log(make)
    console.log("Fetching")
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year ? year : 2020}&make=${make}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        console.log("data for models", data)
        let names = Array.prototype.slice.call(data.getElementsByTagName("text"))
        let values = Array.prototype.slice.call(data.getElementsByTagName("value"))
        let elements = names.map((v,i) => {
          return {name: v.innerHTML, value: values[i].innerHTML}
        });
        resolve(elements)
      })
      .catch(error => {
        reject(error)
      });
  });  

}


export const getTrims =  (year?: string) => (make?: string) => async (model?: string) => {
  return new Promise((resolve: (value: {name: string, value: string}[]) => void, reject) => {
    console.log("Fetching")
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        let names = Array.prototype.slice.call(data.getElementsByTagName("text"))
        let values = Array.prototype.slice.call(data.getElementsByTagName("value"))
        let elements = names.map((v,i) => {
          return {name: v.innerHTML, value: values[i].innerHTML}
        });
        resolve(elements)
      })
      .catch(error => {
        reject(error)
      });
  });
}


export const getVehicleByEPA =   async (epaID?: string) => {
  return new Promise((resolve: (vehicle: Vehicle) => void, reject) => {
    console.log("Fetching")
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${epaID}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        console.log(data, "Data")
        let year = Array.prototype.slice.call(data.getElementsByTagName("year"))[0].innerHTML
        let make = Array.prototype.slice.call(data.getElementsByTagName("make"))[0].innerHTML
        let model = Array.prototype.slice.call(data.getElementsByTagName("model"))[0].innerHTML

        resolve({
          year, make, model
        })
      })
      .catch(error => {
        reject(error)
      });
  });
}

export const getYears = (s: string) => {
  return new Promise((resolve: (value: {name: string, value: string}[]) => void, reject) => {
    let numberOfYears = new Date().getFullYear() - 1970 + 2
    let vals = Array.from(Array(numberOfYears).keys()).map(k=>`${k+1970}`).reverse()
    
    resolve(vals.map(v=>({name: v, value: v})))
  });  
  
}