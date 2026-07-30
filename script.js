const images = {
  mf: [
    "mf1.png","mf2.png","mf3.png",
    "mf4.png","mf5.png","mf6.png",
    "mf7.png","mf8.png","mf9.png"
  ],

  mfm: [
    "mfm1.png","mfm2.png","mfm3.png",
    "mfm4.png","mfm5.png","mfm6.png",
    "mfm7.png","mfm8.png","mfm9.png"
  ],

  fmf: [
    "fmf1.png","fmf2.png","fmf3.png",
    "fmf4.png","fmf5.png","fmf6.png",
    "fmf7.png","fmf8.png","fmf9.png"
  ]
};

function showCategory(type, el){

  document.querySelectorAll(".option")
    .forEach(x => x.classList.remove("active"));

  if(el) el.classList.add("active");

  const area = document.getElementById("scratchArea");
  area.innerHTML = "";

  images[type].forEach(src => {

    const card = document.createElement("div");
    card.className = "scratch-card";

    const img = document.createElement("img");
    img.src = src;

    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 120;

    card.appendChild(img);
    card.appendChild(canvas);
    area.appendChild(card);

    makeScratch(canvas);

  });

}

function makeScratch(canvas){

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#9e9e9e";
  ctx.beginPath();
  ctx.arc(60,60,60,0,Math.PI*2);
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";

  let drawing = false;

  function scratch(x,y){
      ctx.beginPath();
      ctx.arc(x,y,15,0,Math.PI*2);
      ctx.fill();
  }

  canvas.addEventListener("mousedown",()=>drawing=true);

  canvas.addEventListener("mouseup",()=>drawing=false);

  canvas.addEventListener("mouseleave",()=>drawing=false);

  canvas.addEventListener("mousemove",(e)=>{
      if(!drawing) return;
      const r=canvas.getBoundingClientRect();
      scratch(e.clientX-r.left,e.clientY-r.top);
  });

  canvas.addEventListener("touchstart",(e)=>{
      drawing=true;
      e.preventDefault();
  });

  canvas.addEventListener("touchend",()=>{
      drawing=false;
  });

  canvas.addEventListener("touchmove",(e)=>{
      if(!drawing) return;
      e.preventDefault();

      const r=canvas.getBoundingClientRect();

      scratch(
        e.touches[0].clientX-r.left,
        e.touches[0].clientY-r.top
      );

  });

}
