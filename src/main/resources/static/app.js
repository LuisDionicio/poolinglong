let ultimoId = 0;

async function enviar() {

    const usuario =
        document.getElementById("usuario").value;

    const mensaje =
        document.getElementById("mensaje").value;

    if(usuario.trim() === "" ||
       mensaje.trim() === "") {

        return;
    }

    await fetch("/api/chat/enviar", {

        method: "POST",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            usuario,

            texto: mensaje
        })
    });

    document.getElementById("mensaje").value = "";
}

async function escuchar() {

    try {

        const response = await fetch(

            "/api/chat/mensajes?ultimoId=" +
            ultimoId
        );

        const mensajes =
            await response.json();

        mensajes.forEach(m => {

            ultimoId = m.id;

            document.getElementById("chat")
            .innerHTML += `

                <div class="mensaje">

                    <strong>
                        ${m.usuario}
                    </strong>

                    <br>

                    ${m.texto}

                </div>
            `;
        });

        const chat =
            document.getElementById("chat");

        chat.scrollTop =
            chat.scrollHeight;

    } catch(error) {

        console.log(error);
    }

    escuchar();
}

escuchar();