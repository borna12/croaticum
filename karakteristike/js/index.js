$(function() {
    brojPitanja = 0;
    questionBank = new Array();
    pitanja = new Array();
    bodovi = 0;
    krivi_odgovori = new Array();
    vrijeme = 0;

    function shuffle(array) { //izmješaj pitanja
        var i = 0,
            j = 0,
            temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    function ProgressCountdown(timeleft, bar, text) {
        return new Promise((resolve, reject) => {
            countdownTimer = setInterval(() => {
                timeleft--;
                document.getElementById(bar).value = timeleft;
                document.getElementById(text).textContent = timeleft;
                if (timeleft <= 0) {
                    clearInterval(countdownTimer);
                    resolve(true);
                } else if (timeleft <= 1) {
                    $("#sekunde").html("sekunda")
                    $("#ostalo").html("ostala")
                } else if (timeleft <= 4) {
                    $("#sekunde").html("sekunde")
                }
            }, 1000);
        });
    }

    function provjeri() {
        clearInterval(countdownTimer);
        if ($('#left').find('.k1').length == 0 && $('#left').find('.k3').length == 0 && $('#left').find('.k4').length == 0 
        && $('#middle-l').find('.k2').length == 0 && $('#middle-l').find('.k3').length == 0 && $('#middle-l').find('.k4').length == 0 
        && $('#middle-r').find('.k2').length == 0 && $('#middle-r').find('.k3').length == 0 && $('#middle-r').find('.k4').length == 0 
        && $('#right').find('.k2').length == 0 && $('#right').find('.k1').length == 0 && $('#right').find('.k3').length == 0 
        && $('#bottom').find("div").length == 0) {
            $(".od").addClass("tocno")
        } else {
            $('#left').find('.k1').addClass("netocno")
            $('#left').find('.k1').find("span").html(pitanja[brojPitanja - 1][3][1])
            $('#left').find('.k3').addClass("netocno")
            $('#left').find('.k3').find("span").html(pitanja[brojPitanja - 1][3][2])
            $('#left').find('.k2').addClass("tocno")
            $('#left').find('.k4').addClass("netocno")
            $('#left').find('.k4').find("span").html(pitanja[brojPitanja - 1][3][3])

            $('#bottom').find("div").addClass("netocno")
            $('#bottom').find(".k3").find("span").html(pitanja[brojPitanja - 1][3][2])
            $('#bottom').find(".k2").find("span").html(pitanja[brojPitanja - 1][3][1])
            $('#bottom').find(".k1").find("span").html(pitanja[brojPitanja - 1][3][0])
            $('#bottom').find(".k4").find("span").html(pitanja[brojPitanja - 1][3][3])

            $('#middle-l').find('.k2').addClass("netocno")
            $('#middle-l').find('.k2').find("span").html(pitanja[brojPitanja - 1][3][0])
            $('#middle-l').find('.k3').addClass("netocno")
            $('#middle-l').find('.k3').find("span").html(pitanja[brojPitanja - 1][3][2])
            $('#middle-l').find('.k4').addClass("netocno")
            $('#middle-l').find('.k4').find("span").html(pitanja[brojPitanja - 1][3][3])
            $('#middle-l').find('.k1').addClass("tocno")

            $('#middle-r').find('.k1').addClass("netocno")
            $('#middle-r').find('.k1').find("span").html(pitanja[brojPitanja - 1][3][1])
            $('#middle-r').find('.k2').addClass("netocno")
            $('#middle-r').find('.k2').find("span").html(pitanja[brojPitanja - 1][3][0])
            $('#middle-r').find('.k3').addClass("tocno")
            $('#middle-r').find('.k4').addClass("netocno")
            $('#middle-r').find('.k4').find("span").html(pitanja[brojPitanja - 1][3][3])

            $('#right').find('.k1').addClass("netocno")
            $('#right').find('.k1').find("span").html(pitanja[brojPitanja - 1][3][1])
            $('#right').find('.k2').addClass("netocno")
            $('#right').find('.k2').find("span").html(pitanja[brojPitanja - 1][3][0])
            $('#right').find('.k3').addClass("netocno")
            $('#right').find('.k3').find("span").html(pitanja[brojPitanja - 1][3][2])
            $('#right').find('.k4').addClass("tocno")
        }
        if (brojPitanja == pitanja.length) {
            $("#dalje").text("provjeri rezultat")
            $('#dalje').trigger('blur');
            $("#dalje").unbind("click").click(function() {
                bodovi += $(".tocno").length
                rezultat()
            })


        } else {
            $("#dalje").unbind("click").click(function() {
                bodovi += $(".tocno").length
                iduce_pitanje()
            })
        }
        $(".od").addClass("gotovo")
        $(".tocno").find("span").html("+1")
        $(".netocno").find("span").html(this.className)
        $("#dalje").show(300)
        $(".bodovi").show(300)
        $("#gotovo")[0].play()
    }

    function iduce_pitanje() {
        $("#dalje").hide(300)
        $(".visina").empty();
        $("#bottom").empty();
        ubaci_pitanja()
    }

    function rezultat() {
        $("#gotovo").remove();
        $("#zadatci").hide(300)
        $("#kraj").delay(300).show(300)
        $("#60656686").attr("value", bodovi)
        $("#bodovi").html(bodovi)
    }

    dragula([document.getElementById('left'), document.getElementById('right'), document.getElementById('middle-l'),document.getElementById('middle-r'), document.getElementById('bottom')], {
        accepts: function(el, target) {
            return !el.classList.contains('gotovo')
        },
        moves: function(el, container, handle) {
            $("#drop")[0].play()
            return !el.classList.contains('gotovo')
        }
    });


    $("body").mouseup(function() {
        if ($(".odgovori").find(".od").length == glagoli.length) {
            provjeri()
        }
    })
    $("body").on('click touchend', function(event) {

        if (event.type == "click") detectTap = true; //detects click events 
        if (detectTap) {
            if ($(".odgovori").find(".od").length == glagoli.length) {
                provjeri()
            }

        }
    });
    function ubaci_pitanja() {
        $("#left").append(pitanja[brojPitanja][3][0])
        $("#middle-l").append(pitanja[brojPitanja][3][1])
        $("#middle-r").append(pitanja[brojPitanja][3][2])
        $("#right").append(pitanja[brojPitanja][3][3])
        glagoli = new Array();
        k2 = new Array();
        k1 = new Array();
        k3 = new Array();
        k4 = new Array();
        for (i = 0; i < pitanja[brojPitanja][0].length; i++) {
            k2.push("<div class='k1 od'><section>" + pitanja[brojPitanja][0][i] + "</section><span></span></div>")
        }
        for (i = 0; i < pitanja[brojPitanja][1].length; i++) {
            k1.push("<div class='k2 od'><section>" + pitanja[brojPitanja][1][i] + "</section><span></span></div>")
        }
        for (i = 0; i < pitanja[brojPitanja][2].length; i++) {
            k3.push("<div class='k3 od'><section>" + pitanja[brojPitanja][2][i] + "</section><span></span></div>")
        }
        for (i = 0; i < pitanja[brojPitanja][4].length; i++) {
            k4.push("<div class='k4 od'><section>" + pitanja[brojPitanja][4][i] + "</section><span></span></div>")
        }
        glagoli = glagoli.concat(k3, k1, k2, k4)
        shuffle(glagoli)
        for (i = 0; i < glagoli.length; i++) {
            $("#bottom").append(glagoli[i]);
        }
        ProgressCountdown(120, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => provjeri());
        brojPitanja++
    }


    function pocetak() {
        $("#upute").hide(300)
        $("#zadatci").delay(300).show(300)
        $.getJSON('pitanja2.json', function(data) {
            for (i = 0; i < data.pitanja.length; i++) {
                questionBank[i] = new Array;
                questionBank[i][0] = data.pitanja[i].k2;
                questionBank[i][1] = data.pitanja[i].k1;
                questionBank[i][2] = data.pitanja[i].k3;
                questionBank[i][4] = data.pitanja[i].k4;
                questionBank[i][3] = data.pitanja[i].vremena;
            }
            pitanja = questionBank
            shuffle(pitanja)
            ubaci_pitanja()
        })
    }

    $("#pokreni").unbind("click").click(function() {
        pocetak()
    })

    $("#resetiraj").unbind("click").click(function() {
        $(".visina").empty();
        $("#bottom").empty();
        brojPitanja = 0;
        questionBank = new Array();
        pitanja = new Array();
        bodovi = 0;
        krivi_odgovori = new Array();
        vrijeme = 0;
        $("#kraj").hide(300)
        $("#dalje").html("idući zadatak")
        $("#dalje").hide()
        $("#rezul").hide()
        pocetak()
        $("body").append('<audio class="audios" id="gotovo" preload="none"><source src="zvuk/gotovo.mp3" type="audio/mpeg"></audio>')
    })
});