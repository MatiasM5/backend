let usuarioForm = document.getElementById("usuarioForm");
let productoFrom = document.getElementById("productoForm");

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  fetch(route, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
};

usuarioForm.addEventListener("submit", (e) =>  handleSubmit(e, e.target, "/productos"));
usuarioForm.addEventListener("submit", (e) =>  handleSubmit(e, e.target, "/productosRandom"));