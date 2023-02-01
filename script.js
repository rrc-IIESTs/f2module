// form data
let reg_form  = document.querySelector('.register');
let form_div = document.getElementById('form');
let message = document.querySelector('.message');
let guide = document.querySelector('.guide');

let input_name = document.querySelector('#name');
let input_email = document.querySelector('#email');
let input_username = document.querySelector('#username');
let image_1 = document.getElementById('img1');
let image_2 = document.getElementById('img2');
let image_3 = document.getElementById('img3');
let image_4 = document.getElementById('img4');
let dice = document.getElementById('dice');
let img= document.getElementById('0');
let couponBox=document.querySelector('.coupon');
let coupon = document.getElementById('coupon');
let dice_url="https://media.tenor.com/IfbgWLbg_88AAAAC/dice.gif";
let diceClick=3;
let sum=0;
let retryCount=0;
let arr = [0,0,0,0,0];
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';




image_1.addEventListener('click',displayForm);
image_2.addEventListener('click',displayData);
image_3.addEventListener('click',displayDice);
image_4.addEventListener('click',displayCoupon);
reg_form.addEventListener('submit', submitData);
dice.addEventListener('click',rollDice);




function setGuide(txt,color){
guide.innerHTML=txt;
guide.style.color=color;
}
function setMessage(txt,color){
message.innerHTML=txt;
message.style.color=color;
}
function displayForm(){
    console.log("clicked");
    if(arr[1]==0){
        setGuide('Great! Now fill out the form','greenyellow')
        form_div.style.display = "block";
    }
   
}

function submitData(e){
    e.preventDefault();
    let name = input_name.value;
    let email = input_email.value;
    let username = input_username.value;
    if(name.length<1){
        message.innerHTML='Name should have atleast one character';
    }
    else if(email.indexOf('@')==-1){
        message.innerHTML= 'Email should contain @';
    }else if(username.length<1){
        message.innerHTML='Username should be atleast one character';
    }else{
    let obj = {name,email,username}
    localStorage.setItem("data",JSON.stringify(obj))
    console.log(localStorage.getItem("data"));
    input_name.value='';
    input_email.value='';
    input_username.value='';
    form_div.style.display = "none";
    setGuide('User Registered, Click on second image to get userdetails','greenyellow');
    arr[1]++;
    arr[0]++;
    }
}
function displayData(){
    if(arr[2]==0 && arr[1]!=0){
        let details = JSON.parse(localStorage.getItem('data'));
        let name = details.name;
        let username = details.username;
        console.log(name,username);
        setMessage('','greenyellow');
        document.querySelector('.data').style.display="block";
        document.querySelector('.name_disp').innerHTML=name;
        document.querySelector('.username_disp').innerHTML=username;
        setGuide('Click on third image now','greenyellow');
        arr[2]++;
        arr[0]++;
    } 
}
function displayDice(){
    data.style.display="none";
    if(arr[2]==1 && arr[3]<1){
        document.querySelector('.data').style.display="none";
        dice.style.display="block";
        img.src=dice_url;
        if(diceClick>0){
        setGuide('Click on dice to roll','greenyellow');
        setMessage('Rolls remaining = '+diceClick+'   Sum = '+sum,"greenyellow")
        dice.addEventListener('click',rollDice);
        }
    }
}
function rollDice(){
    if(diceClick>0){
    diceClick--;
    let outcome = Math.floor(Math.random()*6+1);
    sum = sum + outcome;
    console.log('Dice click= '+ diceClick);
    console.log('Sum = '+ sum);
    console.log(outcome);
    setDiceImage(outcome);
    setMessage('Rolls remaining = '+diceClick+'   Sum = '+sum,"greenyellow")
    if(diceClick==0){
        setTimeout(checkSum, 500);
    }
    }
}
function tryAgain(){
    diceClick=3;
    sum=0;
    retryCount++;
    img.src=dice_url;
    setMessage('Rolls remaining = '+diceClick+'   Sum = '+sum,"greenyellow")
    image_3.removeEventListener('click',tryAgain);
    dice.addEventListener('click',rollDice);
}
function displayCoupon(){
    if(arr[3]>0 && sum>10 && retryCount<2 &arr[4]==0){
        dice.style.display="none";
        setGuide("Congrats you've won the coupon","greenyellow");
       let winner = generateString();
       coupon.innerHTML=winner;
       couponBox.style.display="block";
       arr[4]++;
    }
}

function generateString() {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 12; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function setDiceImage(num){
    if(num==1){
        img.src='dice/dice1.png'
    }else if(num==2){
        img.src='dice/dice2.png'
    }else if(num==3){
        img.src='dice/dice3.png'
    }else if(num==4){
        img.src='dice/dice4.png'
    }else if(num==5){
        img.src='dice/dice5.png'
    }else{
        img.src='dice/dice6.png'
    }
}
function checkSum(){
    if(sum>10){
        setMessage('','greenyellow');
        setGuide("Click fourth image to get coupon","greenyellow");
        dice.style.display="none";
        arr[3]++;
    }else{
        if(retryCount==0){
            setGuide("Dice already clicked thrice and sum ("+sum+") is not greater than 10 Click image three to Try Again",'blue');
            image_3.addEventListener('click',tryAgain);
        }
        else{
            setMessage('','red');
            setGuide('Bad Luck','orangered');
            dice.style.display="none";
            arr[3]++;
        }
    }
}