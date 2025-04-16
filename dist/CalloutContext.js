// CalloutContext.tsx
import { createContext, useContext } from "react";
export const CalloutContext = createContext(null);
export const useCalloutContext = () => {
    const ctx = useContext(CalloutContext);
    if (!ctx) {
        throw new Error("Callout must be used within a Marker (web)");
    }
    return ctx;
};
