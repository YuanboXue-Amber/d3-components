import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './SVG.css';
import Coordinates from './components/Coordinates';

interface Props {
  width: number;
  height: number;
}

const SVG = ({ width, height }: Props) => {
  const zoomG: any = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [svgMade, setSvgMade] = useState(false);

  useEffect(() => {
    const svg = d3
      .select('#svg-container')
      .selectAll('.svg-container')
      .data([null])
      .join('div')
      .classed('svg-container', true)
      .selectAll('svg')
      .data([null])
      .join('svg')
      .classed('svg-content-responsive', true)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', `xMinYMin meet`);

    zoomG.current = svg
      .selectAll('.zoom-container')
      .data([null])
      .join('g')
      .attr('class', 'zoom-container');
    setSvgMade(true);

    // const sliderG = zoomG
    //   .selectAll('.slider')
    //   .data([null])
    //   .join('g')
    //   .attr('class', 'slider')
    //   .attr('transform', 'translate(200, 450) scale(0.5, 0.5)');

    // zoom
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', () => {
        zoomG.current.attr('transform', d3.event.transform);
      });
    svg.call(zoom as any);
  }, [width, height]);

  const coordinatesProps = {
    parentG: zoomG.current,
    width: 400,
    height: 200,
    margin: {
      top: 20,
      bottom: 10,
      left: 40,
      right: 20,
    },
    xAxis: {
      min: 0,
      max: 40,
    },
    yAxis: {
      min: 0,
      max: 20,
    },
  };
  return (
    <div id='svg-container'>
      <Coordinates {...coordinatesProps} />
    </div>
  );
};

export default SVG;
