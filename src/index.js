import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import BarChart from "./BarChart";
import "./index.css"
import PieChart from "./PieChart";
import { elements } from "chart.js";
import Shimmers from "./shimmers";


const newele=document.createElement('div');
newele.id='realdiv';
document.getElementById('pageContent').appendChild(newele);

const nnn=ReactDOM.createRoot(document.getElementById('realdiv'));

nnn.render(<Shimmers/>);


var json;

async function codeforcesdata() {
    const id=window.location.href;
    const a=id.split('/');

   
    const data=await fetch("https://codeforces.com/api/user.status?handle="+a[a.length-1]);
    
    json= await data.json();
 
    
}
var x=[],y=[];
var px=[],py=[];
var piecolors=[
    "DarkMagenta",
    "DarkKhaki",
   
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkGreen",
    "DarkGoldenRod",
    "DeepPink",
    "DeepSkyBlue",
    
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
  
    "ForestGreen",
    "Fuchsia",
    
    "Gold",
   
   
    "Aqua",
    "Aquamarine",
    "Azure",
   
    
    "Black",
    "BlanchedAlmond",
    "Blue",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "NavajoWhite",
    "Navy",
    
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
   
    "YellowGreen",
    "DarkGray",
    "DarkGrey",
    
    
    
    "DarkViolet"
];



    
codeforcesdata().then(()=>{

    const m=new Map();
    const problem_set=new Set();
    const m2=new Map();

    const {status,result}=json;

    for (let index = 0; index < result.length; index++) {
        const tags=result[index].problem.tags;
        
        if(result[index].verdict==="OK"  && !problem_set.has(result[index].problem.name)){

            for (let i = 0; i < tags.length; i++) {
                if(m2.get(tags[i])){
 
                    m2.set(tags[i],(m2.get(tags[i]))+1);
                }
                else{
                    m2.set(tags[i],1);
                }
                
            }

          if(m.get(parseInt(result[index].problem.rating))){
 
            m.set(parseInt(result[index].problem.rating),m.get(parseInt(result[index].problem.rating))+1);
        }
        else{
            m.set(parseInt(result[index].problem.rating),1);
        }
        problem_set.add(result[index].problem.name);

        }
        
    }
    const sorted_map=[...m.entries()].sort((a,b) => a[0] - b[0]);
    
    for(const [key,value] of sorted_map){
       
        if(key===undefined || isNaN(key)){
            
            continue;
        }
       
        x.push(key);
        y.push(value);
       
  }
  //console.log(x);
  
  
  for (const [key,value] of m2){
    //console.log(key,value);
    if(key===undefined){
        continue;
    }
    px.push(key);
    py.push(value);    
}
 

  
const Applayout=()=>{

    
    
    const [userData,setUserData]=useState({
        labels: x,
        datasets:[
           { 
            label: "",
            data: y,
            backgroundColor:piecolors,
            borderColor: "black",
        }
        ]
    });
    const [userDatap,setUserDatap]=useState({
        labels: px,
        datasets:[
           { 
            label: "",
            data: py,
            backgroundColor:piecolors,
            borderColor: "black",
        }
        ]
    });

    
    

    return  (
        <div style={{width:'700px'}}>
            <div id="barchart">
            <BarChart chartData={userData}></BarChart>

            </div>

            <div id="piechart">
            <PieChart chartData={userDatap}></PieChart>

            </div>

        </div>
    );
}

nnn.render(<Applayout/>);

}).catch(()=>{
    const Er=()=>{
        return (
            <div>
                there is some problem with API will be fixed soon!!!!!!!!!
            </div>
        )
    }
    const temperrdiv=document.createElement('div');
    temperrdiv.id='errormsg';
    document.getElementById('pageContent').appendChild(temperrdiv);

    const root=ReactDOM.createRoot(document.getElementById('errormsg'));

root.render(<Er/>)
})