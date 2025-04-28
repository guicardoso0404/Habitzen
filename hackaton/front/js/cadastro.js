const apiUrl = 'http://localhost:9823/cadastro';

// Função para cadastrar um morador
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastro-form");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const cadastro = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
            };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cadastro),
                });

                if (!response.ok) throw new Error("Erro ao cadastrar.");

                alert("Cadastrado com sucesso!");
                window.location.href = "index.html"; // Redireciona após o cadastro
            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }

    if (document.getElementById("index")) {
        carregarCadastro();
    }
});
