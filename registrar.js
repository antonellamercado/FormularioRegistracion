/*****************************************************************/
/*************FUNCION PARA CREAR FORMULARIO**********************/
/*****************************************************************/
let formulario = document.getElementById('formulario');
formulario.classList.add('bg-color1');
formulario.classList.add('color3');

function crearFormulario() {

    let formBody = document.createElement('fieldset');
    formBody.innerHTML = ` 
     <legend class="formulario_legend">Completa tus datos</legend>
    
    <div class="formulario_grupo" id="grupo_nombre">
        <label for"nombre" class="formulario_label"> Nombre</label>
        <div class="formulario_grupo_input">
        <input type="text"  class="formulario_input" name="nombre" id="nombre">
        <i class="formulario_validacion_estado fas fa-times-circle"></i>
        </div>
        <p class="formulario_input_error">El nombre solo puede contener letras</p>
    </div>
   
    <div class="formulario_grupo" id="grupo_apellido">
        <label for"apellido" class="formulario_label"> Apellido</label>
        <div class="formulario_grupo_input">
        <input type="text"  class="formulario_input" name="apellido" id="apellido">
        <i class="formulario_validacion_estado fas fa-times-circle"></i>
        </div>
        <p class="formulario_input_error">El apellido solo puede contener letras</p>
    </div>
  
    <div class="formulario_grupo" id="grupo_email">
        <label for"email" class="formulario_label"> Email</label>
        <div class="formulario_grupo_input">
        <input type="email"  class="formulario_input" name="email" id="email">
        <i class="formulario_validacion_estado fas fa-times-circle"></i>
        </div>
        <p class="formulario_input_error">El email es invalido</p>
    </div>
 
    <div class="formulario_grupo" id="grupo_password">
        <label for"password" class="formulario_label">Contraseña</label>
        <div class="formulario_grupo_input">
        <input type="password"  class="formulario_input" name="password" id="password">
        <i class="formulario_validacion_estado fas fa-times-circle"></i>
        </div>
        <p class="formulario_input_error">La contraseña solo puede contener de 4 a 8 digitos</p>
    </div>
    
    <div class="formulario_grupo" id="grupo_password2">
        <label for"password2" class="formulario_label">Repetir contraseña</label>
        <div class="formulario_grupo_input">
        <input type="password"  class="formulario_input" name="password2" id="password2">
        <i class="formulario_validacion_estado fas fa-times-circle"></i>
        </div>
        <p class="formulario_input_error">Ambas contraseñas deben ser iguales</p>
    </div>

    <div class="formulario_mensaje" id="formulario_mensaje">
		<p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Por favor rellena el formulario correctamente. </p>
	</div>
<input type="submit" class="button formulario_boton  bg-color2" value="Registrarse" >

<p id="formulario_mensaje_exito" class="formulario_mensaje_exito">Se envio un email a la direccion de correo proporcionada para activar su cuenta!</p>
 `
    formBody.classList.add('fieldset');
    formulario.appendChild(formBody);

}
crearFormulario();


/**************************************************************************************************/
/******************************VALIDACIONES********************************************************/
/****************************************************************************************************/
const inputs = document.querySelectorAll('#formulario input');
let letras = /^[A-Z]+$/i; // solo Letras
let passwordv = /^.{4,8}$/; // de 4 a 8 digitos.
let email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //formato email
// Campos para la validacion  al enviar 
const camposOk = {
    nombre: false,
    apellido: false,
    email: false,
    password: false
}

// Campos para guardar el contenido de los inputs
const camposContenido = {}

//Switch para realizar la validacion todos los inputs
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(letras, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(letras, e.target, 'apellido');
            break;
        case "email":
            validarCampo(email, e.target, 'email');
            break;
        case "password":
            validarCampo(passwordv, e.target, 'password');
            validarPassword();
            break;
        case "password2":
            validarPassword();
            break;
    }
}

//Funcion para validar inputs con expresiones regulares y que no sean campos vacios
const validarCampo = (expresion, input, campo) => {
    if (input.value === "") {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');
        camposOk[campo] = false;
    } else if (!expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');
        camposOk[campo] = false;
    } else {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_${campo} label`).classList.add('formulario_label_activo');
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error_activo');
        camposOk[campo] = true;
        camposContenido[campo] = input.value;
    }
}

// Validar que la contraseña no sea vacia, sea de 8 caracteres y que ambas coincidan
const validarPassword = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value === "" || inputPassword2.value === "") {
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.add('formulario_input_error_activo');
        camposOk['password'] = false;
    } else if (inputPassword1.value.length != 8) {
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.add('formulario_input_error_activo');
        camposOk['password'] = false;

    } else if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.add('formulario_input_error_activo');
        camposOk['password'] = false;
    } else {
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_incorrecto');
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_password2 label`).classList.add('formulario_label_activo');
        document.querySelector(`#grupo_password label`).classList.add('formulario_label_activo');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.remove('formulario_input_error_activo');
        camposOk['password'] = true;
    }
}

// Recorrer inputs y llamar a funcion para validar cuando se presiona una tecla o se sale del mismo
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});



/****************************************************************************************************/
/******************************GUARDAR DATOS EN EL LOCALSTORAGE**************************************/
/****************************************************************************************************/
function guadarLS(nuevoUsuario) {
    console.log(nuevoUsuario);
    let usuarios = traerUsuariosLS();
    console.log(usuarios);
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function traerUsuariosLS() {
    let usuarios;
    if (localStorage.getItem('usuarios') === null) {
        console.log('estoy en if');
        usuarios = [];
    } else {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
        console.log('estoy en else');
    }
    return usuarios;
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (camposOk.nombre && camposOk.apellido && camposOk.email && camposOk.password) {
        guadarLS(camposContenido);
        console.log(camposContenido);
        formulario.reset();

        document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito_activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito_activo');
        }, 5000);

        document.querySelectorAll('.formulario_grupo_correcto').forEach((icono) => {
            icono.classList.remove('formulario_grupo_correcto');
        });
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje_activo');
    }
});