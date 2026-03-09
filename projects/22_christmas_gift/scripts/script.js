window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const padoruStage = document.getElementById("padoru-stage");

let cw = window.innerWidth;
let ch = window.innerHeight;

const fireworks = [];
const particles = [];

let hue = 120;

const limiterTotal = 5;
let limiterTick = 0;

const timerTotal = 80;
let timerTick = 0;
let mousedown = false;
let mx;
let my;

canvas.width = cw;
canvas.height = ch;

const padoruImages = [
  "assets/images/padoru/aichannel-ai-chan.png",
  "assets/images/padoru/bang-dream/bang-dream-ako-udagawa.png",
  "assets/images/padoru/bang-dream/bang-dream-arisa-ichigaya.png",
  "assets/images/padoru/bang-dream/bang-dream-aya-maruyama.png",
  "assets/images/padoru/bang-dream/bang-dream-chisato-shirasagi.png",
  "assets/images/padoru/bang-dream/bang-dream-eve-wakamiya.png",
  "assets/images/padoru/bang-dream/bang-dream-hagumi-kitazawa.png",
  "assets/images/padoru/bang-dream/bang-dream-himari-uehara.png",
  "assets/images/padoru/bang-dream/bang-dream-hina-hikawa.png",
  "assets/images/padoru/bang-dream/bang-dream-kanon-matsubara.png",
  "assets/images/padoru/bang-dream/bang-dream-kaoru-seta.png",
  "assets/images/padoru/bang-dream/bang-dream-kasumi-toyama.png",
  "assets/images/padoru/bang-dream/bang-dream-kokoro-tsurumaki.png",
  "assets/images/padoru/bang-dream/bang-dream-lisa-imai.png",
  "assets/images/padoru/bang-dream/bang-dream-maya-yamato.png",
  "assets/images/padoru/bang-dream/bang-dream-misaki-okusawa.png",
  "assets/images/padoru/bang-dream/bang-dream-moca-aoba.png",
  "assets/images/padoru/bang-dream/bang-dream-ran-mitake.png",
  "assets/images/padoru/bang-dream/bang-dream-rimi-ushigome.png",
  "assets/images/padoru/bang-dream/bang-dream-rinko-shirokane.png",
  "assets/images/padoru/bang-dream/bang-dream-saaya-yamabuki.png",
  "assets/images/padoru/bang-dream/bang-dream-sayo-hikawa.png",
  "assets/images/padoru/bang-dream/bang-dream-tae-hanazono.png",
  "assets/images/padoru/bang-dream/bang-dream-tomoe-udagawa.png",
  "assets/images/padoru/bang-dream/bang-dream-tsugumi-hazawa.png",
  "assets/images/padoru/bang-dream/bang-dream-yukina-minato.png",
  "assets/images/padoru/beyond-the-horizon-mirai-kuriyama.png",
  "assets/images/padoru/blends-maika.png",
  "assets/images/padoru/bunny-girl-senpai-rio-futaba.png",
  "assets/images/padoru/cells-at-work-patelet.png",
  "assets/images/padoru/clannad-nagisa-furukawa.png",
  "assets/images/padoru/darling-in-the-franxx-zero-two.png",
  "assets/images/padoru/demon-girl-next-door-shamiko.png",
  "assets/images/padoru/demon-slayer-kanao-tsuyuri.png",
  "assets/images/padoru/demon-slayer-nezuko.png",
  "assets/images/padoru/disgaea-rozalin.png",
  "assets/images/padoru/dragon-maid-kanna.png",
  "assets/images/padoru/dragon-maid-tooru.png",
  "assets/images/padoru/emergence-saki.png",
  "assets/images/padoru/fatal-fury-mai-shiranui.png",
  "assets/images/padoru/fate-astolfo.png",
  "assets/images/padoru/fate-nero-claudius.png",
  "assets/images/padoru/fire-emblem-azura.png",
  "assets/images/padoru/fire-emblem-bernadetta.png",
  "assets/images/padoru/fire-force-maki-oze.png",
  "assets/images/padoru/fire-force-tamaki-kotatsu.png",
  "assets/images/padoru/fruits-basket-tooru-honda.png",
  "assets/images/padoru/gabriel-dropout-grabriel.png",
  "assets/images/padoru/gabriel-dropout-satania.png",
  "assets/images/padoru/gabriel-dropout-vignette.png",
  "assets/images/padoru/happy-sugar-life-matsuzaka-satou.png",
  "assets/images/padoru/hitoribocchi-sotoka-rakita.png",
  "assets/images/padoru/hitoribocchi-sunao-nako.png",
  "assets/images/padoru/hololive-amelia-watson.png",
  "assets/images/padoru/hololive-kiryu-coco.png",
  "assets/images/padoru/hololive-mio-ookami.png",
  "assets/images/padoru/hololive-rushia-uruha.png",
  "assets/images/padoru/jojos-okuyasu-nijimura.png",
  "assets/images/padoru/kaguya-sama-chika.png",
  "assets/images/padoru/kaguya-sama-kaguya.png",
  "assets/images/padoru/kill-la-kill-mako.png",
  "assets/images/padoru/kill-la-kill-ryuuko-matoi.png",
  "assets/images/padoru/kill-la-kill-satsuki-kiryuuin.png",
  "assets/images/padoru/koi-to-uso-misaki-takasaki.png",
  "assets/images/padoru/k-on-azusa.png",
  "assets/images/padoru/k-on-jun-suzuki.png",
  "assets/images/padoru/konosuba-aqua.png",
  "assets/images/padoru/konosuba-darkness.png",
  "assets/images/padoru/konosuba-kazuma.png",
  "assets/images/padoru/konosuba-megumin.png",
  "assets/images/padoru/konosuba-wiz.png",
  "assets/images/padoru/love-life-nico-yazawa.png",
  "assets/images/padoru/lucky-star-konata-izumi.png",
  "assets/images/padoru/miss-komi-is-bad-at-communication-komi-alt0.png",
  "assets/images/padoru/miss-komi-is-bad-at-communication-komi-alt1.png",
  "assets/images/padoru/my-hero-academia-toru-hagakure.png",
  "assets/images/padoru/nekopara-chocola.png",
  "assets/images/padoru/nekopara-coconut.png",
  "assets/images/padoru/nekopara-vanilla.png",
  "assets/images/padoru/nier-2b.png",
  "assets/images/padoru/okasan-online-mamako.png",
  "assets/images/padoru/other-boo.png",
  "assets/images/padoru/other-chungoru.png",
  "assets/images/padoru/other-earth-chan.png",
  "assets/images/padoru/other-gawr-gura.png",
  "assets/images/padoru/other-hh-chan.png",
  "assets/images/padoru/other-ie-chan.png",
  "assets/images/padoru/other-john-cena.png",
  "assets/images/padoru/other-nepnep.png",
  "assets/images/padoru/other-osu-mascot.png",
  "assets/images/padoru/other-rosalina.png",
  "assets/images/padoru/pet-girl-shiina-mashiro.png",
  "assets/images/padoru/pokemon-gloria.png",
  "assets/images/padoru/pokemon-marnie.png",
  "assets/images/padoru/problem-children-ryuji-sakamato.png",
  "assets/images/padoru/quintuplets-miku-nakano.png",
  "assets/images/padoru/reddit-chloe.png",
  "assets/images/padoru/reddit-sachi.png",
  "assets/images/padoru/re-zero-felix.png",
  "assets/images/padoru/re-zero-rem.png",
  "assets/images/padoru/rwby-ruby-rose.png",
  "assets/images/padoru/senko-san-senko.png",
  "assets/images/padoru/senko-san-shiro.png",
  "assets/images/padoru/shield-hero-raphtalia.png",
  "assets/images/padoru/toradora-taiga.png",
  "assets/images/padoru/tsundere-children-chizuru.png",
  "assets/images/padoru/U_Jespe-R/akame-ga-kill-akame.png",
  "assets/images/padoru/U_Jespe-R/angle-beats-kanade-tachibana.png",
  "assets/images/padoru/U_Jespe-R/angle-beats-tk.png",
  "assets/images/padoru/U_Jespe-R/angle-beats-yuri-nakamura-jesper.png",
  "assets/images/padoru/U_Jespe-R/another-misaki-mei-jesper.png",
  "assets/images/padoru/U_Jespe-R/assasination-classroom-korosensei.png",
  "assets/images/padoru/U_Jespe-R/ass-classroom-karma-akabane.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-armin-arlert-jesper.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-eren-yeager-jesper.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-erwin-smith.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-jean-kirstein.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-mikasa-ackerman-jesper.png",
  "assets/images/padoru/U_Jespe-R/attack-on-titan-sasha-blouse.png",
  "assets/images/padoru/U_Jespe-R/bakemonogatari-hachikuji-mayoi.png",
  "assets/images/padoru/U_Jespe-R/beserk-guts.png",
  "assets/images/padoru/U_Jespe-R/black-lagoon-revy.png",
  "assets/images/padoru/U_Jespe-R/blends-hideri-kanzaki-jesper.png",
  "assets/images/padoru/U_Jespe-R/blend-s-kaho-hinata.png",
  "assets/images/padoru/U_Jespe-R/blends-mafuyu-hoshikawa-jesper.png",
  "assets/images/padoru/U_Jespe-R/blends-maika-sakuranomiya-jesper.png",
  "assets/images/padoru/U_Jespe-R/bofuri-maple.png",
  "assets/images/padoru/U_Jespe-R/boku-no-hero-academia-toru-hagakure-jesper.png",
  "assets/images/padoru/U_Jespe-R/bunny-girl-senpai-mai-sakurajima.png",
  "assets/images/padoru/U_Jespe-R/cells-at-work-red-blood-cell.png",
  "assets/images/padoru/U_Jespe-R/clannad-ushio-okazaki.png",
  "assets/images/padoru/U_Jespe-R/code-geass-cc.png",
  "assets/images/padoru/U_Jespe-R/corpse-party-sachiko-shinozaki.png",
  "assets/images/padoru/U_Jespe-R/corpse-party-satoshi-mochida.png",
  "assets/images/padoru/U_Jespe-R/corpse-party--yoshiki-kishinuma.png",
  "assets/images/padoru/U_Jespe-R/corpse-party-yui-shishido.png",
  "assets/images/padoru/U_Jespe-R/corpse-party-yuka-mochida.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-angie-yonaga.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-aoi-asahina.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-chihiro-fujisaki.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-hajime-hinata.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-mikan-tsumiki.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-monokuma-jesper.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-monomi-jesper.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-mukuro-ikusaba.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-ryota-mitarai.png",
  "assets/images/padoru/U_Jespe-R/danganronpa-sonia-nevermind.png",
  "assets/images/padoru/U_Jespe-R/darling-in-the-franxx-zero-two-jesper.png",
  "assets/images/padoru/U_Jespe-R/ddlc-just-monica.png",
  "assets/images/padoru/U_Jespe-R/ddlc-natsuki.png",
  "assets/images/padoru/U_Jespe-R/ddlc-yuri.png",
  "assets/images/padoru/U_Jespe-R/ddls-sayori.png",
  "assets/images/padoru/U_Jespe-R/deadman-wonderland-ganta-igarashi.png",
  "assets/images/padoru/U_Jespe-R/deadman-wonderland-shiro.png",
  "assets/images/padoru/U_Jespe-R/death-parade-kurokami-no-onna.png",
  "assets/images/padoru/U_Jespe-R/demon-slayer-inosuke.png",
  "assets/images/padoru/U_Jespe-R/devil-may-cry-dante.png",
  "assets/images/padoru/U_Jespe-R/digimon-omegamon.png",
  "assets/images/padoru/U_Jespe-R/dorohedoro-ebisu.png",
  "assets/images/padoru/U_Jespe-R/dorohedoro-nikaido.png",
  "assets/images/padoru/U_Jespe-R/dragon-maid-kanna-kamui.png",
  "assets/images/padoru/U_Jespe-R/dragon-maid-kobayashi.png",
  "assets/images/padoru/U_Jespe-R/dragon-maid-tohru.png",
  "assets/images/padoru/U_Jespe-R/durarara-anri-sonohara.png",
  "assets/images/padoru/U_Jespe-R/durarara-izaya-orihara.png",
  "assets/images/padoru/U_Jespe-R/durarara-masaomi-kida.png",
  "assets/images/padoru/U_Jespe-R/durarara-mikado-ryuugamine.png",
  "assets/images/padoru/U_Jespe-R/engaged-to-unidentified-mashiro-mitsumine.png",
  "assets/images/padoru/U_Jespe-R/erased-airi-katagiri.png",
  "assets/images/padoru/U_Jespe-R/erased-kayo-hinazuki.png",
  "assets/images/padoru/U_Jespe-R/erased-kenya-kobayashi.png",
  "assets/images/padoru/U_Jespe-R/erased-satoru-fujinuma.png",
  "assets/images/padoru/U_Jespe-R/eromanga-sensei-sagiri-izumi.png",
  "assets/images/padoru/U_Jespe-R/evangelion-asuka-langley-sohryu.png",
  "assets/images/padoru/U_Jespe-R/evangelion-rei-ayanami.png",
  "assets/images/padoru/U_Jespe-R/evangelion-shinji-ikari.png",
  "assets/images/padoru/U_Jespe-R/fate-abigail-williams.png",
  "assets/images/padoru/U_Jespe-R/fate-arash-kamangir-archer.png",
  "assets/images/padoru/U_Jespe-R/fate-arturia-eq-saber-jester.png",
  "assets/images/padoru/U_Jespe-R/fate-astolfo-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-emiya.png",
  "assets/images/padoru/U_Jespe-R/fate-enkidu.png",
  "assets/images/padoru/U_Jespe-R/fate-gilgamesh.png",
  "assets/images/padoru/U_Jespe-R/fate-gudako.png",
  "assets/images/padoru/U_Jespe-R/fate-gudao.png",
  "assets/images/padoru/U_Jespe-R/fate-henry-jekyll-hyde.png",
  "assets/images/padoru/U_Jespe-R/fate-jack-the-ripper.png",
  "assets/images/padoru/U_Jespe-R/fate-jeanne-darc-alter.png",
  "assets/images/padoru/U_Jespe-R/fate-kirei-kotomine-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-leonardo-da-vinci.png",
  "assets/images/padoru/U_Jespe-R/fate-mashu-kyrielight-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-medb-rider-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-medusa.png",
  "assets/images/padoru/U_Jespe-R/fate-meltlilith-penguin-alt.png",
  "assets/images/padoru/U_Jespe-R/fate-meltlilith.png",
  "assets/images/padoru/U_Jespe-R/fate-mordred-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-nero-claudius-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-paul-bunyan.png",
  "assets/images/padoru/U_Jespe-R/fate-robin-hood-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-saber-alter-jesper.png",
  "assets/images/padoru/U_Jespe-R/fate-sakura-matou.png",
  "assets/images/padoru/U_Jespe-R/fate-sieg.png",
  "assets/images/padoru/U_Jespe-R/fate-souji-okita.png",
  "assets/images/padoru/U_Jespe-R/fire-force-shinra-kusakabe.png",
  "assets/images/padoru/U_Jespe-R/flying-witch-nao-ishiwatari.png",
  "assets/images/padoru/U_Jespe-R/food-wars-rindo-kobayashi.png",
  "assets/images/padoru/U_Jespe-R/fullmetal-alchemist-edward-elric.png",
  "assets/images/padoru/U_Jespe-R/fullmetal-alchemist-roy-mustang.png",
  "assets/images/padoru/U_Jespe-R/gabriel-dropout-gabriel-jesper.png",
  "assets/images/padoru/U_Jespe-R/gabriel-dropout-raphi-jesper.png",
  "assets/images/padoru/U_Jespe-R/gabriel-dropout-satania-jesper.png",
  "assets/images/padoru/U_Jespe-R/gabriel-dropout-vignette-jesper.png",
  "assets/images/padoru/U_Jespe-R/gintama-gintoki-sakata.png",
  "assets/images/padoru/U_Jespe-R/gintama-kagura.png",
  "assets/images/padoru/U_Jespe-R/gintama-tsukoyo-jesper.png",
  "assets/images/padoru/U_Jespe-R/girls-und-panzer-katyusha.png",
  "assets/images/padoru/U_Jespe-R/girls-und-panzer-mako-reizei.png",
  "assets/images/padoru/U_Jespe-R/girls-und-panzer-miho-nishizumi.png",
  "assets/images/padoru/U_Jespe-R/gleipnir-erena-aoki.png",
  "assets/images/padoru/U_Jespe-R/goblin-slayer-onna-shinkan.png",
  "assets/images/padoru/U_Jespe-R/great-pretender-abigail-jones.png",
  "assets/images/padoru/U_Jespe-R/great-pretender-cynthia-moore.png",
  "assets/images/padoru/U_Jespe-R/great-pretender-makoto-edamura.png",
  "assets/images/padoru/U_Jespe-R/guilty-crown-gai-tsutsugami.png",
  "assets/images/padoru/U_Jespe-R/guilty-crown-tsugumi.png",
  "assets/images/padoru/U_Jespe-R/gun-gale-online-llenn.png",
  "assets/images/padoru/U_Jespe-R/gurren-lagann-kamina.png",
  "assets/images/padoru/U_Jespe-R/hanako-hanako.png",
  "assets/images/padoru/U_Jespe-R/hellsig-alucard.png",
  "assets/images/padoru/U_Jespe-R/hellsing-victoria-seras.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-akeno-himejima.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-asia-argento.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-gasper-vladi.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-issei-hyoudou.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-koneko-toujou.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-rias-gremory.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-rossweisse.png",
  "assets/images/padoru/U_Jespe-R/high-school-dxd-xenovia-quarta.png",
  "assets/images/padoru/U_Jespe-R/highschool-of-the-dead-saeko-busujima.png",
  "assets/images/padoru/U_Jespe-R/highschool-of-the-dead-takashi-komuro.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-keiichi-maebara.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-mion-sonozaki.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-rena-ryuuguu.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-rika-furude.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-satoko-houjou.png",
  "assets/images/padoru/U_Jespe-R/higurashi-no-naku-koro-ni-shion-sonozaki.png",
  "assets/images/padoru/U_Jespe-R/himouto-umaru.png",
  "assets/images/padoru/U_Jespe-R/hunter-hunter-killua-zoldyck.png",
  "assets/images/padoru/U_Jespe-R/hunter-x-hunter-gon-freecss.png",
  "assets/images/padoru/U_Jespe-R/hyouka-houtarou-oreki.png",
  "assets/images/padoru/U_Jespe-R/idolmaster-mio-honda.png",
  "assets/images/padoru/U_Jespe-R/in-spectre-kotoko-iwanaga.png",
  "assets/images/padoru/U_Jespe-R/in-spectre-kurou-sakuragawa.png",
  "assets/images/padoru/U_Jespe-R/interspecies-reviewers-crimvael.png",
  "assets/images/padoru/U_Jespe-R/interspecies-reviewers-stunk.png",
  "assets/images/padoru/U_Jespe-R/interspecies-reviewers-zel.png",
  "assets/images/padoru/U_Jespe-R/jahy-sama-jahy.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-itsuki-sumeragi.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-kaede-manyuda.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-mary-saotome.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-midari-ikishima.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-ryota-suzui.png",
  "assets/images/padoru/U_Jespe-R/kakegurui-yumeko-jabami.png",
  "assets/images/padoru/U_Jespe-R/kancolle-hibiki.png",
  "assets/images/padoru/U_Jespe-R/kanojo-x-akina-orifushi.png",
  "assets/images/padoru/U_Jespe-R/kanojo-x-natsumi-orifushi.png",
  "assets/images/padoru/U_Jespe-R/k-on-azusa-nakano.png",
  "assets/images/padoru/U_Jespe-R/k-on-mio-akiyama.png",
  "assets/images/padoru/U_Jespe-R/konosuba-aqua.png",
  "assets/images/padoru/U_Jespe-R/konosuba-kazuma.png",
  "assets/images/padoru/U_Jespe-R/konosuba-megumin.png",
  "assets/images/padoru/U_Jespe-R/konosuba-vanir.png",
  "assets/images/padoru/U_Jespe-R/konosuba-wiz-jesper.png",
  "assets/images/padoru/U_Jespe-R/konosuba-yunyun.png",
  "assets/images/padoru/U_Jespe-R/k-on-ritsu-tainaka.png",
  "assets/images/padoru/U_Jespe-R/k-on-tsumugi-kotobuki.png",
  "assets/images/padoru/U_Jespe-R/k-on-yui-hirasawa.png",
  "assets/images/padoru/U_Jespe-R/kuroshitsuji-ciel-phantomhive.png",
  "assets/images/padoru/U_Jespe-R/kuroshitsuji-sebastian-michaelis.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-ai-hayasaka.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-chika-fujiwara.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-kaguya-shinomiya-jesper.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-miko-iino.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-miyuki-shirogane-jesper.png",
  "assets/images/padoru/U_Jespe-R/love-is-war-yu-ishigami.png",
  "assets/images/padoru/U_Jespe-R/love-live-nico-nico-nii.png",
  "assets/images/padoru/U_Jespe-R/made-in-abyss-prushka.png",
  "assets/images/padoru/U_Jespe-R/madoka-magica-homura-akemi.png",
  "assets/images/padoru/U_Jespe-R/madoka-magica-kyoko-sakura.png",
  "assets/images/padoru/U_Jespe-R/madoka-magica-madoka-kaname.png",
  "assets/images/padoru/U_Jespe-R/madoka-magica-mami-tomoe.png",
  "assets/images/padoru/U_Jespe-R/madoka-magica-sayaka-miki.png",
  "assets/images/padoru/U_Jespe-R/magical-senpai-assistant.png",
  "assets/images/padoru/U_Jespe-R/mahou-shoujo-site-kosame-amagai.png",
  "assets/images/padoru/U_Jespe-R/maria-holic-kanako-miyamae.png",
  "assets/images/padoru/U_Jespe-R/milfsekai-mamako-oosuki.png",
  "assets/images/padoru/U_Jespe-R/mirai-nikki-aru-akise.png",
  "assets/images/padoru/U_Jespe-R/mob-psycho-kageyama-shigeo.png",
  "assets/images/padoru/U_Jespe-R/monogatari-suruga-kanbaru.png",
  "assets/images/padoru/U_Jespe-R/monster-musume-centorea.png",
  "assets/images/padoru/U_Jespe-R/monster-musume-glenn-litbeit.png",
  "assets/images/padoru/U_Jespe-R/monster-musume-kimihito-kurusu.png",
  "assets/images/padoru/U_Jespe-R/monster-musume-miia.png",
  "assets/images/padoru/U_Jespe-R/my-teen-romantic-comedy-snafu-saika-totsuka.png",
  "assets/images/padoru/U_Jespe-R/nanatsu-no-taizai-elizabeth-liones.png",
  "assets/images/padoru/U_Jespe-R/nanbaka-nico.png",
  "assets/images/padoru/U_Jespe-R/nekopara-chocola.png",
  "assets/images/padoru/U_Jespe-R/nekopara-cinnamon.png",
  "assets/images/padoru/U_Jespe-R/nekopara-kashou-minaduki.png",
  "assets/images/padoru/U_Jespe-R/neptunia-nepgear.png",
  "assets/images/padoru/U_Jespe-R/noragami-yato.png",
  "assets/images/padoru/U_Jespe-R/one-punch-man-genos.png",
  "assets/images/padoru/U_Jespe-R/one-punch-man-saitama-jesper.png",
  "assets/images/padoru/U_Jespe-R/oreimo-kirino-kousaka.png",
  "assets/images/padoru/U_Jespe-R/other-fbi-agent-jesper.png",
  "assets/images/padoru/U_Jespe-R/other-sanic.png",
  "assets/images/padoru/U_Jespe-R/other-truck-kun.png",
  "assets/images/padoru/U_Jespe-R/overlord-albedo.png",
  "assets/images/padoru/U_Jespe-R/persona-yukiko-amagi-jesper.png",
  "assets/images/padoru/U_Jespe-R/promare-fotia-lio.png",
  "assets/images/padoru/U_Jespe-R/promare-galo.png",
  "assets/images/padoru/U_Jespe-R/rent-a-girlfriend-chizuru-ichinose.png",
  "assets/images/padoru/U_Jespe-R/rent-a-girlfriend-kazuya-kinoshita.png",
  "assets/images/padoru/U_Jespe-R/rent-a-girlfriend-mami-nanami.png",
  "assets/images/padoru/U_Jespe-R/rent-a-girlfriend-ruka-sarashina.png",
  "assets/images/padoru/U_Jespe-R/rent-a-girlfriend-sumi-sakurasawa.png",
  "assets/images/padoru/U_Jespe-R/rezero-crusch-karsten.png",
  "assets/images/padoru/U_Jespe-R/rezero-echidna.png",
  "assets/images/padoru/U_Jespe-R/re-zero-emilia.png",
  "assets/images/padoru/U_Jespe-R/rezero-otto-suewen.png",
  "assets/images/padoru/U_Jespe-R/rezero-petra-leyte.png",
  "assets/images/padoru/U_Jespe-R/re-zero-ram-jesper.png",
  "assets/images/padoru/U_Jespe-R/re-zero-rem-jesper.png",
  "assets/images/padoru/U_Jespe-R/re-zero-subaru-natsuki.png",
  "assets/images/padoru/U_Jespe-R/sao-alice-zuberg.png",
  "assets/images/padoru/U_Jespe-R/shield-hero-filo.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-black-star.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-crona.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-death-the-kid.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-elizabeth-thompson.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-evans.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-maka-albarn.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-patricia-thompson.png",
  "assets/images/padoru/U_Jespe-R/soul-eater-tsubaki-nakatsukasa.png",
  "assets/images/padoru/U_Jespe-R/space-dandy-dandy.png",
  "assets/images/padoru/U_Jespe-R/steins-gate-mayuri-shiina.png",
  "assets/images/padoru/U_Jespe-R/steins-gate-rintarou-okabe.png",
  "assets/images/padoru/U_Jespe-R/tejina-senpai-senpai-jesper.png",
  "assets/images/padoru/U_Jespe-R/the-devil-is-a-part-timer-emi-yusa.png",
  "assets/images/padoru/U_Jespe-R/the-witchs-house-ellen.png",
  "assets/images/padoru/U_Jespe-R/tokyo-ghoul-rize.png",
  "assets/images/padoru/U_Jespe-R/tokyo-ghoul-touka-kirishima.png",
  "assets/images/padoru/U_Jespe-R/tokyo-ghoul-uta.png",
  "assets/images/padoru/U_Jespe-R/toradora-ryuuji-takasu.png",
  "assets/images/padoru/U_Jespe-R/toradora-taiga-aisaka.png",
  "assets/images/padoru/U_Jespe-R/undertale-sans.png",
  "assets/images/padoru/U_Jespe-R/uzaki-chan-hana-uzaki.png",
  "assets/images/padoru/U_Jespe-R/uzaki-chan-shinichi-sakurai.png",
  "assets/images/padoru/U_Jespe-R/violet-evergarden-violet-evergarden.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-gumi.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-hatsune-miku.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-kagamine-len.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-kaito.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-luka.png",
  "assets/images/padoru/U_Jespe-R/vocaloid-meiko.png",
  "assets/images/padoru/U_Jespe-R/watamote-tomoko-kuroki.png",
  "assets/images/padoru/U_Jespe-R/youjo-senki-tanya-von-degurechaff-jesper.png",
  "assets/images/padoru/U_Jespe-R/youjo-senki-visha.png",
  "assets/images/padoru/U_Jespe-R/your-lie-in-april-kaori-miyazono.png",
  "assets/images/padoru/U_Jespe-R/yuu-yuu-hakusho-genki-jesper.png",
  "assets/images/padoru/U_Jespe-R/zombieland-saga-koutarou-tatsumi.png",
  "assets/images/padoru/U_Jespe-R/zombieland-saga-sakura-minamoto-jesper.png",
  "assets/images/padoru/Utawarerumono-kuon.png",
  "assets/images/padoru/watamote-tomoko-kuroki.png",
  "assets/images/padoru/we-never-learn-asumi-kominami.png",
  "assets/images/padoru/we-never-learn/we-never-learn-asumi-kominami.png",
  "assets/images/padoru/we-never-learn/we-never-learn-fumino-furuhashi.png",
  "assets/images/padoru/we-never-learn/we-never-learn-mafuyu-kirisu.png",
  "assets/images/padoru/we-never-learn/we-never-learn-rizu-ogata.png",
  "assets/images/padoru/we-never-learn/we-never-learn-sekijo-sawako.png",
  "assets/images/padoru/we-never-learn/we-never-learn-uruka-takemoto.png",
  "assets/images/padoru/yuru-yuri-akari-akaza.png",
];

