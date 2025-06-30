const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

document.querySelectorAll('.like, .dislike').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.stopPropagation();
    const liked = btn.classList.contains('like');
    const mensagem = liked
      ? 'Você curtiu! Recomendaremos filmes/séries parecidos.'
      : 'Você não gostou! Não recomendaremos similares.';
    const popup = document.getElementById('popup');
    document.getElementById('popup-text').textContent = mensagem;
    popup.classList.remove('hidden');

    const fechar = ()=>popup.classList.add('hidden');
    popup.addEventListener('click', e=>{ if(e.target===popup) fechar(); });
    popup.querySelector('.close').addEventListener('click', fechar);
  });
});

const disco = document.getElementById("disco");
const resultadoRoleta = document.getElementById("resultadoRoleta");

const opcoes = ["Netflix", "Prime Video", "Disney+", "HBO Max", "Paramount+", "Apple TV+"];
const descontos = [10, 15, 20, 25, 30, 35]; // descontos em %

function abrirRoleta() {
  document.getElementById("roletaPopup").style.display = "block";
  resultadoRoleta.innerText = ""; // limpa resultado anterior
}

function fecharRoleta() {
  document.getElementById("roletaPopup").style.display = "none";
}

function girarRoleta() {
  const giroAleatorio = Math.floor(Math.random() * 360);
  const giroTotal = 360 * 5 + giroAleatorio; // 5 voltas + ângulo extra

  disco.style.transform = `rotate(${giroTotal}deg)`;

  setTimeout(() => {
    const anguloFinal = giroTotal % 360;
    const anguloAjustado = (360 - anguloFinal + 30) % 360;

    const indice = Math.floor(anguloAjustado / 60) % opcoes.length;

    resultadoRoleta.innerText = `Parabéns, você ganhou ${descontos[indice]}% de desconto na ${opcoes[indice]}!`;
  }, 5000); // tempo para a animação acabar
}

