/* CrownEarn Home extras: announcement, missions, weekly top earners, recent payouts */
async function homeExtras(){
 const[a,b,r]=await Promise.all([sb.from('settings').select('text_value').eq('key','announcement').single(),sb.rpc('weekly_board'),sb.rpc('recent_payouts')]);
 if(tab!=='home')return;
 const an=a.data&&a.data.text_value,e1=$('ann');if(e1&&an)e1.innerHTML=`<div class="card" style="border:2px solid var(--gold)"><b>📢 Announcement</b><div>${esc(an)}</div></div>`;
 const bd=b.data||{},top=bd.top||[],me=bd.me,pay=Array.isArray(r.data)?r.data:[],hx=$('hx');if(!hx)return;
 const medal=i=>['🥇','🥈','🥉'][i]||(i+1)+'.';
 const done=D.subs.filter(s=>s.user_id===U.id&&s.status==='approved').length,mine=D.tasks.filter(t=>t.owner===U.id).length;
 const M=[['🌱','Complete your first task',done,1],['⭐','Complete 5 tasks',done,5],['🔥','Keep a 3-day streak',P.streak,3],['🤝','Invite a friend',D.refs.length,1],['📣','Give your first task',mine,1],['💸','Make your first withdrawal',D.wds.length,1]];
 const open=M.filter(m=>m[2]<m[3]).slice(0,3),st=P.streak,BG=[['🌱','First task',done>=1],['🔥','3-day streak',st>=3],['💸','First withdrawal',D.wds.length>=1],['🏆','Gold member',done>=3]],lv=1+Math.floor((done*100+st*20)/200);
 hx.innerHTML=`<div class="sec">Missions</div>${open.map(m=>`<div class="card"><div class="row"><span>${m[0]} ${m[1]}</span><span class="tag">${Math.min(m[2],m[3])}/${m[3]}</span></div><div class="pb" style="background:var(--soft);height:10px"><i style="width:${Math.min(100,m[2]/m[3]*100)}%"></i></div></div>`).join('')||'<div class="card mute">All missions complete. Well done! 🎉</div>'}
<div class="sec">Top earners this week 🏆</div><div class="card">${top.length?top.map((t,i)=>`<div class="row" style="${t.me?'font-weight:700':''}"><span>${medal(i)} ${esc(t.name)}${t.me?' (you)':''}</span><span class="mute">${t.pts} pts</span></div>`).join(''):'<div class="mute">No one yet. Complete a task to be first!</div>'}${me&&!top.some(t=>t.me)?`<div class="mute" style="margin-top:6px">You: #${me.rank} · ${me.pts} pts</div>`:''}</div>
<div class="sec">My badges · Level ${lv}</div><div class="card"><div class="bd">${BG.map(b=>`<div class="${b[2]?'on':''}"><span>${b[0]}</span>${b[1]}</div>`).join('')}</div></div>
${pay.length?`<div class="sec">Recent payouts ✅</div>${pay.map(p=>`<div class="card row"><span>${esc(p.name)}</span><span class="rw">PKR ${p.amt} paid</span></div>`).join('')}`:''}`}
