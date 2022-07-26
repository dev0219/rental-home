import React, { useContext, useEffect, useState } from "react";
import { DispatchContext } from "../context/GlobalContext";
import axios from "axios";
import * as d3 from "d3";

const BarChart = () => {

    const [graphData1, setGraphData1] = useState([]);
    const [graphData2, setGraphData2] = useState([]);
    const dispatch = useContext(DispatchContext);
    const getData = async () => {
        try {
            const { data } = await axios.get("/api/homes/graph");
            await setGraphData2(data.graph2);
            await setGraphData1(data.graph1);
        } catch (e) {
            dispatch({ type: "HOME_LIST_FAIL", payload: "Someting went wrong" });
        }
    }
    useEffect(() => {
        // eslint-disable-next-line
        getData();
    }, [])
    useEffect(() => {
        // eslint-disable-next-line
        drawChart();
    }, [graphData1]);

    const drawChart = () => {
        if (graphData1.length !== 0) {
            let margin = { top: 30, right: 20, bottom: 30, left: 50 },
                width = 600 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

                const h = height;
            const max = d3.max(graphData1, function (d) { return d; });
            const max2 = d3.max(graphData2, function (d) { return d.totalPrice; });
            const svg1 = d3.select(".graph1")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            svg1.selectAll("rect")
                .data(graphData1)
                .enter()
                .append("rect")
                .attr("x", (d, i) => (i + 1) * (width-20) / graphData1.length+32.5/(i+1))
                .attr("y", (d, i) => h - d * height/(max+1))
                .attr("width", 25)
                .attr("height", (d, i) => d * height/(max+1))
                .attr("fill", "green");

            const xscale = d3.scaleLinear()
                .domain([0, graphData1.length])
                .range([25, width]);
            const yscale = d3.scaleLinear()
                .domain([0, max+1])
                .range([height, 0]);
            const x_axis1 = d3.axisBottom()
                .scale(xscale);
            x_axis1.ticks(graphData1.length);
            const y_axis1 = d3.axisLeft()
                .scale(yscale);
            svg1.append("g")
                .attr("transform", "translate(0, "+ height +")")
                .call(x_axis1);
            svg1.append("g")
                .attr("transform", "translate(25, 0)")
                .call(y_axis1);

            svg1.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height+30)
                .text("Users")
                .style("fill", "white");
            svg1.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("x", 30-height/2)
                .attr("dy", "3rem")
                .attr("transform", "rotate(-90)")
                .text("Purchases")
                .style("fill", "white");

            const svg2 = d3.select(".graph1")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)

            svg2.selectAll("rect")
                .data(graphData2.map((data) => {
                    return data.totalPrice
                }))
                .enter()
                .append("rect")
                .attr("x", (d, i) => (i + 1) * (width-40) / graphData2.length+30)
                .attr("y", (d, i) => h - d * height/(max2+1))
                .attr("width", 25)
                .attr("height", (d, i) => d * height/(max2+1))
                .attr("fill", "yellow");
            const xscale2 = d3.scaleLinear()
                .domain([0, graphData2.length])
                .range([40, width]);
            const yscale2 = d3.scaleLinear()
                .domain([0, max2+100])
                .range([height, 0]);
            const x_axis2 = d3.axisBottom()
                .scale(xscale2);
            x_axis2.ticks(graphData2.length);
            const y_axis2 = d3.axisLeft()
                .scale(yscale2);
            svg2.append("g")
                .attr("transform", "translate(0, "+ height +")")
                .call(x_axis2);
            svg2.append("g")
                .attr("transform", "translate(40, 0)")
                .call(y_axis2);

            svg2.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height+30)
                .text("Cities")
                .style("fill", "white");
            svg2.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", 30)
                .text("Sales per city")
                .style("fill", "white");
            svg2.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("x", 30-height/2)
                .attr("dy", "4rem")
                .attr("transform", "rotate(-90)")
                .text("Total Prices")
                .style("fill", "white");
        }
    }
    return (<></>);
}

export default BarChart;