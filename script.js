//testing 
console.log("my name is nay thu soe!");

// getting the tags what we wants 
const letterContainer = document.querySelector(".letterContainer");
const selectedGroup = document.querySelector(".selectedGroup");
const selectedTitle = document.querySelector(".selectedTitle");
const resultContainer = document.querySelector(".resultContainer");
const sambolContainer = document.querySelector(".sambolContainer");
const inputContainer = document.querySelector(".inputContainer");
const previousButton = document.querySelector(".previousButton");
const byAlpha = document.querySelector(".byalpha");
const inputText = document.querySelector(".inputText");
const inputListGroup = document.querySelector(".inputList");
const searchBtn = document.querySelector(".searchbtn");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color3 = document.querySelector(".color3");

color2.addEventListener("click",()=>{
  console.log("color")
  document.documentElement.style.setProperty("--maincolor", "rgb(201, 72, 17)");
});

color1.addEventListener("click",()=>{
  console.log("color")
  document.documentElement.style.setProperty("--maincolor", "rgb(49, 113, 203)");
});

color3.addEventListener("click",()=>{
  console.log("color")
  document.documentElement.style.setProperty("--maincolor", "green");
});


let count=1;
async function dream(){
  let response = await fetch('DreamDictionary.json');
  let data = await response.json();
  let blogHeader = data.BlogHeader;
  let blogDetail = data.BlogDetail;

  for(let i = 0; i<blogHeader.length; i++){
    letterContainer.innerHTML += `
    <div class="col-6 col-md-4 col-lg-3 border-2 box " id="${blogHeader[i].BlogAlphabet}">
      <div class="boxInner">
        <h1>${blogHeader[i].BlogAlphabet}</h1>
        <p>နှင့်စသောအိမ်မက်များ</p>
      </div>
    </div>
    `;
  }

const inputFunction = () =>{
  inputText.addEventListener("change",(even)=>{
    inputListGroup.innerHTML = '';
    let searchTEXT = even.target.value;
    console.log(searchTEXT);
    if(inputText.value === ''){
      return;
    }else{
      let filteredArray = blogDetail.filter((text)=>{
        return text.BlogContent.includes(searchTEXT);
      });
      for(let i = 0; i < filteredArray.length; i++){
        inputListGroup.innerHTML += `
        <li class="list-group-item"><div>${i+1}.</div> ${filteredArray[i].BlogContent}</li>
        `
      }
    }
  })
};

inputFunction();

searchBtn.addEventListener("click", ()=>{
  inputFunction();
})

  


inputText.addEventListener("keyup",()=>{
  if(inputText.value === ''){
    inputListGroup.innerHTML = '';
  }
})


  const alphaList = document.querySelectorAll(".box");
  alphaList.forEach((one)=>{
    one.addEventListener("click",()=>{
      count = resultContainer.id;
      resultContainer.style.display = 'block';
      inputContainer.style.display = 'none';
      sambolContainer.style.display = 'none';
      selectedTitle.textContent= `(${one.id})`;
      selectedGroup.innerHTML = " ";
      let selectedAlpha = one.id;
      addResult(selectedAlpha);
    })
  });

  function addResult(letter){
    let filteredArray = blogDetail.filter((one)=>{
      let textx = one.BlogContent;
      return textx.startsWith(letter);
    })
    
    for(let i = 0; i< filteredArray.length; i++){
      selectedGroup.innerHTML += `
      <li class="list-group-item groupItem"><div class="classs">${i+1}</div><div>${filteredArray[i].BlogContent}</div></li>
      `
    }
  }
}

previousButton.addEventListener("click",()=>{
  count -= 1;
  if(count < 0){
    count = 1;

  }
  
    document.getElementById(count).style.display = "block";
    document.getElementById(count+1).style.display = "none";
    
    if(count === 0){
      // count = 0;
      
      count =0;
      previousButton.style.display = "none";
    }else{
      document.getElementById(count-1).style.display = "none";
      
    }

    // if(count === 0){
      
    // }

   
})

byAlpha.addEventListener("click",()=>{
  previousButton.style.display = "block";
  count = 1;
  sambolContainer.style.display = "block";
  resultContainer.style.display= "none";
  inputContainer.style.display = "none";
})


dream();


