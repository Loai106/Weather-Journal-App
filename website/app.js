
/* Global Variables */
const baseUrl ='http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey ='&appid=4263cccf0782635b3a4a9a366a0dac51&units=metric';
let zip= document.getElementById('zip');
let feelings =document.getElementById("feelings");
console.log(feelings);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();




//getting data from open weather api


//add an event to get the data from open Weather api whenever user click generate
document.getElementById('generate').addEventListener('click',perform);

function perform(e)
{
    getData(baseUrl,zip.value,apiKey)
    .then(function (data){
        postData('/addData',{date:newDate,temp:data.list[0].main.temp ,content:feelings.value});
       
        updateUI(); 
        }

    )
    
    
}

//Get req from api
const getData =async (baseUrl,zip, apiKey)=>{

    const res = await fetch(baseUrl+zip+apiKey)
    try{
        console.log("we go it");
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(err)
    {
        console.log('error',err);
    }

}

//updating the page after got the data and send it to our server
const updateUI= async ()=>{
    const request = await fetch('/getAll');
    try{
        //convert into json
       const allData = await request.json();
       console.log(allData);
       //update the UI 
        document.getElementById('date').innerHTML= allData.date;
        document.getElementById('temp').innerHTML=allData.temp;
        document.getElementById('content').innerHTML=allData.content;
       
    }
    catch(err){
        console.log('error',err);
    }
}


//making a post request 
const postData = async (url='',data={})=>{
    console.log(data);
    const res = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }
    catch(err){
        console.log('error',err);
    }
    
}