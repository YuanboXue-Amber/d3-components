import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface Margin {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
interface Axis {
  min?: number;
  max?: number;
  scale?: any;
  title?: string;
  offsetx?: number;
  offsety?: number;
  ticksNum?: number;
}
interface Props {
  parentG: any;
  width: number;
  height: number;
  margin: Margin;
  xAxis?: Axis;
  yAxis?: Axis;
}

const defaultXaxis = {
  min: 0,
  max: 100,
  scale: d3.scaleLinear(),
  title: 'X',
  offsetx: 10,
  offsety: 10,
  ticksNum: 10,
};
const defaultYaxis = {
  min: 0,
  max: 100,
  scale: d3.scaleLinear(),
  title: 'Y',
  offsetx: 10,
  offsety: 5,
  ticksNum: 5,
};

const Coordinates = ({
  parentG,
  width,
  height,
  margin,
  xAxis,
  yAxis,
}: Props) => {
  useEffect(() => {
    if (parentG == null) return;
    // set the dimensions and margins of the graph
    const netWidth = width - margin.left - margin.right;
    const netHeight = height - margin.top - margin.bottom;

    // create g element, respecting margins
    const currG = parentG
      .selectAll('.svg-coordinates')
      .data([null])
      .join('g')
      .attr('class', 'svg-coordinates')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // process info about each axis
    let finalX = xAxis;
    if (finalX == null) finalX = defaultXaxis;
    else finalX = { ...defaultXaxis, ...finalX };
    let finalY = yAxis;
    if (finalY == null) finalY = defaultYaxis;
    else finalY = { ...defaultYaxis, ...finalY };

    // Add X axis
    const x = finalX.scale
      .domain([finalX.min as number, finalX.max as number])
      .range([0, netWidth]);
    currG
      .append('g')
      .attr('transform', 'translate(0,' + netHeight + ')')
      .call(d3.axisBottom(x).ticks(finalX.ticksNum as number));

    // Add Y axis
    const y = finalY.scale
      .domain([finalY.min as number, finalY.max as number])
      .range([netHeight, 0]);
    currG.append('g').call(d3.axisLeft(y).ticks(finalY.ticksNum as number));

    // Add X axis label:
    currG
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', netWidth + (finalX.offsetx as number))
      .attr('y', netHeight + margin.top + (finalX.offsety as number))
      .text(finalX.title as string);

    // Y axis label:
    currG
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', finalY.offsety as number)
      .attr('x', finalY.offsetx as number)
      .text(finalY.title as string);
  }, [
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    parentG,
    width,
    xAxis,
    yAxis,
  ]);

  return <div id='svg-coordinates'></div>;
};

export default Coordinates;
