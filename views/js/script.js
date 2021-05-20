onload = function(){
// Create new Graph
let cities_copy,graph_copy,V,src,dst;

const container = document.getElementById('mynetwork');
const genNew = document.getElementById('generate-graph');
const solve = document.getElementById('solve');
const temptext = document.getElementById('temptext');
const temptext2 = document.getElementById('temptext2');

var user = document.getElementById('u').innerText;

// graph options
const options = {
    edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: '#991133',
            }
        }
    };
    //Initialising network for input graph
    const network = new vis.Network(container);
    network.setOptions(options);

    // Initialise network for output graph
    const network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData()
    {    
        if(user === "0")
        {
            const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];
            cities_copy = cities.slice();

            V = Math.floor(Math.random() * 8) + 3;  // Ensures V is between 3 and 10
            
            let vertices = [];
            for(let i=1;i<=V;i++){
                vertices.push({id:i, label: cities[i-1]})
            }
             // Prepares vis.js style nodes for our data
            vertices = new vis.DataSet(vertices);
            
            let edges = [];
            for(let i=2;i<=V;i++)
            {
                let neigh = i - Math.floor(Math.random()*Math.min(i-1,3)+1); // Picks a neighbour from i-3 to i-1
                edges.push({type:0,from: i, to: neigh, color: 'orange',label: String(Math.floor(Math.random()*70)+31)});
            }

            // Randomly adding new edges to graph
            // Type of bus is 0
            // Type of plane is 1
            for(let i=1;i<=V/2;)
            {
                let n1 = Math.floor(Math.random()*V)+1;
                let n2 = Math.floor(Math.random()*V)+1;
                if(n1!==n2)
                {
                    if(n1<n2)
                    {
                        let tmp = n1;
                        n1 = n2;
                        n2 = tmp;
                    }
                    // Seeing if an edge between these two vertices already exists
                    // And if it does then of which kind
                    let works = 0;
                    for(let j=0;j<edges.length;j++)
                    {
                        if(edges[j]['from']===n1 && edges[j]['to']===n2) 
                        {
                            if(edges[j]['type']===0)
                                works = 1;
                            else
                                works = 2;
                        }
                    }

                    // Adding edges to the graph
                    // If works == 0, you can add bus as well as plane between vertices
                    // If works == 1, you can only add plane between them
                    if(works <= 1) {
                        if (works === 0 && i < V / 4) {
                            // Adding a bus
                            edges.push({
                                type: 0,
                                from: n1,
                                to: n2,
                                color: 'orange',
                                label: String(Math.floor(Math.random() * 70) + 31)
                            });
                        } else {
                            // Adding a plane
                            edges.push({
                                type: 1,
                                from: n1,
                                to: n2,
                                color: 'green',
                                label: String(Math.floor(Math.random() * 50) + 1)
                            });
                        }
                        i++;
                    }
                }
            }

            // Setting the new values of global variables
            src = 1;
            dst = V;
            let data ={
                nodes: vertices,
                edges: edges
            };
            graph_copy = data;
            return data;
        }
        else
        {
            let v = document.getElementById('v').innerText;
            let res = v.split(",");
            
            const cities = res;
            cities_copy = cities;
            let len = cities.length;
            let vertices = [];

            for(let i=1;i<=len;i++){
                vertices.push({id:i, label: cities[i-1]})
            }

            console.log(vertices);
            
            // Adding bus(orange) edges in edges[]
            let e = document.getElementById('e').innerText;
            console.log("Full Edges"+e);

            var ed = e.split("-");
            var ln = ed.length;
            
            console.log(ed);
            let edges = [];
            for(var i=0;i<ln;i++)
            {
                var edge = ed[i];
                var len2 = edge.length;
                var sub_str = edge.substr(1, len2-2);
                var edge_data = sub_str.split(",");

                // console.log(edge_data);
                let st = cities.indexOf(edge_data[0])+1;
                // console.log("Start: "+st);
                let end = cities.indexOf(edge_data[1])+1;
                // console.log("End: "+end);
                let wt = edge_data[2];
                // console.log("Weight: "+wt);

                edges.push({type:0,from: st,to: end,color: 'orange', label: String(wt)});
            }

            // Adding plane(green) edges in edges[]
            let pl = document.getElementById('pl').innerText;
            console.log("Full Edges"+pl);

            let pl_ed = pl.split("-");
            let p_ln = pl_ed.length;
            
            console.log(pl_ed);

            for(var i=0;i<p_ln;i++)
            {
                let edge = pl_ed[i];
                let len2 = edge.length;
                let sub_str = edge.substr(1, len2-2);
                let edge_data = sub_str.split(",");

                console.log(edge_data);
                let st = cities.indexOf(edge_data[0])+1;
                console.log("Start: "+st);
                let end = cities.indexOf(edge_data[1])+1;
                console.log("End: "+end);
                let wt = edge_data[2];
                console.log("Weight: "+wt);

                // Plane edge possibility check
                if(st!==end)
                {
                    if(st<end)
                    {
                        let tmp = st;
                        st = end;
                        end = tmp;
                    }
                    // Seeing if an edge between these two vertices already exists
                    // And if it does then of which kind

                    // 0 => means no path is there & plane can be added
                    // 1 => means bus is already present & plane can also be added
                    // 2 => means plane is already present & plane cant be added
                    let works = 0;
                    for(let j=0;j<edges.length;j++)
                    {
                        if(edges[j]['from']===st && edges[j]['to']===end) 
                        {
                            if(edges[j]['type']===0)
                                works = 1;
                            else
                                works = 2;
                        }
                    }
    
                    // Adding edges to the graph
                    // If works == 0, you can add bus as well as plane between vertices
                    // If works == 1, you can only add plane between them
                    if(works <= 1) 
                    {
                        // Adding a plane
                        edges.push({
                            type: 1,
                            from: st,
                            to: end,
                            color: 'green',
                            label: wt
                            });
                    }
                }
            }

            console.log(edges);
            user = "0";
            src = 1;
            dst = len;

            let data ={
                nodes: vertices,
                edges: edges
            };
            graph_copy = data;
            return data;
        }
    };

    genNew.onclick = function(){
        let data = createData();
        network.setData(data);
        temptext2.innerText = 'Find least time path from: ' + cities_copy[src-1] + ' to '+ cities_copy[dst-1];
        temptext.style.display = "inline";
        temptext2.style.display = "inline";
        container2.style.display = "none";
    };
    
    solve.onclick = function () {
        // Create graph from data and set to display
        // temptext.style.display  = "none";
        // temptext2.style.display  = "none";
        container2.style.display = "inline";
        network2.setData(solveData());
    };

    function djikstra(graph, sz, src) 
    {
        let vis = Array(sz).fill(0);
        let dist = [];
        for(let i=1;i<=sz;i++)
            dist.push([10000,-1]);
        dist[src][0] = 0;

        for(let i=0;i<sz-1;i++)
        {
            let mn = -1;
            for(let j=0;j<sz;j++)
            {
                if(vis[j]===0)
                {
                    if(mn===-1 || dist[j][0]<dist[mn][0])
                        mn = j;
                }
            }

            vis[mn] = 1;
            for(let j in graph[mn])
            {
                let edge = graph[mn][j];
                if(vis[edge[0]]===0 && dist[edge[0]][0]>dist[mn][0]+edge[1])
                {
                    dist[edge[0]][0] = dist[mn][0]+edge[1];
                    dist[edge[0]][1] = mn;
                }
            }
        }
        console.log("Dijkstra Implemented!!");
        return dist;
    }

    function createGraph(data)
    {
        let graph = [];
        for(let i=1;i<=V;i++){
            graph.push([]);
        }

        for(let i=0;i<data['edges'].length;i++) 
        {
            let edge = data['edges'][i];
            if(edge['type']===1)
                continue;
            graph[edge['to']-1].push([edge['from']-1,parseInt(edge['label'])]);
            graph[edge['from']-1].push([edge['to']-1,parseInt(edge['label'])]);
        }
        return graph;
    }

    function solveData() 
    {
        console.log("Entered Solve Area!!");
        const data = graph_copy;
        console.log("Data copied");
        // Creating adjacency list matrix graph from question data
        const graph = createGraph(data);

        console.log("Graph Created!!");
        // Applying djikstra from src 
        let dist = djikstra(graph,V,src-1);
        console.log("Dijkstra Implemented!!");

        console.log(dist);
        console.log(dist[dst-1]);
        console.log(cities_copy);
        let parent = dst-1;

        // Contains Optimal Path taking only Buses
        let new_edges = [];
        while(parent!=0)
        {
            let path_length = dist[parent][0] - dist[dist[parent][1]][0];
            new_edges.push({arrows: { to: { enabled: true}}, from: dist[parent][1]+1, to: parent+1, color: 'orange',label: String(dist[parent][0]-dist[dist[parent][1]][0])});
            parent = dist[parent][1];
        }
        console.log(new_edges);

        const ans_data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return ans_data;
    }

    genNew.click();
};
