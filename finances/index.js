const strokeColor = "#fff";

chart = async function() {
    const svg = d3.select("#chart-cash-flow").append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const { nodes, links } = sankey()(await data());

    svg.append("g")
        .attr("stroke", strokeColor)
        .selectAll("rect")
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", color())
        .append("title")
        .text(d => `${d.name}\n${format()(d.value)}`);

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    if (edgeColor === "path") {
        const gradient = link.append("linearGradient")
            .attr("id", d => (d.uid = DOM.uid("link")).id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => color(d.source));

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => color(d.target));
    }

    // links between nodes
    link.append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => edgeColor === "none" ? "#aaa" :
            edgeColor === "path" ? d.uid :
            edgeColor === "input" ? color(d.source) :
            color(d.target))
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format()(d.value)}`);

    svg.append("g")
        .attr("font-family", "monospace")
        .attr("fill", strokeColor)
        // .attr("font-size", 10)
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name);

    return svg.node();
}

sankey = function() {
    const sankey = d3.sankey()
        .nodeId(d => d.name)
        .nodeAlign(d3[`sankeyJustify`])
        .nodeWidth(15)
        .nodePadding(10)
        .extent([
            [1, 5],
            [width - 1, height - 5]
        ]);
    return ({ nodes, links }) => sankey({
        nodes: nodes.map(d => Object.assign({}, d)),
        links: links.map(d => Object.assign({}, d))
    });
}

format = function() {
    const format = d3.format(".0f");
    return data.units ? d => `${format(d)} ${data.units}` : format;
}

color = function() {
    const color = d3.scaleOrdinal(d3.schemeSet3);
    return d => color(d.category === undefined ? d.name : d.category);
}

data = async function() {
    const csv = await (await fetch("2020-05.csv")).text();
    console.log(csv);
    const links = d3.csvParse(csv, d3.autoType);
    const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({ name, category: name.replace(/ .*/, "") }));
    return { nodes, links, units: "PLN" };
}
edgeColor = "none";
width = 800;
height = 400;

chart();

const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

monthlyData = Object.assign(
    d3.csvParse( // i fucking cant into fetch
        `date,income,expenses
2019-01,2989.9,5716.66
2019-02,3028.61,5795.95
2019-03,3086.99,5655.74
2019-04,2916.71,5604.20
2019-05,3442.61,5533.14
2019-06,4087.34,5812.10
2019-07,3776.73,5812.10
2019-08,6498.1,5812.10
2019-09,3724.91,5812.10
2019-10,11671.72,5812.10
2019-11,3504.91,5812.10
2019-12,5803.82,5812.10
2020-01,6156.73,6236.51
2020-02,14813.06,6299.93
2020-03,3328.21,5558.07
2020-04,4497.86,6183.44
2020-05,2958.17,5177.32`,
        ({ date, income }) => ({ date: date, value: +income })
    ), { format: "PLN", y: "kwota" }
)

// const parseDate = d3.time.format("%Y-%m").parse;

barChart = function() {
    const svg = d3.select("#chart-monthly").append("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .attr("fill", "white")
        .selectAll("rect")
        .data(monthlyData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    return svg.node();
}



x = d3.scaleBand()
    .domain(d3.range(monthlyData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

y = d3.scaleLinear()
    .domain([0, d3.max(monthlyData, d => d.value)]).nice(6)
    .range([height - margin.bottom, margin.top])

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(d3.utcMonth.every(1200 / width)).tickSizeOuter(0))

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(6))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(monthlyData.y))



barChart();