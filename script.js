const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")})},{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

document.querySelectorAll("[data-gallery]").forEach(gallery=>{
  const track=gallery.querySelector(".gallery-track");
  const slides=gallery.querySelectorAll(".gallery-slide");
  const thumbs=gallery.querySelectorAll(".gallery-thumb");
  const prev=gallery.querySelector(".gallery-prev");
  const next=gallery.querySelector(".gallery-next");
  const currentEl=gallery.querySelector(".gallery-current");
  const totalEl=gallery.querySelector(".gallery-total");
  let index=0;
  const total=slides.length;
  totalEl.textContent=total;

  function go(i){
    index=(i+total)%total;
    track.style.transform=`translateX(-${index*100}%)`;
    slides.forEach((s,si)=>s.classList.toggle("active",si===index));
    thumbs.forEach((t,ti)=>{t.classList.toggle("active",ti===index);t.setAttribute("aria-selected",ti===index)});
    currentEl.textContent=index+1;
  }

  prev.addEventListener("click",()=>go(index-1));
  next.addEventListener("click",()=>go(index+1));
  thumbs.forEach((t,i)=>t.addEventListener("click",()=>go(i)));

  let startX=0;
  track.addEventListener("touchstart",e=>{startX=e.touches[0].clientX},{passive:true});
  track.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>40)go(index+(dx>0?-1:1))},{passive:true});

  document.addEventListener("keydown",e=>{
    if(e.target.closest("[data-gallery]")!==gallery)return;
    if(e.key==="ArrowLeft")go(index-1);
    if(e.key==="ArrowRight")go(index+1);
  });
});