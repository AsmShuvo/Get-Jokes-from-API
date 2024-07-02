
let tags = '';
let f=0;
let blockedText='';
let searchString ='';

const createJokes = async(tags)=>{
    console.log(searchString);
    const url = `https://v2.jokeapi.dev/joke/${tags}${blockedText=="?blacklistFlags=" ? "":blockedText}${searchString}`;
    console.log(url);
    const res = await fetch(url);
    const data =await res.json();
    console.log("tags: "+tags);
    
    const type = data.type;
    // console.log(data);
    // console.log(data.type);
    let joke = ``;
    if(type == "single"){
         joke = data.joke;
        console.log(joke);
    }
    else{
        const setup = data.setup;
        const delivery = data.delivery;
         joke = 
        `
        ${setup}
        ${delivery}
        `
        console.log(joke);
    }
    const jokesContainer = document.getElementById('jokes-container');
    jokesContainer.innerText = joke;

}

const generateJokes = ()=>{
    if(tags==''){
        createJokes("Any")
    }
    else
        createJokes(tags);
}

const tagsList = [];
const AddTag = (checkbox, tag) => {
    if (checkbox.checked) {
        if(!tagsList.includes(tag)){
            tagsList.push(tag);
        }
    } 
    else{
        if(tagsList.includes(tag)){
            const index = tagsList.indexOf(tag);
            if(index!== -1){
                tagsList.splice(index,1);
            }
        }
    }
    if(tagsList.length>=0){
        tags='';
    }
    for(let i=0; i<tagsList.length; i++){
        tags+=tagsList[i];
        if(i!=tagsList.length-1){
            tags+=',';
        }
    }
    console.log(tags);
};


const blockList = [];
const blockTags = (checkbox, tag)=>{
// https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist
    if(checkbox.checked){
        if(!blockList.includes(tag)){
            blockList.push(tag);
        }
    }
    else{
        // console.log("else called");
        
        if(blockList.includes(tag)){
            const index = blockList.indexOf(tag);
            // console.log(index);
            if (index !== -1) {
                blockList.splice(index, 1); // Remove tag from blockList array
            }
        }
        // console.log(blockList.length);
    }
    if(blockList.length>=0){
        blockedText='';
        blockedText+="?blacklistFlags=";
    }
    for(let i=0; i<blockList.length; i++){
        blockedText+=blockList[i];
        if(i!=blockList.length-1)
        {
            blockedText+=",";
        }
    }
    
    console.log(blockedText);
    
}


const addStringToLink = ()=>{
    // console.log("String adding");
    const input = document.getElementById('input-field');
    const inputtext = input.value ;
    // console.log(inputtext);
    
    searchString=inputtext;
}



