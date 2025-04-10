# replacement for unmaintained `react-native-web-maps`

polyfill for `react-native-maps` for the web using google maps via `@react-google-maps/api"`

## how to use

Get yourself a google API key from google Cloud.

WIP: Still working on a babel plugin to do inplace remapping of `react-native-maps` with web code

Mostly followes the same api as `react-native-maps` + extra prop for apikey

These peer deps are pinned to be comaptible with `expo: 52.0.0`

```json
    "peerDependencies": {
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "react-native": "0.76.9",
        "react-native-maps": "1.18.0",
        "react-native-web": "0.19.13"
    },
```

## Local build

`yarn`

`yarn build` to build
