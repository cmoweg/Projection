var public = document.querySelector('#btn_public');
var cnt = 0;

var text = ["공개로 변경", "비공개로 변경"];

public.addEventListener("click", change_public, false);

function change_public( ){
    if(cnt%2==0){
        public.innerText=text[0];
        public.classList.replace('red', 'blue');
        alert("해당 게시글은 비공개 상태로 변경되었습니다.");
    }
    else{
        public.innerText=text[1];
        public.classList.replace('blue', 'red');
        alert("해당 게시글은 공개 상태로 변경되었습니다.");
    }
    cnt++;
}