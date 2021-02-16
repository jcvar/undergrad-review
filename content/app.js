const width = 600;
const height = 400;

d3.json('curriculum.json').then(
  data => {
    const { subjects, prerequisites } = data;
    console.log(subjects);
    console.log(prerequisites);

    // subjects.forEach(sub => {
    //   sub.fixedValue = sub.cred;
    // });

    sankey = d3.sankey()
    .nodeId(d => d.code)
    .nodeSort(null)
    .linkSort(null)
    .nodeWidth(10)
    .nodePadding(10)
    .extent([[0, 0], [width, height]])

    console.log(sankey);

    graph = sankey({nodes: subjects, links: prerequisites});

    console.log(graph);

    svg = d3.select('svg');

    svg.append("g")
    .selectAll("rect")
    .data(graph.nodes)
    .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
    
      svg.append("g")
      .attr("fill", "none")
    .selectAll("g")
    .data(links)
    .join("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", d => color(d.names[0]))
      .attr("stroke-width", d => d.width)
      .style("mix-blend-mode", "multiply")
  }
);



