# geobuff/maps
[![npm](https://img.shields.io/npm/v/@geobuff/maps)](https://www.npmjs.com/package/@geobuff/maps)
[![David](https://img.shields.io/david/geobuff/maps)](https://david-dm.org/geobuff/maps)

A collection of free-to-use maps.

## Maps
- World, Countries
- World, Capitals
- Africa, Countries
- Asia, Countries
- Europe, Countries
- North America, Countries
- South America, Countries
- Oceania, Countries
- Argentina, Provinces
- Australia, States and Territories
- Brazil, States
- Canada, Provinces and Territories 	
- France, Regions
- Germany, States
- India, States and Union Territories
- Japan, Prefectures
- Mexico, States
- New Zealand, Regions
- Nigeria, States
- Turkey, Provinces
- US, States
- UK, Counties
- Uganda, Districts
- Zambia, Provinces

## Install
```
npm install @geobuff/maps 
```

## Usage
```
import React from "react";
import { SVGMap } from "react-svg-map";
import { WorldCountries } from "@geobuff/maps";

const ExampleComponent = () => (
  <>
    <SVGMap map={WorldCountries} />
  </>
);

export default ExampleComponent;
```
