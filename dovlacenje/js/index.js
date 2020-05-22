  
    var sekunde = 0;
    setInterval(function () {
        ++sekunde;
    }, 1000);


  function touchHandler(event) {
      var touches = event.changedTouches,
          first = touches[0],
          type = "";
      switch (event.type) {
          case "touchstart":
              type = "mousedown";
              break;
          case "touchmove":
              type = "mousemove";
              break;
          case "touchend":
              type = "mouseup";
              break;
          default:
              return;
      }
      // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
      //                screenX, screenY, clientX, clientY, ctrlKey, 
      //                altKey, shiftKey, metaKey, button, relatedTarget);
      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1,
          first.screenX, first.screenY,
          first.clientX, first.clientY, false,
          false, false, false, 0 /*left*/ , null);
      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
  }
  var shuffleQuestions = false; /* Shuffle questions ? */
  var shuffleAnswers = true; /* Shuffle answers ? */
  var lockedAfterDrag = false; /* Lock items after they have been dragged, i.e. the user get's only one shot for the correct answer */
  var questionCounter = 0;
  var bodovi= 0;
  var pitanja = [{
      question: "Putovanje automobilom",
      answers: ["osobe", "gužve", "odlučimo", "kolegom", "štedimo", "se umaramo"],
      slika: ["slike/auto.jpg"],
      opisi: ["Najčešće jednim automobilom putuje jedna, ponekad dvije {q}. Zbog toga nastanu velike {q} na gradskim cestama. To je i skupo. Ako {q} na posao putovati sa susjedom ili {q}, jedan dan putovat ćemo svojim automobilom, drugi dan njegovim. Tako {q} novac i automobil, a i manje {q}."],
  }, 
  {
    question: "radnje",
    answers: ["su se", "kretali", "su se pojavili", "pokrenut", "postoje", "vući", "prevoze", "izgrađen"],
    slika: ["slike/graditi.jpg"],
    opisi: ["Automobili {q} nekad {q} puno sporije nego danas.<br>Kad {q} prvi kompjutori? <br>Projekt je {q} prošli mjesec i već imamo rezultate. <br>U ovome gradu {q} tri sveučilišta. <br>Kada ulazimo u trgovine, ponekad vrata treba gurati, ponekad {q}.<br>Autobusi, avioni, tramvaji i vlakovi {q}  putnike. <br>Ovaj tunel je {q} prije tri godine."],
}
];
  function quizIsFinished() {
      questionCounter++
      if (questionCounter == pitanja.length) {
            rezultat=bodovi-(sekunde/2)
            rezultat= rezultat.toString().replace(".",",")
          swal({
              title: "Završili ste igru.",
              html: "<p>Vrijeme potrebno za rješavanje zadataka: "+$("#basicUsage").text()+"</p><form id='input-form' action='' method='POST' target='no-target' style='text-align: center;'><br><select id='ikona' style='height:30px'></select><label for='ime'>Ime : </label><input id='input-q1' name='q1' style='height:25px'><br> <br><label for='bodovi'>Bodovi : </label><input id='input-q2' placeholder='q2' name='q2' value='" +rezultat+ "' disabled style='display:none'> <label for='bodovi'>" + rezultat + "</label><br><br><button id='form-submit' type='submit' disabled='true' class='swal2-styled' style='background-color: rgb(0, 157, 224); border-left-color: rgb(0, 157, 224); border-right-color: rgb(0, 157, 224);'>predaj rezultat</button> </form><iframe src='#' id='no-target' name='no-target' style='visibility:hidden;display:none'></iframe>",
              confirmButtonText: 'ponovite ovu igru',
              confirmButtonColor: '#009DE0',
              backdrop: false,
              closeOnCancel: false,
              allowOutsideClick: false,
          })
          $('.swal2-confirm').click(function () {
              location.reload()
          })
          $('.swal2-cancel').click(function () {
              window.open("../");
          })

          $(' #input-q1').keyup(function () {
            $('#form-submit').prop('disabled', this.value == "" ? true : false);
        })

        var target = document.getElementById("ikona");
        var emojiCount = emoji.length;

        for(var index = 0; index < emojiCount; index++)
        {
        addEmoji(emoji[index]);
        }

        function addEmoji(code)
        {
        var option = document.createElement('option');
        option.innerHTML =  code;
            option.value=code;
        target.appendChild(option);
        }
        
         if (localStorage.getItem("ime") != null) {
             $('#input-q1').val(localStorage.getItem("ime"))
             $('#ikona').val(localStorage.getItem("ikona"))
             $('#form-submit').prop('disabled', this.value == "true");
         }

         $('#input-form').one('submit', function () {
            $('#input-form').hide(300)
            localStorage.setItem('ikona', $('#ikona').val())
            localStorage.setItem('ime', $('#input-q1').val())
            localStorage.setItem('pokrenuto', "da")
            var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
            var inputq2 = encodeURIComponent($('#input-q2').val());
            var q1ID = "entry.412821582";
            var q2ID = "entry.902512960";

            var baseURL =
                'https://docs.google.com/forms/d/e/1FAIpQLSftHLf5IL0O659TYT7vda1W_k5A8FjlZsSUCfXU459mRkAIKA/formResponse?';
            var submitRef = '&submit=970054585833720596';
            var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
            console.log(submitURL);
            $(this)[0].action = submitURL;
            setTimeout(
                function () {
                    window.location.href = 'rez.html';
                }, 2500);
        });
      } else {
          $(".btn-holder").show(300);
          $(".btn-holder").click(function () {
              dragDropResetForm()
              sranje()
          })
      }
      // This function is called when everything is solved		
  }
  /* Don't change anything below here */
  var dragContentDiv = false;
  var dragContent = false;
  var dragSource = false;
  var dragDropTimer = -1;
  var destinationObjArray = new Array();
  var destination = false;
  var dragSourceParent = false;
  var dragSourceNextSibling = false;
  var answerDiv;
  var questionDiv;
  var sourceObjectArray = new Array();
  var arrayOfEmptyBoxes = new Array();
  var arrayOfAnswers = new Array();
  var toc = 0;
  function getTopPos(inputObj) {
      if (!inputObj || !inputObj.offsetTop) return 0;
      var returnValue = inputObj.offsetTop;
      while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetTop;
      return returnValue;
  }
  function getLeftPos(inputObj) {
      if (!inputObj || !inputObj.offsetLeft) return 0;
      var returnValue = inputObj.offsetLeft;
      while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetLeft;
      return returnValue;
  }
  function cancelEvent() {
      return false;
  }
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
  shuffle(pitanja);
  function randomPitanja() {
    $('.dragDropSmallBox').each(function() {
        $(this).empty()
          $(this).show();
      });
      ran = Math.floor(Math.random() * 2) + 1
      s1 = "<img src='" + pitanja[questionCounter].slika[0] + "' class='slikica' id='sli1'>"
      r1 = '<div class="rad1">' + pitanja[questionCounter].opisi[0] + '</div>'
      $("#o1").html(s1 + r1)
      $("#a0").html(pitanja[questionCounter].answers[0])
      $("#a1").html(pitanja[questionCounter].answers[1])
      $("#a2").html(pitanja[questionCounter].answers[2])
      $("#a3").html(pitanja[questionCounter].answers[3])
      $("#a4").html(pitanja[questionCounter].answers[4])
      $("#a5").html(pitanja[questionCounter].answers[5])
      $("#a6").html(pitanja[questionCounter].answers[6])
      $("#a7").html(pitanja[questionCounter].answers[7])
      $("#a8").html(pitanja[questionCounter].answers[8])
      $("#a9").html(pitanja[questionCounter].answers[9])
      $("#a10").html(pitanja[questionCounter].answers[10])
      $("#a11").html(pitanja[questionCounter].answers[11])
      $("#a12").html(pitanja[questionCounter].answers[12])
      $(".opis").html(questionCounter + 1 + "/" + pitanja.length + "<br><br>" + pitanja[questionCounter].question)
      $('.rad1').html($('.rad1').html().split('{q}').join('<div class="dragDropSmallBox"></div><div class="destinationBox"></div>'));
      $('.dragDropSmallBox').each(function() {
        if ($(this).is(':empty'))
          $(this).hide();
      });
      $('.dragDropSmallBox').each(function(eq, el) {
        el = $(el);
        if(typeof(el.attr('id')) === "undefined") {
            el.attr('id', 'q' + eq);
        }
    });
  }
  function initDragDrop(e) {
      //stvaranje pitanj
      if (document.all) e = event;
      if (lockedAfterDrag && this.parentNode.parentNode.id == 'questionDiv') return;
      dragContentDiv.style.left = e.clientX + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - 120 + 'px';
      dragContentDiv.style.top = e.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - 80 + 'px';
      dragSource = this;
      dragSourceParent = this.parentNode;
      dragSourceNextSibling = false;
      if (this.nextSibling) dragSourceNextSibling = this.nextSibling;
      if (!dragSourceNextSibling.tagName) dragSourceNextSibling = dragSourceNextSibling.nextSibling;
      dragDropTimer = 0;
      timeoutBeforeDrag();
      return false;
  }
  function timeoutBeforeDrag() {
      if (dragDropTimer >= 0 && dragDropTimer < 10) {
          dragDropTimer = dragDropTimer + 1;
          setTimeout('timeoutBeforeDrag()', 10);
          return;
      }
      if (dragDropTimer >= 10) {
          dragContentDiv.style.display = 'block';
          dragContentDiv.innerHTML = '';
          dragContentDiv.appendChild(dragSource);
      }
  }
  function dragDropMove(e) {
      if (dragDropTimer < 10) {
          return;
      }
      if (document.all) e = event;
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
      dragContentDiv.style.left = e.clientX + scrollLeft - 120 + 'px';
      dragContentDiv.style.top = e.clientY + scrollTop - 80 + 'px';
      var dragWidth = dragSource.offsetWidth;
      var dragHeight = dragSource.offsetHeight;
      var objFound = false;
      var mouseX = e.clientX + scrollLeft;
      var mouseY = e.clientY + scrollTop;
      destination = false;
      for (var no = 0; no < destinationObjArray.length; no++) {
          var left = destinationObjArray[no]['left'];
          var top = destinationObjArray[no]['top'];
          var width = destinationObjArray[no]['width'];
          var height = destinationObjArray[no]['height'];
          destinationObjArray[no]['obj'].className = 'destinationBox';
          var subs = destinationObjArray[no]['obj'].getElementsByTagName('DIV');
          if (!objFound && subs.length == 0) {
              if (mouseX < (left / 1 + width / 1) && (mouseX + dragWidth / 1) > left && mouseY < (top / 1 + height / 1) && (mouseY + dragHeight / 1) > top) {
                  destinationObjArray[no]['obj'].className = 'dragContentOver';
                  destination = destinationObjArray[no]['obj'];
                  objFound = true;
              }
          }
      }
      sourceObjectArray['obj'].className = '';
      if (!objFound) {
          var left = sourceObjectArray['left'];
          var top = sourceObjectArray['top'];
          var width = sourceObjectArray['width'];
          var height = sourceObjectArray['height'];
          if (mouseX < (left / 1 + width / 1) && (mouseX + dragWidth / 1) > left && mouseY < (top / 1 + height / 1) && (mouseY + dragHeight / 1) > top) {
              destination = sourceObjectArray['obj'];
              sourceObjectArray['obj'].className = 'dragContentOver';
          }
      }
      return false;
  }
  function dragDropEnd() {
    if (dragDropTimer < 10) {
        dragDropTimer = -1;
        return;
    }
    dragContentDiv.style.display = 'none';
    sourceObjectArray['obj'].style.backgroundColor = '#FFF';
    if (destination) {
        destination.appendChild(dragSource);
        destination.className = 'destinationBox';
        // Check if position is correct, i.e. correct answer to the question
        if (!destination.id || destination.id != 'answerDiv') {
            var previousEl = dragSource.parentNode.previousSibling;
            if (!previousEl.tagName) previousEl = previousEl.previousSibling;
            var numericId = previousEl.id.replace(/[^0-9]/g, '');
            var numericIdSource = dragSource.id.replace(/[^0-9]/g, '');
            if (numericId == numericIdSource) {
                dragSource.className = 'correctAnswer'+numericId;
                $( ".definicija" +numericId).css({"opacity":"1"})
                $(".correctAnswer"+numericId).parent().html( "<section class='correctAnswer"+numericId+"'>"+$(".correctAnswer"+numericId).text()+"</section>")
                bodovi+=10
                checkAllAnswers();
                
            } else {
                dragSource.className = 'wrongAnswer';
                bodovi-=10
            }

        }
        if (destination.id && destination.id == 'answerDiv') {
            dragSource.className = 'dragDropSmallBox';
        }
    } else {
        answerDiv = document.getElementById('answerDiv');
        answerDiv.appendChild(dragSource);
    }
    dragDropTimer = -1;
    dragSourceNextSibling = false;
    dragSourceParent = false;
    destination = false;
}
  function checkAllAnswers() {
      if ($('.correctAnswer').length == pitanja[questionCounter].answers.length) {
          quizIsFinished();
          dragContentDiv = false;
          dragContent = false;
          dragSource = false;
      }
      for (var no = 0; no < arrayOfEmptyBoxes.length; no++) {
          var sub = arrayOfEmptyBoxes[no].getElementsByTagName('DIV');
          if (sub.length == 0) return;
          if (sub[0].className != 'correctAnswer') {
              return;
          }
      }
  }
  function resetPositions() {
      if (dragDropTimer >= 10) return;
      for (var no = 0; no < destinationObjArray.length; no++) {
          if (destinationObjArray[no]['obj']) {
              destinationObjArray[no]['left'] = getLeftPos(destinationObjArray[no]['obj'])
              destinationObjArray[no]['top'] = getTopPos(destinationObjArray[no]['obj'])
          }
      }
      sourceObjectArray['left'] = getLeftPos(answerDiv);
      sourceObjectArray['top'] = getTopPos(answerDiv);
  }
  function sranje() {
      randomPitanja();
      dragContentDiv = document.getElementById('dragContent');
      answerDiv = document.getElementById('answerDiv');
      answerDiv.onselectstart = cancelEvent;
      var divs = answerDiv.getElementsByTagName('DIV');
      questionDiv = document.getElementById('questionDiv');
      questionDiv.onselectstart = cancelEvent;
      var divs = questionDiv.getElementsByTagName('DIV');
      var questions = new Array();
      var questionsOpenBoxes = new Array();
      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'destinationBox') {
              var index = destinationObjArray.length;
              destinationObjArray[index] = new Array();
              destinationObjArray[index]['obj'] = divs[no];
              destinationObjArray[index]['left'] = getLeftPos(divs[no])
              destinationObjArray[index]['top'] = getTopPos(divs[no])
              destinationObjArray[index]['width'] = divs[no].offsetWidth;
              destinationObjArray[index]['height'] = divs[no].offsetHeight;;
          }
          if (divs[no].className == 'dragDropSmallBox') {
              questions[questions.length] = divs[no];
          }
      }
      if (shuffleQuestions) {
          for (var no = 0; no < (questions.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * questions.length);
              questionDiv.appendChild(questions[randomIndex]);
              questionDiv.appendChild(questionsOpenBoxes[randomIndex]);
              destinationObjArray[destinationObjArray.length] = destinationObjArray[randomIndex];
              destinationObjArray.splice(randomIndex, 1);
              questions[questions.length] = questions[randomIndex];
              questions.splice(randomIndex, 1);
              questionsOpenBoxes[questionsOpenBoxes.length] = questionsOpenBoxes[randomIndex];
              questionsOpenBoxes.splice(randomIndex, 1);
          }
      }
      questionDiv.style.visibility = 'visible';
      answerDiv.style.visibility = 'visible';
      document.documentElement.onmouseup = dragDropEnd;
      document.documentElement.onmousemove = dragDropMove;
      setTimeout('resetPositions()', 150);
      window.onresize = resetPositions;
  }
  //ovjde treba raditi
  function initDragDropScript() {
      randomPitanja();
      dragContentDiv = document.getElementById('dragContent');
      answerDiv = document.getElementById('answerDiv');
      answerDiv.onselectstart = cancelEvent;
      var divs = answerDiv.getElementsByTagName('DIV');
      var answers = new Array();
      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'dragDropSmallBox') {
              divs[no].onmousedown = initDragDrop;
              answers[answers.length] = divs[no];
              arrayOfAnswers[arrayOfAnswers.length] = divs[no];
          }
      }
      if (shuffleAnswers) {
          for (var no = 0; no < (answers.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * answers.length);
              answerDiv.appendChild(answers[randomIndex]);
          }
      }
      sourceObjectArray['obj'] = answerDiv;
      sourceObjectArray['left'] = getLeftPos(answerDiv);
      sourceObjectArray['top'] = getTopPos(answerDiv);
      sourceObjectArray['width'] = answerDiv.offsetWidth;
      sourceObjectArray['height'] = answerDiv.offsetHeight;
      questionDiv = document.getElementById('questionDiv');
      questionDiv.onselectstart = cancelEvent;
      var divs = questionDiv.getElementsByTagName('DIV');
      var questions = new Array();
      var questionsOpenBoxes = new Array();
      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'destinationBox') {
              var index = destinationObjArray.length;
              destinationObjArray[index] = new Array();
              destinationObjArray[index]['obj'] = divs[no];
              destinationObjArray[index]['left'] = getLeftPos(divs[no])
              destinationObjArray[index]['top'] = getTopPos(divs[no])
              destinationObjArray[index]['width'] = divs[no].offsetWidth;
              destinationObjArray[index]['height'] = divs[no].offsetHeight;
              questionsOpenBoxes[questionsOpenBoxes.length] = divs[no];
              arrayOfEmptyBoxes[arrayOfEmptyBoxes.length] = divs[no];
          }
          if (divs[no].className == 'dragDropSmallBox') {
              questions[questions.length] = divs[no];
          }
      }
      if (shuffleQuestions) {
          for (var no = 0; no < (questions.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * questions.length);
              questionDiv.appendChild(questions[randomIndex]);
              questionDiv.appendChild(questionsOpenBoxes[randomIndex]);
              destinationObjArray[destinationObjArray.length] = destinationObjArray[randomIndex];
              destinationObjArray.splice(randomIndex, 1);
              questions[questions.length] = questions[randomIndex];
              questions.splice(randomIndex, 1);
              questionsOpenBoxes[questionsOpenBoxes.length] = questionsOpenBoxes[randomIndex];
              questionsOpenBoxes.splice(randomIndex, 1);
          }
      }
      questionDiv.style.visibility = 'visible';
      answerDiv.style.visibility = 'visible';
      document.documentElement.onmouseup = dragDropEnd;
      document.documentElement.onmousemove = dragDropMove;
      setTimeout('resetPositions()', 150);
      window.onresize = resetPositions;
  }
  /* Reset the form */
  function dragDropResetForm() {
      $(".btn-holder").hide(300);
      for (var no = 0; no < arrayOfAnswers.length; no++) {
          arrayOfAnswers[no].className = 'dragDropSmallBox'
          answerDiv.appendChild(arrayOfAnswers[no]);
      }
  }
  window.onload = initDragDropScript;