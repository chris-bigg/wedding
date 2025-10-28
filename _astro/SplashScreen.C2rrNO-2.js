import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.Cd_vQiNd.js";import{O as g}from"./index.WiVy9duh.js";function x(){const[a,s]=t.useState(!0),[i,r]=t.useState(!1),[o,n]=t.useState(!1),[l,m]=t.useState(!1);return t.useEffect(()=>{const d=setTimeout(()=>{n(!0),m(!0)},3e3),c=setTimeout(()=>{r(!0)},5300),u=setTimeout(()=>{s(!1),window.dispatchEvent(new CustomEvent("splashComplete")),sessionStorage.setItem("splashCompleted","true")},6300);return()=>{clearTimeout(d),clearTimeout(c),clearTimeout(u)}},[]),a?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
				@keyframes gradient-shimmer {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				.gradient-shimmer {
					background: linear-gradient(
						-45deg,
						#FFFEF9,
						#F5EDE0,
						#E8DCC8,
						#D4C5A9,
						#C4B69A,
						#B8AA8E,
						#C4B69A,
						#D4C5A9,
						#E8DCC8,
						#F5EDE0,
						#FFFEF9
					);
					background-size: 400% 400%;
					animation: gradient-shimmer 6s ease infinite;
				}
				
				@keyframes fall-and-rotate {
					0% {
						transform: translateY(-100vh) rotate(0deg);
						opacity: 0;
					}
					10% {
						opacity: 1;
					}
					70% {
						transform: translateY(0) rotate(180deg);
					}
					75% {
						transform: translateY(-20px) rotate(185deg);
					}
					80% {
						transform: translateY(0) rotate(180deg);
					}
					85% {
						transform: translateY(-10px) rotate(182deg);
					}
					100% {
						transform: translateY(0) rotate(180deg);
					}
				}
				
				.image-flip {
					transform: scaleY(-1);
				}
				
				.falling-image {
					animation: fall-and-rotate 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}
				
				.texture-overlay {
					background-image: 
						url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E");
					background-size: 100px 100px;
					mix-blend-mode: multiply;
					opacity: 0.25;
				}
			`}),e.jsxs("div",{className:`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 gradient-shimmer ${i?"opacity-0":"opacity-100"}`,children:[e.jsx("div",{className:"absolute inset-0 texture-overlay pointer-events-none"}),e.jsx("div",{className:`w-64 h-64 md:w-96 md:h-96 relative z-10 transition-opacity duration-500 ${l?"opacity-0 pointer-events-none":"opacity-100"}`,children:e.jsx(g,{src:"/lottie/Wedding Rings.lottie",loop:!0,autoplay:!0})}),o&&e.jsx("div",{className:"w-80 h-80 md:w-[32rem] md:h-[32rem] absolute z-10 falling-image",children:e.jsx("img",{src:"/images/splash.png",alt:"Wedding splash",className:"w-full h-full object-contain drop-shadow-2xl image-flip"})})]})]}):null}export{x as default};
