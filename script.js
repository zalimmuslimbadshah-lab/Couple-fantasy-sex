const images = {
  mf: [
    "image/mf1.png","image/mf2.png","image/mf3.png",
    "image/mf4.png","image/mf5.png","image/mf6.png",
    "image/mf7.png","image/mf8.png","image/mf9.png"
  ],

  mfm: [
    "image/mfm1.png","image/mfm2.png","image/mfm3.png",
    "image/mfm4.png","image/mfm5.png","image/mfm6.png",
    "image/mfm7.png","image/mfm8.png","image/mfm9.png"
  ],

  fmf: [
    "image/fmf1.png","image/fmf2.png","image/fmf3.png",
    "image/fmf4.png","image/fmf5.png","image/fmf6.png",
    "image/fmf7.png","image/fmf8.png","image/fmf9.png"
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
