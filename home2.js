const hamburger = document.querySelector(".hamburger");
const navBar    = document.querySelector(".navBar");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("active");
});











document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let msg = document.getElementById("msg");

  if(name === "" || email === "" || message === ""){
    msg.style.color = "red";
    msg.innerHTML = "Please fill all fields!";
  } else {
    msg.style.color = "green";
    msg.innerHTML = "Message sent successfully!";
  }
});











function choosePlan(plan) {
  alert("You selected: " + plan);
}