const padoruRunners = [];
let padoruSpawnAt = 0;
let padoruStarted = false;

function randomInt(min, max) {
  return Math.floor(random(min, max + 1));
}

function pickRandomPadoruImage() {
  return padoruImages[randomInt(0, padoruImages.length - 1)];
}

function spawnPadoru() {
  if (!padoruStage) {
    return;
  }

  const padoru = document.createElement("img");
  const direction = Math.random() < 0.5 ? 1 : -1;
  const width = randomInt(85, 185);
  const maxY = Math.max(40, ch - 230);
  const y = randomInt(10, maxY);

  padoru.className = "padoru";
  padoru.id = "padoru-" + Date.now() + "-" + randomInt(1000, 9999);
  padoru.src = pickRandomPadoruImage();
  padoru.alt = "padoru";
  padoru.style.width = width + "px";

  const startX = direction === 1 ? -width - 30 : cw + 30;
  padoru.style.transform =
    "translate(" + startX + "px, " + y + "px) scaleX(" + direction + ")";

  padoruStage.appendChild(padoru);

  padoruRunners.push({
    element: padoru,
    x: startX,
    y,
    width,
    direction,
    speed: random(2.8, 6.2),
  });
}

function animatePadoru(now) {
  requestAnimFrame(animatePadoru);

  if (now >= padoruSpawnAt) {
    spawnPadoru();
    padoruSpawnAt = now + random(420, 980);
  }

  let i = padoruRunners.length;
  while (i--) {
    const runner = padoruRunners[i];
    runner.x += runner.speed * runner.direction;
    runner.element.style.transform =
      "translate(" +
      runner.x +
      "px, " +
      runner.y +
      "px) scaleX(" +
      runner.direction +
      ")";

    const passedRightEdge =
      runner.direction === 1 && runner.x > cw + runner.width + 40;
    const passedLeftEdge =
      runner.direction === -1 && runner.x < -runner.width - 40;

    if (passedRightEdge || passedLeftEdge) {
      runner.element.remove();
      padoruRunners.splice(i, 1);
    }
  }
}

