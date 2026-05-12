package com.chat.chat.controller;

import com.chat.chat.model.Mensaje;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    private final List<Mensaje> mensajes =
            new ArrayList<>();

    private int contador = 1;

    @PostMapping("/enviar")
    public Mensaje enviar(
            @RequestBody Mensaje mensaje) {

        mensaje.setId(contador++);

        mensajes.add(mensaje);

        return mensaje;
    }

    @GetMapping("/mensajes")
    public List<Mensaje> obtener(
            @RequestParam int ultimoId)
            throws Exception {

        int intentos = 20;

        while (intentos > 0) {

            List<Mensaje> nuevos =
                    new ArrayList<>();

            for (Mensaje m : mensajes) {

                if (m.getId() > ultimoId) {

                    nuevos.add(m);
                }
            }

            if (!nuevos.isEmpty()) {

                return nuevos;
            }

            Thread.sleep(1000);

            intentos--;
        }

        return List.of();
    }
}