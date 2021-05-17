onload = function(){
// Create new Graph
const container = document.getElementById('mynetwork');
const genNew = document.getElementById('generate-graph');

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

        const data ={
            nodes: vertices,
            edges: edges
        };
        return data;
    };

    genNew.onclick = function(){
        let data = createData();
        network.setData(data);
    };
        
    genNew.onclick();
};