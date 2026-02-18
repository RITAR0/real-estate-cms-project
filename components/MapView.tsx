import React, { useEffect, useRef } from "react";
import { Property } from "../types";

interface MapViewProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ properties, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      // @ts-ignore
      const L = window.L;
      if (!L) return;

      if (!leafletMap.current) {
        // Layers
        const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        const satelliteLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "mv &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          },
        );

        // Center of Lebanon: Beirut coordinates as default
        leafletMap.current = L.map(mapRef.current, {
          center: [33.8938, 35.5018],
          zoom: 10,
          layers: [streetLayer],
        });

        const baseMaps = {
          "Street View": streetLayer,
          "Satellite View": satelliteLayer,
        };

        L.control.layers(baseMaps, null, { position: "bottomright" }).addTo(leafletMap.current);
      } else {
        // Clear existing markers
        leafletMap.current.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            leafletMap.current.removeLayer(layer);
          }
        });
      }

      const markers = properties.map((prop) => {
        // Create custom price tag icon
        const priceTagIcon = L.divIcon({
          className: "custom-div-icon",
          html: `
            <div class="relative group">
              <div class="bg-orange-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-white transform transition-all duration-300 hover:scale-110 hover:bg-slate-900 group-hover:z-50 whitespace-nowrap">
                $${(prop.price / 1000).toFixed(0)}k
              </div>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-600 rotate-45 border-br-2 border-white"></div>
            </div>
          `,
          iconSize: [60, 30],
          iconAnchor: [30, 35],
        });

        const marker = L.marker(prop.coords, { icon: priceTagIcon }).addTo(leafletMap.current);

        marker.bindPopup(
          `
          <div class="p-2 w-48 font-sans">
            <img src="${prop.image}" class="w-full h-24 object-cover rounded-lg mb-2 shadow-sm"/>
            <h3 class="font-bold text-gray-900 leading-tight">${prop.title}</h3>
            <p class="text-xs text-gray-500 mb-1">${prop.location}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-black text-orange-600">$${prop.price.toLocaleString()}</span>
              <span class="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full font-bold uppercase text-gray-600">${prop.type}</span>
            </div>
          </div>
        `,
          {
            className: "custom-leaflet-popup",
            closeButton: false,
          },
        );

        marker.on("click", () => onMarkerClick?.(prop));
        return marker;
      });

      if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        leafletMap.current.fitBounds(group.getBounds().pad(0.2));
      }
    };

    const timer = setTimeout(initMap, 500);
    return () => clearTimeout(timer);
  }, [properties, onMarkerClick]);

  return (
    <div className="w-full h-full min-h-[450px] relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-50 flex items-center justify-center">
      <div ref={mapRef} className="absolute inset-0 z-0"></div>
      <div className="absolute top-4 left-4 right-4 flex justify-center z-[1000] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-sm font-bold text-gray-800 tracking-tight">Lebanon Property Hotspots</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
