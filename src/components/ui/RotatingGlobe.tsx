import React, { useEffect, useRef } from 'react';

export function RotatingGlobe() {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let checkInterval: any = null;

    const initAmChartsGlobe = () => {
      const win = window as any;
      if (!win.am4core || !win.am4maps || !win.am4geodata_worldLow) {
        return false;
      }

      // If already initialized or unmounted, return
      if (!isMounted || !chartDivRef.current || chartInstanceRef.current) {
        return true;
      }

      const { am4core, am4maps, am4geodata_worldLow, am4themes_animated } = win;

      // Themes begin
      if (am4themes_animated) {
        am4core.useTheme(am4themes_animated);
      }

      // Create map instance
      const chart = am4core.create(chartDivRef.current, am4maps.MapChart);
      chartInstanceRef.current = chart;

      // Optional: discreet amCharts logo handling
      if (chart.logo) {
        chart.logo.disabled = true;
      }

      // Set map definition from GeoJSON
      chart.geodata = am4geodata_worldLow;

      // Set projection: Orthographic (3D rotating globe)
      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = 'rotateLongLat';
      chart.deltaLatitude = -20;
      chart.padding(15, 15, 15, 15);

      // Globe ocean background (Sphere fill & rim border in Ceeras deep ocean blue)
      const bgPolygon = chart.backgroundSeries.mapPolygons.template.polygon;
      bgPolygon.fill = am4core.color('#023e8a');
      bgPolygon.fillOpacity = 0.18;
      bgPolygon.stroke = am4core.color('#008D9B');
      bgPolygon.strokeOpacity = 0.35;
      bgPolygon.strokeWidth = 1.2;

      // Create map polygon series for continents & countries
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      // Configure polygon series template with Ceeras brand colors
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      // Ceeras primary teal for landmasses
      polygonTemplate.fill = am4core.color('#0E5E77');
      // Subtle cyan border
      polygonTemplate.stroke = am4core.color('#00E5FF');
      polygonTemplate.strokeOpacity = 0.35;
      polygonTemplate.strokeWidth = 0.5;
      polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      // Create hover state with electric cyan/teal glow
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#00A8B5');
      hs.properties.stroke = am4core.color('#00E5FF');
      hs.properties.strokeOpacity = 0.9;

      // Graticule series (latitude & longitude grid lines in subtle Ceeras secondary)
      const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.line.stroke = am4core.color('#008D9B');
      graticuleSeries.mapLines.template.line.strokeOpacity = 0.16;
      graticuleSeries.fitExtent = false;

      // Tooltip styling with Ceeras dark card aesthetic
      if (chart.tooltip) {
        chart.tooltip.getFillFromObject = false;
        chart.tooltip.background.fill = am4core.color('#102228');
        chart.tooltip.background.stroke = am4core.color('#00E5FF');
        chart.tooltip.background.strokeWidth = 1;
        chart.tooltip.label.fill = am4core.color('#FFFFFF');
        chart.tooltip.label.fontSize = 12;
      }

      // Continuous smooth 3D globe rotation animation
      let animation: any = null;
      const startRotation = () => {
        animation = chart.animate(
          { property: 'deltaLongitude', to: 100000 },
          20000000
        );
      };

      const timer = setTimeout(() => {
        if (isMounted) startRotation();
      }, 1000);

      chart.seriesContainer.events.on('down', function () {
        if (animation) {
          animation.stop();
        }
      });

      chart.seriesContainer.events.on('up', function () {
        startRotation();
      });

      return true;
    };

    // Attempt immediate initialization
    if (!initAmChartsGlobe()) {
      // If scripts are still loading via defer, poll every 80ms until available
      checkInterval = setInterval(() => {
        if (initAmChartsGlobe()) {
          clearInterval(checkInterval);
        }
      }, 80);
    }

    return () => {
      isMounted = false;
      if (checkInterval) clearInterval(checkInterval);
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.dispose();
        } catch {
          // ignore cleanup errors
        }
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] flex items-center justify-center select-none">
      {/* Container for amCharts 4 Orthographic rotating globe */}
      <div
        id="chartdiv"
        ref={chartDivRef}
        className="w-full h-[380px] sm:h-[440px] md:h-[480px] relative z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(14, 94, 119, 0.08) 0%, transparent 72%)',
        }}
      />
    </div>
  );
}
