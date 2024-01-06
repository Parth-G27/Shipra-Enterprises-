function sendMail() {
    var params = {
      name: document.getElementById("email_name").value,
      email: document.getElementById("email_email").value,
      org: document.getElementById("email_org").value,
      num : document.getElementById("email_num").value,
      option : document.getElementById("email_language").value,
      other : document.getElementById("email_other").value,

    };
  
    const serviceID = "service_llb5tbq";
    const templateID = "template_2l60fnc";
  
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
          document.getElementById("email_name").value = "";
          document.getElementById("email_email").value = "";
          document.getElementById("email_org").value = "";
          document.getElementById("email_num").value = "";
          document.getElementById("email_language").value = "";
          document.getElementById("email_other").value = "";

          console.log(res);
          alert("Your message sent successfully!!")
  
      })
      .catch(err=>console.log(err));
  
  }