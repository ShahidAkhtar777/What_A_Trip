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
            V = len;
            let vertices = [];

            for(let i=1;i<=len;i++){
                vertices.push({id:i, label: cities[i-1]})
            }

            console.log(vertices);
            // Prepares vis.js style nodes for our data
            // vertices = new vis.DataSet(vertices);
            
            // Adding bus(orange) edges in edges[]
            let e = document.getElementById('e').innerText;

            var ed = e.split("-");
            var ln = ed.length;
            
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

            let pl_ed = pl.split("-");
            let p_ln = pl_ed.length;
            
            console.log(pl_ed);

            for(var i=0;i<p_ln;i++)
            {
                let edge = pl_ed[i];
                let len2 = edge.length;
                let sub_str = edge.substr(1, len2-2);
                let edge_data = sub_str.split(",");

                let st = cities.indexOf(edge_data[0])+1;
                let end = cities.indexOf(edge_data[1])+1;
                let wt = edge_data[2];

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
            console.log(edge);
            if(edge['type']===1)
                continue;

            console.log(edge['to']-1);
            console.log(edge['from']-1);

            graph[edge['to']-1].push([edge['from']-1,parseInt(edge['label'])]);
            graph[edge['from']-1].push([edge['to']-1,parseInt(edge['label'])]);

        }
        return graph;
    }

    function shouldTakePlane(edges, dist1, dist2, mn_dist) {
        let plane = 0;
        let p1=-1, p2=-1;
        for(let pos in edges){
            let edge = edges[pos];
            if(edge['type']===1){
                let to = edge['to']-1;
                let from = edge['from']-1;
                let wght = parseInt(edge['label']);
                if(dist1[to][0]+wght+dist2[from][0] < mn_dist){
                    plane = wght;
                    p1 = to;
                    p2 = from;
                    mn_dist = dist1[to][0]+wght+dist2[from][0];
                }
                if(dist2[to][0]+wght+dist1[from][0] < mn_dist){
                    plane = wght;
                    p2 = to;
                    p1 = from;
                    mn_dist = dist2[to][0]+wght+dist1[from][0];
                }
            }
        }
        return {plane, p1, p2};
    }

    function solveData() 
    {
        const data = graph_copy;
        // Creating adjacency list matrix graph from question data
        const graph = createGraph(data);

        // Applying djikstra from src and dst
        let dist1 = djikstra(graph,V,src-1);
        let dist2 = djikstra(graph,V,dst-1);

         // Initialise min_dist to min distance via bus from src to dst
         let mn_dist = dist1[dst-1][0];

        // See if plane should be used
        let {plane, p1, p2} = shouldTakePlane(data['edges'], dist1, dist2, mn_dist);

        let new_edges = [];
        if(plane!==0)
        {
            new_edges.push({arrows: { to: { enabled: true}}, from: p1+1, to: p2+1, color: 'green',label: String(plane)});
            // Using spread operator to push elements of result of pushEdges to new_edges
            new_edges.push(...pushEdges(dist1, p1, false));
            new_edges.push(...pushEdges(dist2, p2, true));
        }else{
            new_edges.push(...pushEdges(dist1, dst-1, false));
        }
        const ans_data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return ans_data;
    }

    function pushEdges(dist, curr, reverse) 
    {
        let tmp_edges = [];
        while(dist[curr][0]!==0){
            let fm = dist[curr][1];
            if(reverse)
                tmp_edges.push({arrows: { to: { enabled: true}},from: curr+1, to: fm+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
            else
                tmp_edges.push({arrows: { to: { enabled: true}},from: fm+1, to: curr+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
            curr = fm;
        }
        return tmp_edges;
    }

    genNew.click();
};
