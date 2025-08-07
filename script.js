 let boxes= document.querySelectorAll(".box");
let reset=document.querySelector(".reset-btn");
let result= document.querySelector(".result");
let turno=true;

let enable=()=>{boxes.forEach((box)=>{
    box.disabled=false;
    box.innerText="";
    turno=true;
    })
    result.value=``
}

let winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turno===true){
            box.innerHTML="O";
            turno=false;
        }
        else{
            box.innerHTML="X";
            turno=true;
        }
        box.disabled=true;
        check();
        color();
        
    });
});

const check=()=>{
    for (const win of winPattern){
        let par1=boxes[win[0]].innerText;
        let par2=boxes[win[1]].innerText;
        let par3=boxes[win[2]].innerText;
        
if(par1!="",par2!="",par3!=""){
    if(par1==par2&& par2==par3){
        boxes.forEach((box)=>{
            box.disabled=true;
        });
        result.value=`Winner is ${par1}`

    }
 else{
  result.value=`Draw`
}
    
}
}
let color=()=>{boxes.forEach((box)=>{
    if(box.innerHTML=="O"){
        box.style.color="#E15634";
    } 
    if(box.innerHTML=="X"){
        box.style.color="#1B98E0";
    }
})}


reset.addEventListener("click",enable);
