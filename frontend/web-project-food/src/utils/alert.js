import Swal from "sweetalert2";

let footer = "";
function showAlert(props) {
    if(props.link){
        footer = `<a href="${props.link}">${props.footer}</a>`;
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: props.text,
      footer: footer,
    });
  }
  
export default showAlert;