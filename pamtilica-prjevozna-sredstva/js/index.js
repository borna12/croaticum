

// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen
$("footer").hide();
var razina = 1;
var broj_karata = 3;

$(".prometna").click(function () {
	$(".modal").html("<h2 class='winner'>Pamtilica za prometna vozila</h2><br><p style='text-align:center'>odaberite broj parova</p><button id='prva'>4</button> <button id='druga'>8</button><button id='treca'>12</button><p style='text-align: center;font-size: 1.5rem;'> <a href='../index.html' style='text-decoration: none;'>vrati se ↩</a></p>	");
	$("#prva").click(function () {
		razina = "1";
		igra()
	})
	$("#druga").click(function () {
		razina = "2";
		igra();
		$(".front span").css({ "font-size": "40px" }); $(".card .front").css({ "padding": "10px" })
	})
	$("#treca").click(function () {
		razina = "3";
		igra();
		$(".front span").css({ "font-size": "40px" }); $(".card .front").css({ "padding": "10px" })
	})

	function igra() {
		if (razina == 1) {
			broj_karata = 4;

		} else if (razina == 2) {
			broj_karata = 8;
		} else {
			broj_karata = 12
		}
		$("footer").fadeIn(1000);
		$(".modal").fadeOut(1000);
		$(".modal-overlay").delay(1000).slideUp(1000);
		$(".game").show("slow");
		$("#okretanje")[0].play();
		//localStorage.clear();
		var br = 1;
		var sec = 0;
		var pokusaj = 0;
		var vrijeme = 1;
		var bodovi = 0;

		var najbolje_vrijeme;
		var najmanji_broj_pokusaja;
		var karte;


		function pad(val) {
			return val > 9 ? val : "0" + val;
		}
		setInterval(function () {
			if (vrijeme == 1) {
				$("#seconds").html(pad(++sec % 60));
				$("#minutes").html(pad(parseInt(sec / 60, 10)));
			}
		}, 1000);

		var Memory = {
			init: function (cards) {
				this.$game = $(".game");
				this.$modal = $(".modal");
				this.$overlay = $(".modal-overlay");
				this.$zivotinje = $(".zivotinje");
				this.$ljudi = $(".ljudi");
				this.cardsArray = $.merge(cards, cards);
				this.shuffleCards(this.cardsArray);
				this.setup();
			},

			shuffleCards: function (cardsArray) {
				this.$cards = $(this.shuffle(this.cardsArray));
			},

			setup: function () {
				this.html = this.buildHTML();
				this.$game.html(this.html);
				this.$memoryCards = $(".card");
				this.binding();
				this.paused = false;
				this.guess = null;
				this.$cards = $(this.shuffle(this.cardsArray));
			},

			binding: function () {
				this.$memoryCards.on("click", this.cardClicked);
				this.$zivotinje.on("click", $.proxy(this.reset, this));
			},
			// kinda messy but hey
			cardClicked: function () {
				$("#okret")[0].play();

				var _ = Memory;
				var $card = $(this);
				if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
					$card.find(".inside").addClass("picked");
					if (!_.guess) {
						_.guess = $(this).attr("data-id");
						$(this).find('p').toggle();
					} else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
						$(".picked").addClass("matched");
						$("#tocno")[0].play();
						bodovi = bodovi + 15;
						_.guess = null;
						$(".matched").find('p').remove();
						pokusaj++;
						vrijeme = 0;
						swal({
							title: $(this).attr("data-ime"),
							html: '<img src="' + $(this).attr("data-slika") + '" class="ikone"/><br><p style="text-align:justify; font-size:18px">'+$(this).attr("data-definicija")+'</p>',
							showCloseButton: false,
							allowOutsideClick: false,
							confirmButtonText: 'dalje',
							confirmButtonColor: "rgb(104, 0, 2)",
						});
						$('.swal2-confirm').click(function () {
							vrijeme = 1;
						});
					} else {
						pokusaj++;
						$(this).find('p').toggle();
						_.guess = null;
						_.paused = true;
						setTimeout(function () {
							$(".picked").removeClass("picked");
							Memory.paused = false;
							$(".brojevi").show();
							bodovi = bodovi - 5
						}, 1200);
					}
					if ($(".matched").length == $(".card").length) {
						_.win();
					}
				}
			},

			win: function () {
				this.paused = true;
				setTimeout(function () {
					Memory.showModal();
					Memory.$game.fadeOut();
				}, 1000);
			},

			showModal: function () {
				var minute = Math.floor(sec / 60);
				var sekunde = sec - minute * 60;
				this.$overlay.show();
				this.$modal.fadeIn("slow");
				var najvrijeme = localStorage.getItem('najvrijeme');

				if (najvrijeme === undefined || najvrijeme === null) {
					najvrijeme = sec;
					localStorage.setItem('najvrijeme', sec);
				}

				// If the user has more points than the currently stored high score then
				if (sec < najvrijeme) {
					// Set the high score to the users' current points
					najvrijeme = sec;
					// Store the high score
					localStorage.setItem('najvrijeme', sec);
				}
				// Return the high score

				var najpokusaji = localStorage.getItem('najpokusaji');

				if (najpokusaji === undefined || najpokusaji === null) {
					najpokusaji = pokusaj;
					localStorage.setItem('najpokusaji', pokusaj);
				}
				// If the user has more points than the currently stored high score then
				if (pokusaj < najpokusaji) {
					// Set the high score to the users' current points
					najpokusaji = pokusaj;
					// Store the high score
					localStorage.setItem('najpokusaji', pokusaj);
				}
				var naj_minute = Math.floor(najvrijeme / 60);
				var naj_sekunde = najvrijeme - naj_minute * 60;
				$(".modal").show();
				$(".modal-overlay").show();
				$(".winner").hide();
				bodovi = bodovi - sec
				$(".modal").html("<div class='winner'>Bravo!</div><div class='time'><br>broj pokušaja: " + pokusaj + "</br>vrijeme igre: " + minute + ":" + sekunde + "</br><p><form id='input-form' required action='' method='POST' target='no-target'><br><select id='ikona' style='height:30px'></select><label for='ime'> Ime: </label><input style='height:30px' id='input-q1' name='q1'><br> <label for='bodovi'>Bodovi: </label><input id='input-q2' placeholder='q2' name='q2' value='" + bodovi + "' disabled style='display:none'> <label for='bodovi'>" + bodovi + "</label><br><button id='form-submit' type='submit'>predaj rezultat</button> </form>    <iframe src='#' id='no-target' name='no-target' style='visibility:hidden;display:none'></iframe><br><a href='index.html' style='color:black;'>nova igra</a></p></div>");

				var target = document.getElementById("ikona");
				var emojiCount = emoji.length;

				for (var index = 0; index < emojiCount; index++) {
					addEmoji(emoji[index]);
				}

				function addEmoji(code) {
					var option = document.createElement('option');
					option.innerHTML = code;
					option.value = code;
					target.appendChild(option);
				}
				if (localStorage.getItem("ime") != null) {
					$('#input-q1').val(localStorage.getItem("ime"))
					$('#ikona').val(localStorage.getItem("ikona"))
				}
				if (razina == 1) {
					$('#input-form').one('submit', function () {
						$(this).fadeOut(300)
						localStorage.setItem("ikona", $('#ikona').val())
						localStorage.setItem('pokrenuto', "da")
						localStorage.setItem("ime", $('#input-q1').val())
						var inputq1 = encodeURIComponent($("#ikona").val() + $('#input-q1').val());
						var inputq2 = encodeURIComponent($('#input-q2').val());
						var q1ID = "entry.412821582";
						var q2ID = "entry.902512960";
						var baseURL =
							'https://docs.google.com/forms/d/e/1FAIpQLSdtbDShWXAE8UMScqkwKrpnJWjOM5d56GRdjsLghb2yMogAww/formResponse?';
						var submitRef = '&submit=970054585833720596';
						var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
						console.log(submitURL);
						$(this)[0].action = submitURL;
						setTimeout(
							function () {
								window.location.href = 'rez1.html';
							}, 1000);
					});
				} else if (razina == 2) {
					$('#input-form').one('submit', function () {
						$(this).fadeOut(300)
						localStorage.setItem("ikona", $('#ikona').val())
						localStorage.setItem('pokrenuto', "da")
						localStorage.setItem("ime", $('#input-q1').val())
						var inputq1 = encodeURIComponent($("#ikona").val() + $('#input-q1').val());
						var inputq2 = encodeURIComponent($('#input-q2').val());
						var q1ID = "entry.412821582";
						var q2ID = "entry.902512960";

						var baseURL =
							'https://docs.google.com/forms/d/e/1FAIpQLScIK9Hck-c6mrGqmNP1tcvHBXC6DNq88ZKySVByYqfCdV2Jvg/formResponse?';
						var submitRef = '&submit=970054585833720596';
						var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
						console.log(submitURL);
						$(this)[0].action = submitURL;
						setTimeout(
							function () {
								window.location.href = 'rez2.html';
							}, 1000);
					});
				} else {
					$('#input-form').one('submit', function () {
						$(this).fadeOut(300)
						localStorage.setItem("ikona", $('#ikona').val())
						localStorage.setItem('pokrenuto', "da")
						localStorage.setItem("ime", $('#input-q1').val())
						var inputq1 = encodeURIComponent($("#ikona").val() + $('#input-q1').val());
						var inputq2 = encodeURIComponent($('#input-q2').val());
						var q1ID = "entry.412821582";
						var q2ID = "entry.902512960";

						var baseURL =
							'https://docs.google.com/forms/d/e/1FAIpQLSfi2885cWmAGSWDADocDF6A6Uebj-ZgI8rCd__EiPdvP8oQkQ/formResponse?';
						var submitRef = '&submit=970054585833720596';
						var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
						console.log(submitURL);
						$(this)[0].action = submitURL;
						setTimeout(
							function () {
								window.location.href = 'rez3.html';
							}, 1000);
					});
				}
			},

			hideModal: function () {
				this.$overlay.hide();
				this.$modal.hide();
			},

			reset: function () {
				this.hideModal();
				this.shuffleCards(this.cardsArray);
				this.setup();
				this.$game.show("slow");
				pokusaj = 0;
				sec = 0;
				br = 1;
				$(".back").addClass("pozadina-vozila");
			},

			// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
			shuffle: function (array) {
				var counter = array.length,
					temp, index;
				// While there are elements in the array
				while (counter > 0) {
					// Pick a random index
					index = Math.floor(Math.random() * counter);
					// Decrease counter by 1
					counter--;
					// And swap the last element with it
					temp = array[counter];
					array[counter] = array[index];
					array[index] = temp;
				}
				return array;
			},

			buildHTML: function () {
				var frag = '';
				br = 1;
				var lista_slika = [];
				var lista_imena = [];
				this.$cards.each(function (k, v) {
					if (Math.floor((Math.random() * 2) + 1) == 1) {
						if ($.inArray(v.name, lista_imena) == -1) {
							frag += '<div class="card" data-id="' + v.id + '" data-ime="'+v.name+'" data-slika="'+v.img+'" data-definicija="'+v.definicija+'"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
							if (br < cards.length) {
								br++;
							};
							lista_imena.push(v.name);
						} else {
							frag += '<div class="card" data-id="' + v.id + '" data-ime="'+v.name+'" data-slika="'+v.img+'" data-definicija="'+v.definicija+'"><div class="inside">\
				<div class="front"><span>' + v.name + '</span></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
							if (br < cards.length) {
								br++;
							};
							lista_slika.push(v.img);
						}
					} else {
						if ($.inArray(v.img, lista_slika) == -1) {
							frag += '<div class="card" data-id="' + v.id + '" data-ime="'+v.name+'" data-slika="'+v.img+'" data-definicija="'+v.definicija+'"><div class="inside">\
				<div class="front"><span>' + v.name + '</span></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
							if (br < cards.length) {
								br++;
							};
							lista_slika.push(v.img);
						} else {
							frag += '<div class="card" data-id="' + v.id + '" data-ime="'+v.name+'" data-slika="'+v.img+'" data-definicija="'+v.definicija+'"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
							if (br < cards.length) {
								br++;
							};
							lista_imena.push(v.name);
						}
					}
				});
				return frag;
			}
		};

		var cards = [{
			name: "autobus",
			img: "slike/prometna_sredstva/autobus.jpg",
			id: 1,
			definicija: "Autobus je motorno vozilo s kotačima za plaćeni prijevoz većega broja putnika."
		}, {
			name: "automobil",
			img: "slike/prometna_sredstva/automobil.jpg",
			id: 2,
			definicija: "Automobil je motorno vozilo na četiri kotača kojim se ljudi najčešće voze."
		}, {
			name: "balon",
			img: "slike/prometna_sredstva/balon.jpg",
			id: 3,
			definicija: "Balon je letjelica napunjena zagrijanim zrakom ili plinom lakšim od zraka."
		}, {
			name: "bicikl",
			img: "slike/prometna_sredstva/bicikl.jpg",
			id: 4,
			definicija: "Bicikl je vozilo na dva kotača koje pokreće čovjek s pomoću pedala."
		}, {
			name: "brod",
			img: "slike/prometna_sredstva/brod.jpg",
			id: 5,
			definicija: "Brod je prijevozno sredstvo za prijevoz putnika i tereta morskim putem."
		}, {
			name: "čamac",
			img: "slike/prometna_sredstva/camac.jpg",
			id: 6,
			definicija: "Čamac je plovilo koje je manje od broda."
		}, {
			name: "helikopter",
			img: "slike/prometna_sredstva/helikopter.jpg",
			id: 7,
			definicija: "Helikopter je letjelica za prijevoz ljudi i tereta koja na krovu i na repu ima propeler."
		}, {
			name: "kamion",
			img: "slike/prometna_sredstva/kamion.jpg",
			id: 8,
			definicija: "Kamion je cestovno vozilo za prijevoz većih tereta."
		}, {
			name: "motor",
			img: "slike/prometna_sredstva/motor.jpg",
			id: 9,
			definicija: "Motor je cestovno vozilo koje ima dva kotača."
		},  {
			name: "traktor",
			img: "slike/prometna_sredstva/traktor.jpg",
			id: 11,
			definicija: "Traktor je vozilo koje služi za vuču poljoprivrednih strojeva i oruđa."
		}, {
			name: "tramvaj",
			img: "slike/prometna_sredstva/tramvaj.jpg",
			id: 12,
			definicija: "Tramvaj je vozilo koje prevozi velik broj putnika u gradu i kreće se po tračnicama."
		}, {
			name: "vlak",
			img: "slike/prometna_sredstva/vlak.jpg",
			id: 13,
			definicija: "Vlak je vozilo koje se sastoji od lokomotive i vagona i koje se kreće po tračnicama."
		}, {
			name: "željeznica",
			img: "slike/prometna_sredstva/zeljeznica.jpg",
			id: 14,
			definicija: "Željeznica je sustav javnoga prometa koji se odvija vlakom."
		}, {
			name: "zrakoplov",
			img: "slike/prometna_sredstva/zrakoplov.jpg",
			id: 15,
			definicija: "Zrakoplov je letjelica za prijevoz ljudi i tereta."
		}, {
			name: "kombi",
			img: "slike/prometna_sredstva/kombi.jpg",
			id: 16,
			definicija: "Kombi je vozilo veće od automobila, a manje od kamiona koje je predviđeno za prijevoz više putnika ili tereta."
		}, {
			name: "romobil",
			img: "slike/prometna_sredstva/romobil.jpg",
			id: 17,
			definicija: "Romobil je vozilo koje ima dva ili tri kotača, a pokreće se snagom jedne noge ili električnim motorom."
		}, {
			name: "role",
			img: "slike/prometna_sredstva/role.jpg",
			id: 18,
			definicija: "Role su obuća s kotačima."
		}, {
			name: "žičara",
			img: "slike/prometna_sredstva/zicara.jpg",
			id: 19,
			definicija: "Žičara je sustav za prijevoz koji se obično nalazi na uzbrdici i u kojemu se kabine za prijevoz ljudi ili tereta kreću po napetoj žici."
		}]

		function shuffle(array) {
			var currentIndex = array.length,
				temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

		cards = shuffle(cards);

		cards = cards.slice(0, broj_karata);

		Memory.init(cards);


		if (razina == 1) {
			$(".card").css({
				"width": "25%",
				"height": "50%"
			})
		} else if (razina == 2) {
			$(".card").css({
				"width": "25%",
				"height": "25%"
			})
		} else if (razina == 3) {
			$(".card").css({
				"width": "16.66666%",
				"height": "25%"
			})
		}

		$(".back").addClass("pozadina-vozila");
	}
});

$(".prometna").click()