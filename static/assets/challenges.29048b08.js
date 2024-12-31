import{m as l,C as s,h as r,T as h,d as g,M as c,a as u}from"./index.3ef452cb.js";function o(e){let a=new DOMParser().parseFromString(e,"text/html");return a.querySelectorAll('a[href*="://"]').forEach(i=>{i.setAttribute("target","_blank")}),a.documentElement.outerHTML}window.Alpine=l;l.store("challenge",{data:{view:""}});l.data("Hint",()=>({id:null,html:null,async showHint(e){if(e.target.open){let a=(await s.pages.challenge.loadHint(this.id)).data;if(a.content)this.html=o(a.html);else if(await s.pages.challenge.displayUnlock(this.id)){let i=await s.pages.challenge.loadUnlock(this.id);if(i.success){let d=(await s.pages.challenge.loadHint(this.id)).data;this.html=o(d.html)}else e.target.open=!1,s._functions.challenge.displayUnlockError(i)}else e.target.open=!1}}}));l.data("Challenge",()=>({id:null,next_id:null,submission:"",tab:null,solves:[],response:null,share_url:null,max_attempts:0,attempts:0,async init(){r()},getStyles(){let e={"modal-dialog":!0};try{switch(s.config.themeSettings.challenge_window_size){case"sm":e["modal-sm"]=!0;break;case"lg":e["modal-lg"]=!0;break;case"xl":e["modal-xl"]=!0;break;default:break}}catch(t){console.log("Error processing challenge_window_size"),console.log(t)}return e},async init(){r()},async showChallenge(){new h(this.$el).show()},async showSolves(){this.solves=await s.pages.challenge.loadSolves(this.id),this.solves.forEach(e=>(e.date=g(e.date).format("MMMM Do, h:mm:ss A"),e)),new h(this.$el).show()},getNextId(){return l.store("challenge").data.next_id},async nextChallenge(){let e=c.getOrCreateInstance("[x-ref='challengeWindow']");e._element.addEventListener("hidden.bs.modal",t=>{l.nextTick(()=>{this.$dispatch("load-challenge",this.getNextId())})},{once:!0}),e.hide()},async getShareUrl(){let e={type:"solve",challenge_id:this.id};const n=(await(await s.fetch("/api/v1/shares",{method:"POST",body:JSON.stringify(e)})).json()).data.url;this.share_url=n},copyShareUrl(){navigator.clipboard.writeText(this.share_url);let e=u.getOrCreateInstance(this.$el);e.enable(),e.show(),setTimeout(()=>{e.hide(),e.disable()},2e3)},async submitChallenge(){this.response=await s.pages.challenge.submitChallenge(this.id,this.submission),await this.renderSubmissionResponse()},async renderSubmissionResponse(){this.response.data.status==="correct"&&(this.submission=""),this.max_attempts>0&&this.response.data.status!="already_solved"&&(this.attempts+=1),this.$dispatch("load-challenges")}}));l.data("ChallengeBoard",()=>({loaded:!1,challenges:[],challenge:null,async init(){if(this.challenges=await s.pages.challenges.getChallenges(),this.loaded=!0,window.location.hash){let e=decodeURIComponent(window.location.hash.substring(1)),t=e.lastIndexOf("-");if(t>=0){let n=[e.slice(0,t),e.slice(t+1)][1];await this.loadChallenge(n)}}},getCategories(){const e=[];this.challenges.forEach(t=>{const{category:a}=t;e.includes(a)||e.push(a)});try{const t=s.config.themeSettings.challenge_category_order;if(t){const a=new Function(`return (${t})`);e.sort(a())}}catch(t){console.log("Error running challenge_category_order function"),console.log(t)}return e},getChallenges(e){let t=this.challenges;e!==null&&(t=this.challenges.filter(a=>a.category===e));try{const a=s.config.themeSettings.challenge_order;if(a){const n=new Function(`return (${a})`);t.sort(n())}}catch(a){console.log("Error running challenge_order function"),console.log(a)}return t},async loadChallenges(){this.challenges=await s.pages.challenges.getChallenges()},async loadChallenge(e){await s.pages.challenge.displayChallenge(e,t=>{t.data.view=o(t.data.view),l.store("challenge").data=t.data,l.nextTick(()=>{let a=c.getOrCreateInstance("[x-ref='challengeWindow']");a._element.addEventListener("hidden.bs.modal",n=>{history.replaceState(null,null," ")},{once:!0}),a.show(),history.replaceState(null,null,`#${t.data.name}-${e}`)})})}}));l.start();
