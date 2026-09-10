
document.addEventListener("DOMContentLoaded",()=>{
  const nav=document.getElementById("nav"), menu=document.getElementById("menu");
  if(menu) menu.onclick=()=>nav.classList.toggle("open");
  document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());

  const prog=document.getElementById("progress");
  const drawProgress=()=>{
    const h=document.documentElement;
    const max=h.scrollHeight-h.clientHeight;
    prog.style.width=(max ? (h.scrollTop/max)*100 : 0)+"%";
  };
  addEventListener("scroll",drawProgress,{passive:true}); drawProgress();

  const sections=[...document.querySelectorAll(".report-section[id]")];
  const links=[...document.querySelectorAll(".toc a")];
  if(sections.length){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+en.target.id));
        }
      });
    },{rootMargin:"-20% 0px -65% 0px",threshold:0});
    sections.forEach(s=>obs.observe(s));
  }

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")});
  },{threshold:.12});
  document.querySelectorAll(".viz,.feature,.project,.article").forEach(el=>io.observe(el));
});
