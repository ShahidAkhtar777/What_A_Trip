onload = function(){
// Create new Graph
const container = document.getElementById('mynetwork');
const genNew = document.getElementById('generate-graph');
var user = document.getElementById('u').innerText;
console.log(user+typeof(user));

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
    //initialising network
    const network = new vis.Network(container);
    network.setOptions(options);

    function createData()
    {    
        if(user === "0")
        {
            const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];
            const V = Math.floor(Math.random() * cities.length) + 3; // for creating V is >= 3 
            
            let vertices = [];
            for(let i=1;i<V;i++){
                vertices.push({id:i, label: cities[i-1]})
            }

            let edges = [];
            for(let i=1;i<V;i++){
                let neigh = Math.floor(Math.random()*i); 
                edges.push({from: i, to: neigh, color: 'orange',label: String(Math.floor(Math.random()*70)+30)});
            }

            let data ={
                nodes: vertices,
                edges: edges
            };
            return data;
        }
        else
        {
            let v = document.getElementById('v').innerText;
            let res = v.split(",");
            
            const cities = res;
            let len = cities.length;
            let vertices = [];

            for(let i=1;i<=len;i++){
                vertices.push({id:i, label: cities[i-1]})
            }

            console.log(vertices);

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

                console.log(edge_data);
                let st = cities.indexOf(edge_data[0])+1;
                console.log("Start: "+st);
                let end = cities.indexOf(edge_data[1])+1;
                console.log("End: "+end);
                let wt = edge_data[2];
                console.log("Weight: "+wt);

                edges.push({from: st,to: end,color: 'orange', label: String(wt)});
            }

            user = "0";

            let data ={
                nodes: vertices,
                edges: edges
            };
            return data;
        }
    };

    genNew.onclick = function(){
        let data = createData();
        network.setData(data);
    };
        
    genNew.click();
   
};
