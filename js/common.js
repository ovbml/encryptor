for(let t of document.querySelectorAll(".footer__card-title"))t.onclick=function(){if(document.body.scrollWidth>900)return;const e=this.parentElement;this.classList.contains("_active")?(e.style.height=e.scrollHeight-2+"px",setTimeout((function(){e.style.height=t.offsetHeight+"px"}),0)):(e.style.height=e.scrollHeight+"px",setTimeout((function(){e.style.height="auto"}),300)),this.classList.toggle("_active")},t.classList.contains("_active")||(t.classList.add("_active"),t.onclick());for(let t of document.querySelectorAll("*[data-tooltip]"))t.onmousemove=function(t){const e=window.pageYOffset+document.documentElement.clientHeight,o=window.pageXOffset+document.documentElement.clientWidth;let i=Math.min(t.pageY+20,e-tooltip.scrollHeight-5),l=Math.min(t.pageX+10,o-tooltip.scrollWidth-5);tooltip.style.left=l+"px",tooltip.style.top=i+"px",tooltip.style.display="inline",tooltipText.innerText=this.dataset.tooltip},t.onmouseout=function(t){tooltip.style.display="none"};