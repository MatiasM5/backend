let form_prod = document.getElementById('form_prod');

let msj = document.getElementById('msj');  

let input_name = document.getElementById('input_name');
let input_price = document.getElementById('input_price');

form_prod.addEventListener('submit', (e) => {
  e.preventDefault();  
  msj.innerText = '';
  let formData = new FormData(e.target);  

  let obj = {};

  formData.forEach( (value, key) => {    
    obj[key] = value; 
  });

  obj.thumbnail = '';     

  fetch('/api/productos',{
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "Content-type":"application/json" 
    }
  }). then(res => res.json())
    .then(res => {
      if(res.status === 'OK'){
        msj.innerText = `Producto ${res.result.title.toUpperCase()} agregado con éxito`;
        input_name.value = '';
        input_price.value = '';
      }else {
        msj.innerText = res.result;
      }
    });
});


input_name.addEventListener('focus', (e) => {
  msj.innerText = '';
});
input_price.addEventListener('focus', (e) => {
  msj.innerText = '';
});