function initPadoru() {
  if (padoruStarted) {
    return;
  }

  padoruStarted = true;
  padoruSpawnAt = performance.now();
  animatePadoru(padoruSpawnAt);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateDistance(p1x, p1y, p2x, p2y) {
  const xDistance = p1x - p2x;
  const yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Firework(sx, sy, tx, ty) {
  this.x = sx;
  this.y = sy;
  this.sx = sx;
  this.sy = sy;
  this.tx = tx;
  this.ty = ty;
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  this.coordinates = [];
  this.coordinateCount = 3;

  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }

  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  this.targetRadius = 1;
}

Firework.prototype.update = function (index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  if (this.targetRadius < 8) {
    this.targetRadius += 0.3;
  } else {
    this.targetRadius = 1;
  }

  this.speed *= this.acceleration;

  const vx = Math.cos(this.angle) * this.speed;
  const vy = Math.sin(this.angle) * this.speed;

  this.distanceTraveled = calculateDistance(
    this.sx,
    this.sy,
    this.x + vx,
    this.y + vy,
  );

  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    fireworks.splice(index, 1);
    return;
  }

  this.x += vx;
  this.y += vy;
};

Firework.prototype.draw = function () {
  ctx.beginPath();
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1],
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.coordinates = [];
  this.coordinateCount = 5;

  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }

  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  this.friction = 0.95;
  this.gravity = 1;
  this.hue = random(hue - 20, hue + 20);
  this.brightness = random(50, 80);
  this.alpha = 1;
  this.decay = random(0.015, 0.03);
}

