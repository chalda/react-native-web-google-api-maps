# replacement for unmaintained `react-native-web-maps`

Web/browser polyfill for `react-native-maps` using google maps via `@react-google-maps/api"`.

#### Motivation 
I was struggling getting `react-native-web-maps` to work. The project wasnt getting a lot of support at the time, although it seems more active recently. Additionally, the underlying js lib for gmaps used by `react-native-web-maps` is no longer in active development and recommends switching to `@react-google-maps/api"` for new projects. So here we are. At this point this lib supports most features provided by native maps. 

=
## how to use

Get yourself a google API key from google Cloud.

The goald of this lib is to act as an invisibile drop in extension of `react-native-maps`. In the ideal case your code for native and web versions of your app should work exactly the same.

the ONLY change required to your app markup is  a prop containing the google maps API key.

This lib does not support non-google maps implementations.

extra prop:

```jsx

import { View, Platform } from 'react-native'; /// you can use Platform.OS to check if running on web, but shouldnt matter
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps'; /// no changes to imports 

// get the google maps api key from somewhere, for example env variable:
const googleMapsApiKey = Constants?.expoConfig?.extra?.googleMapsApiKey;

<MapView
    ref={mapRef}
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    initialRegion={region}
    onRegionChange={handleRegionChange}
    {...(Platform.OS === 'web' && { googleMapsApiKey })}> /// EXTRA web-only api-key prop                   
    {locations.length > 1 && (
        <Polyline
        coordinates={locations.map((loc) => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
        }))}
        strokeColor="#b22222"
        strokeWidth={3}
        lineDashPattern={[10, 12]}
        />
    )}
</MapView>
```


WIP: Still working on a babel plugin to do inplace remapping of `react-native-maps` with web code

Mostly followes the same api as `react-native-maps` + extra prop for apikey

These peer deps are pinned to be comaptible with `expo: 52.0.0`

```json
    "peerDependencies": {
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "react-native-maps": "*", // have it working with 1.18
    },
```

these are no longer pinned but should probably match:
`"react-native": "0.76.9",`
`"react-native-web": "0.19.13"`

## Local build

`yarn`

`yarn build` to build
