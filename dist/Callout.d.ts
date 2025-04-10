import React from 'react';
interface CalloutProps {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    content: string | JSX.Element;
    map?: google.maps.Map | null;
}
declare const Callout: React.FC<CalloutProps>;
export default Callout;
