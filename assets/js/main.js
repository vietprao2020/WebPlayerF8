const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//
const headerName = $("header h2");
const cdThumb = $(".cd .cd-thumb ");
const audio = $("#audio");
const btnPlay = $(".btn-play");
const btnPause = $(".btn-pause");
const range = $("#range");
const timeDuration = $(".time-duration");
//
const app = {
    currentIndex: 3,
    isPlay: false,
    songs: [{
            name: "Ái Nộ 1",
            author: "Masew, Khôi Vũ",
            link: "../../data/music/aino.mp3",
            image: "../../data/img/aino.png",
        },
        {
            name: "Bước Qua Nhau",
            author: "Vũ",
            link: "../../data/music/buocquanhau.mp3",
            image: "../../data/img/buocquanhau.png",
        },
        {
            name: "Câu Hẹn Câu Thề",
            author: "Đình Dũng",
            link: "../../data/music/cauhencauthe.mp3",
            image: "../../data/img/cauhencauthe.png",
        },
        {
            name: "Câu Hứa Chưa Vẹn Tròn",
            author: "Phát Huy T4",
            link: "../../data/music/cauhuachuaventoan.mp3",
            image: "../../data/img/cauhuachuaventoan.png",
        },
        {
            name: "Có hẹn với thanh xuân",
            author: "Monstar",
            link: "../../data/music/cohenvoithanhxuan.mp3",
            image: "../../data/img/cohenvoithanhxuan.png",
        },
        {
            name: "Cưới thôi",
            author: "Masew, BRay, TAP",
            link: "../../data/music/cuoithoi.mp3",
            image: "../../data/img/cuoithoi.png",
        },
        {
            name: "Dịu dàng em đến",
            author: "Erik, Ninja Z",
            link: "../../data/music/diudangemden.mp3",
            image: "../../data/img/diudangemden.png",
        },
        {
            name: "Độ tộc 2",
            author: "Masew, Độ Mixi, Phúc Du, Thảo",
            link: "../../data/music/dotoc2.mp3",
            image: "../../data/img/dotoc2.png",
        },
        {
            name: "Sài Gòn đâu có lạnh",
            author: "Changg, LeWiuy",
            link: "../../data/music/saigondaucolanh.mp3",
            image: "../../data/img/saigondaucolanh.png",
        },
        {
            name: "Thê Lương",
            author: "Phúc Chính",
            link: "../../data/music/theluong.mp3",
            image: "../../data/img/theluong.png",
        },
        {
            name: "Yêu là cưới",
            author: "Phát Hồ, X2X",
            link: "../../data/music/yeulacuoi.mp3",
            image: "../../data/img/yeulacuoi.png",
        },
    ],
    render() {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song">
                        <div class="song-image" style="background-image: url('${song.image}')"></div>
                        <div class="song-infor">
                            <h2 class="song-name">${song.name}</h2>
                            <div class="song-author">${song.author}</div>
                        </div>
                        <div class="song-more">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`;
        });
        const playList = $(".play-list");
        playList.innerHTML = htmls.join("");
    },
    handleEvents() {
        const _this = this;
        const hight = $(".cd");
        const cdWidth = hight.offsetWidth;
        // xu li khi cuon trang
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrollTop;
            hight.style.maxWidth = newcdWidth > 0 ? newcdWidth + "px" : 0;
            hight.style.opacity = newcdWidth / cdWidth;
        };
        // xu li khi play
        btnPlay.onclick = () => {
            audio.play();
        };
        btnPause.onclick = () => {
            if (_this.isPlay) {
                audio.pause();
            }
        };
        //khi audio play
        audio.onplay = () => {
            btnPlay.style.display = "none";
            btnPause.style.display = "block";
            _this.isPlay = true;
        };
        // khi audio pause
        audio.onpause = () => {
            btnPause.style.display = "none";
            btnPlay.style.display = "block";
            _this.isPlay = false;
        };
        // lang nghe time của audio
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const timePercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                range.value = timePercent;
            }
        };

        // hien thi time duration
        audio.onloadedmetadata = () => {
            const minute = Math.floor(audio.duration / 60);
            const second = Math.floor(audio.duration % 60);
            timeDuration.innerHTML = `<p>${minute}:${second}</p> `;
        };
        // tua nhac
        range.oninput = (e) => {
            audio.currentTime = (e.target.value * audio.duration) / 100;
        };
    },
    dfineProperties() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex];
            },
        });
    },
    loadCurrentSong() {
        headerName.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.link;
    },
    start() {
        this.dfineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    },
};
app.start();