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