Particle.prototype.update = function (index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);
  this.speed *= this.friction;
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  this.alpha -= this.decay;

  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1],
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle =
    "hsla(" +
    this.hue +
    ", 100%, " +
    this.brightness +
    "%, " +
    this.alpha +
    ")";
  ctx.stroke();
};

function createParticles(x, y) {
  let particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

function loop() {
  requestAnimFrame(loop);

  hue += 0.5;

  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "lighter";

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  i = particles.length;
  while (i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  if (timerTick >= timerTotal) {
    if (!mousedown) {
      fireworks.push(
        new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)),
      );
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  if (limiterTick >= limiterTotal) {
    if (mousedown) {
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

window.onload = function () {
  const merrywrap = document.getElementById("merrywrap");
  const box = merrywrap.getElementsByClassName("giftbox")[0];
  let step = 1;
  const stepTimes = [2000, 2000, 1000, 1000];

  function init() {
    box.addEventListener("click", openBox, false);
  }

  function stepClass(currentStep) {
    merrywrap.className = "merrywrap step-" + currentStep;
  }

  function openBox() {
    if (step === 1) {
      box.removeEventListener("click", openBox, false);
    }

    stepClass(step);

    if (step === 4) {
      reveal();
      return;
    }

    setTimeout(openBox, stepTimes[step - 1]);
    step++;
  }

  init();
};

function reveal() {
  initPadoru();
  document.querySelector(".merrywrap").style.backgroundColor = "transparent";
  loop();
}

window.addEventListener("resize", function () {
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
});

window.addEventListener("mousedown", function (event) {
  event.preventDefault();
  mousedown = true;
});

window.addEventListener("mouseup", function (event) {
  event.preventDefault();
  mousedown = false;
});

window.addEventListener("mousemove", function (event) {
  mx = event.pageX - canvas.offsetLeft;
  my = event.pageY - canvas.offsetTop;
});
