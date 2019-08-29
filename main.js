// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCzCJqFzUvanoKIyQwTcmXaYMXig1T1Oy8",
  authDomain: "crittr-web.firebaseapp.com",
  databaseURL: "https://crittr-web.firebaseio.com",
  projectId: "crittr-web",
  storageBucket: "crittr-web.appspot.com",
  messagingSenderId: "715324045920",
  appId: "1:715324045920:web:4a2d7294c7e2e93e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeUserData(email, phone) {
  var formKey = firebase.database().ref().child('form').push().key;
  firebase.database().ref('form/' + formKey).set({
    email: email,
    phone: phone
  });
}

$(function() { //shorthand document.ready function
  $('#create-account').on('submit', function(e) { //use on if jQuery 1.7+
      e.preventDefault();  //prevent form from submitting
      var x = document.getElementById("email-input");
      if (window.getComputedStyle(x).display == "none") {
        console.log("Mobile");
        window.location.assign("tel:833-933-0770");
      } else {
        var data = $("#create-account :input").serializeArray();
        console.log(data);
        window.sessionStorage.setItem("email", data[0].value);
        window.sessionStorage.setItem("phone", data[1].value);
        //writeUserData(data[0], data[1]);
        if (data[0].value != "" && data[1].value != "") {
          window.location.assign("form.html");
        }
      }
      return false;
  });
});
    $(document).ready(function(){

      if ($(window).width() > 600) {
        $('.service-slider').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          prevArrow: "<div class=\"left-arrow\"></div>",
          nextArrow: "<div class=\"right-arrow\"></div>",
          autoplay: true,
          autoplaySpeed: 3000,
        });
      } else {
        $('.service-slider').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1600
        });
      }

      if ($(window).width() > 600) {
        $('.quote-slider').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: "<div class=\"left-arrow\"></div>",
          nextArrow: "<div class=\"right-arrow\"></div>",
          autoplay: true,
          autoplaySpeed: 1600
        });
      } else {
        $('.quote-slider').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: "<div class=\"left-arrow\"></div>",
          nextArrow: "<div class=\"right-arrow\"></div>",
          arrows:false,
          autoplay: true,
          autoplaySpeed: 1600
        });
      }
    });

  var quote = {
    qmark:"\"",
    q1:"I was relieved and delighted to learn of the establishment of PetPals - a new, local pet care service. During a recent holiday getaway, I left my beloved, badly spoiled Maine Coon Cat, Meeka, in the hands of the PetPals folks. The experience proved highly positive for pet owner and pet. I returned home to a very contented kitty who has obviously bonded with her temporary caregiver. What a comfort and relief!",
    q2:"We had PetPals over to trim my elderly Newfoundland's nails because she can no longer get into the car to go to a groomer. Very happy with the service and the pricing, and we look forward to seeing her again in the future.",
    q3:"Wonderful service! Careful and knowledgeable in every way."
  }

  var starCode = "<div class=\"star\"></div>";

  var star = {
    one:starCode,
    two:starCode+starCode,
    three:starCode+starCode+starCode,
    four:starCode+starCode+starCode+starCode,
    five:starCode+starCode+starCode+starCode+starCode
  }


  function getReview() {
    document.getElementById('review').innerHTML = quote.qmark+quote.q1+quote.qmark;
    document.getElementById('review2').innerHTML = quote.qmark+quote.q2+quote.qmark;
    document.getElementById('review3').innerHTML = quote.qmark+quote.q3+quote.qmark;

    document.getElementById('rating1').innerHTML = star.five;
    document.getElementById('rating2').innerHTML = star.five;
    document.getElementById('rating3').innerHTML = star.five;
  }

  function showPop(number) {
    var n = number-1;
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var popText = document.getElementById('popText');
    var popPara = document.getElementById('popParagraph');
    var popPrice = document.getElementById('popPrice');
    var popPic = document.getElementById('popPic');
    var popContain = document.getElementById('popContain');
    var section = document.getElementsByClassName('section');
    var popExplain = document.getElementById('popExplain');
    var obj = serviceList[n];
    var image = imgList[n%imgMod];
    var h = window.innerHeight;
    var w = window.innerWidth;
    popup.style.height = (h*0.8);
    var whiteBar = document.getElementById('whiteBar');
    whiteBar.style.bottom = (h/100)*5;
    whiteBar.style.left = (w/100)*5;

    var variants = "";
    var vPrice = "";

    localStorage.setItem("currentPop", n);
    overlay.style.display = 'block';
    popup.style.display = 'block';
    popText.innerHTML = obj.name;
    popPara.innerHTML = obj.description;
    popPic.style = "background-size:contain;background-repeat:no-repeat;background-image:url(\'"+image.url+"right:"+image.popup.right+";bottom:"+image.popup.bottom+";";
    popContain.style.overflowY = image.popup.scroll;
    popContain.scrollTop = 0;

    if (typeof obj.variant.var1 === 'undefined') {
      variants = "";
    } else {
      variants = "<br>"+obj.variant.var1.name+"<br>"+obj.variant.var2.name+"<br>"+obj.variant.var3.name;
    }
    popExplain.innerHTML = obj.variant.regular.name+variants;

    if (typeof obj.variant.var1 === 'undefined') {
      vPrice = "";
    } else {
      vPrice = "<br>"+obj.variant.var1.price+"<br>"+obj.variant.var2.price+"<br>"+obj.variant.var3.price;
    }

    popPrice.innerHTML = obj.price+vPrice;


    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('container').style.overflow = 'hidden';

    section[0].style.display = "none";
    section[1].style.display = "none";
    section[2].style.display = "none";
    section[3].style.display = "none";
    section[4].style.display = "none";
    section[5].style.display = "none";
    section[6].style.display = "none";
  }

  function switchPop(number) {
    var n = number;
    if (n == -1) {
      n = 11;
    }
    n = n%serviceList.length;
    var popText = document.getElementById('popText');
    var popPara = document.getElementById('popParagraph');
    var popPrice = document.getElementById('popPrice');
    var popPic = document.getElementById('popPic');
    var popContain = document.getElementById('popContain');
    var popExplain = document.getElementById('popExplain');
    var obj = serviceList[n];
    var image = imgList[n%imgMod];

    var vPrice = "";
    var variants = "";

    localStorage.setItem("currentPop", n);
    popText.innerHTML = obj.name;
    popPara.innerHTML = obj.description;
    popPrice.innerHTML = obj.price;
    popPic.style = "background-size:contain;background-repeat:no-repeat;background-image:url(\'"+image.url+"right:"+image.popup.right+";bottom:"+image.popup.bottom+";";
    popContain.style.overflowY = image.popup.scroll;
    popContain.scrollTop = 0;

    if (typeof obj.variant.var1 === 'undefined') {
      variants = "";
    } else {
      variants = "<br>"+obj.variant.var1.name+"<br>"+obj.variant.var2.name+"<br>"+obj.variant.var3.name;
    }
    popExplain.innerHTML = obj.variant.regular.name+variants;

    if (typeof obj.variant.var1 === 'undefined') {
      vPrice = "";
    } else {
      vPrice = "<br>"+obj.variant.var1.price+"<br>"+obj.variant.var2.price+"<br>"+obj.variant.var3.price;
    }

    popPrice.innerHTML = obj.price+vPrice;
  }

  function showPopString(text) {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popText').innerHTML = text;
  }

  function hidePop() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('body').style.overflow = 'visible';

    document.getElementsByClassName('section')[0].style.display = "initial";
    document.getElementsByClassName('section')[1].style.display = "initial";
    document.getElementsByClassName('section')[2].style.display = "initial";
    document.getElementsByClassName('section')[3].style.display = "initial";
    document.getElementsByClassName('section')[4].style.display = "initial";
    document.getElementsByClassName('section')[5].style.display = "initial";
    document.getElementsByClassName('section')[6].style.display = "initial";

    document.getElementById('section-3').scrollIntoView();
    window.scrollBy(0, 40);
  }
  function hideToTop() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('body').style.overflow = 'visible';

    document.getElementsByClassName('section')[0].style.display = "initial";
    document.getElementsByClassName('section')[1].style.display = "initial";
    document.getElementsByClassName('section')[2].style.display = "initial";
    document.getElementsByClassName('section')[3].style.display = "initial";
    document.getElementsByClassName('section')[4].style.display = "initial";
    document.getElementsByClassName('section')[5].style.display = "initial";
    document.getElementsByClassName('section')[6].style.display = "initial";
  }

  //Service card code
  var serviceCard = {
    p1:'<div class=\"card-top\" style=\"background-image:url(\'',
    p2:'\">',
    p3:'</div><div class=\"card-bot\"><div id="cSpacer"></div><div id="cPrice" style=\"width:auto;height:3.1vw;\"></div>',
    p4:'</div>'
  }


  /* IMAGES */


  var imgPos1 = "background-repeat: no-repeat;background-size:";
  var imgPos2 = ";background-position:";
  var imgPos3 = ";";

  var img1 = {
    url:'serv3.svg\');',
    desktop: {size: "60%", pos: "80% 700%"},
    mobile: {size: "60%", pos: "90% -800%"},
    popup: {right: "0", bottom: "-25", scroll: "hidden"}
  }
  var img2 = {
    url:'bitmap2.svg\');',
    desktop: {size: "80%", pos: "80% -305%"},
    mobile: {size: "80%", pos: "80% -175%"},
    popup: {right: "0", bottom: "-20", scroll: "scroll"}
  }
  var img3 = {
    url:'serv2.svg\');',
    desktop: {size: "85%", pos: "85% -150%"},
    mobile: {size: "80%", pos: "85% -150%"},
    popup: {right: "0", bottom: "-105px", scroll: "hidden"}
  }
  var img4 = {
    url:'serv4.svg\');',
    desktop: {size: "40%", pos: "85% 150%"},
    mobile: {size:"40%", pos: "85% 160%"},
    popup: {right: "0", bottom: "-20px", scroll: "hidden"}
  }
  var img5 = {
    url:'serv5.svg\');',
    desktop: {size: "80%", pos: "85% -300%"},
    mobile: {size: "80%",pos: "85% -138%"},
    popup: {right: "-30", bottom: "-50", scroll: "hidden"}
  }
  var img6 = {
    url:'girl.svg\');',
    desktop: {size: "70%", pos: "100% -110%"},
    mobile: {size:"70%", pos:"100% -75%"},
    popup: {right: "0", bottom: "-10", scroll: "hidden"}
  }
  var img7 = {
    url: 'serv6.svg\');',
    desktop: {size:"50%",pos:"70% -80%"},
    mobile: {size: "50%", pos: "80% -60%"},
    popup: {right: "0", bottom: "-40", scroll: "hidden"}
  }
  var imgList = [img6, img2, img3, img4, img5, img1, img7];
  var imgMod = imgList.length;

  /*
  //
  //
  //         SERVICES
  //
  //
  */

  var ears = {
    name:"Ear Cleaning",
    price:"$10.00*",
    description:"Regular ear cleanings are a great way to help keep your pets ears clear from disease, wax buildup, and infection. Routine cleaning and in-home examinations by one of our pet care professionals is a good way to detect potential infections or other ear issues early.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$10.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var weight = {
    name:"Weight Check",
    price:"$10.00*",
    description:"In 2018, an estimated 60% of cats and 56% of dogs in the United States were overweight or obese. Dogs and cats with excess fat are at greater risk for developing diabetes, arthritis, high blood pressure, kidney disease, and many forms of cancer. We can help you prevent that by monitoring your pets weight and diet.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$10.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var glands = {
    name:"Gland Expression",
    price:"$25.00*",
    description:"Most pets anal glands express themselves naturally. Some dogs need their anal glands manually expressed a few times per year. Some pets require gland expression every month (or even more often), if they have been having recurring issues. Our pet care providers are ready when your pet is showing any signs.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$25.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var consult = {
    name:"Consultation",
    price:"$30.00*",
    description:"Have a question regarding your pet? Our pet care experts are ready to help!",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$30.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var fleatick = {
    name:"Flea and Tick application",
    price:"$10.00*",
    description:"Tick and flea preventatives can do more than just eliminate your pet's itchy fleas and prevent allergic reactions. Flea and tick medications also prevent tapeworms, ticks, and other insects from biting your pet, and prevent fleas from getting inside your home, on your furniture, and in your bedding.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$10.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var walk = {
    name:"Dog Walking",
    price:"$25.00",
    description:"Your pets exercise needs are based on your dog's age, breed, size, and overall health, but a good rule of thumb is for your dog to spend at least 30 minutes every day on physical activity. Younger dogs and dogs bred for sports or herding activities may need much more. ",
    scroll: "hidden",
    variant: {
      regular: {name:"One Dog", price: "$25.00", space: " . . . . . . . . . . <br>"},
      var1: {name:"Two Dogs", price: "$35.00", space: " . . . . . . . . . ."},
      var2: {name:"Three Dogs", price: "$40.00", space: " . . . . . . . . "},
      var3: {name:"<br><div style=\"font-weight:lighter;\">For more pets please contact us for specialized pricing</div>", price: "", space: "  . . . . . . "},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "false"}
    }
  }
  var sit = {
    name:"Pet Sitting",
    price:"$35.00",
    description:"Professional pet sitters are just what the description implies – professional.  While having friends, family, or neighbors care for your pets may seem like a logical choice, our professional pet sitters do this for a living and have the experience necessary to care for your animals.<br><br> Our pet care providers are trained and experienced in working with all types of pet personalities and will know how to tailor your pet’s care based on their individual likes, dislikes, fears, and habits. They can spot and avoid potentially dangerous situations, and can react quickly and effectively when necessary. They are all trained and experienced in administering medications, and they know how to tell if your pet needs veterinary attention. We have many experienced pet sitters at PetPals, so there’s someone ready to take their place in case of emergencies, car troubles or illness. We’re ready to fulfill all of your care requests on time, each and every time.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$35.00"},
      var1: {name: "Extra pet", price: "$10.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "false"}
    }
  }
  var deliver = {
    name:"Delivery",
    price:"$25.00*",
    description:"More info coming soon!",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$25.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var fulltime = {
    name:"24 Hour Care",
    price:"$150.00",
    description:"More info coming soon!",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$150.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "false"}
    }
  }
  var teeth = {
    name:"Teeth Brushing",
    price:"$25.00*",
    description:"Most dogs with bad breath usually have poor dental care. Having your dog's teeth cleaned regularly can help fight against many common dental health issues, like bad breath, plaque and tartar buildup, and periodontal disease.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$25.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var bath = {
    name:"Bath",
    price:"$20.00*",
    description:"While dogs and cats don’t require daily scrub downs, they do need regular baths–but just how regular depends on several factors, such as your pets environment and type of coat, we can help you decide what’s right. Bathing plays an important role in the health of your pets fur and skin, helping to keep them clean and free of dirt and parasites. And of course, there’s the added benefit of making your pet more pleasant to be around.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$20.00"},
      var1: {name:"", price:""},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var groom = {
    name:"Grooming",
    price:"$45.00*",
    description:"Grooming is not just about maintaining your pets level of cleanliness, or just keeping them looking good. Grooming is also about maintaining both your pets physical health as well as their appearance.<br><br> We offer a variety of specific grooming services as well to fit your pets needs, such as full shaving, paw hair trimming, belly shaving (frequently booked for long haired cats) and Sanitary trimming.",
    scroll: "hidden",
    variant: {
      regular: {name:"Full Shave", price: "$45.00*"},
      var1: {name:"Belly Shave", price: "$45.00*"},
      var2: {name: "Paw Trim", price: "$15.00*"},
      var3: {name: "Sanitary Trim", price: "$20.00*"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }
  var nails = {
    name:"Nail Trimming",
    price:"$10.00*",
    description:"Trimming nails every few weeks is an important part of maintaining your pet's health. Not only does a quick trim protect you, your pet and your family, it can also save your sofa, curtains and other furniture. Nail-trimming is also a fast and effective alternative to declawing, which involves surgical amputation and can cause behavioral and health issues.",
    scroll: "hidden",
    variant: {
      regular: {name:"Regular", price: "$10.00"},
      visitFee: {name:"Exclusive Visit", price: "$25.00", applyed: "true"}
    }
  }

  var serviceList = [walk, sit, bath, ears, nails, weight, teeth, groom, deliver, glands, consult, fleatick];

  /*
  //
  //
  //
  //
  //
  */

  var idList = ['cImg1', 'cImg2', 'cImg3', 'cImg4',
   'cImg5', 'cImg6', 'cImg7', 'cImg8','cImg9',
    'cImg10', 'cImg11', 'cImg12', 'cImg13', 'cImg14',
     'cImg15', 'cImg16','cImg17', 'cImg18', 'cImg19',
      'cImg20', 'cImg21', 'cImg22', 'cImg23', 'cImg24',
      'cImg25', 'cImg26'];

  var serviceLength = serviceList.length;

  var innerSlider;

  var card = {
    c1:"<div class=\"service-card\"><center><div class=\"actual-card\" onclick=\"showPop(",
    c2:")\" id=\"cImg",
    c3:"\"></div></center></div>"
  }

  for(var i=1; i<serviceLength+1; i++) {
    innerSlider = innerSlider+card.c1+i+card.c2+i+card.c3;
  }

  document.getElementById('service-slider').innerHTML = innerSlider;

  for(var i=0; i<serviceLength; i++) {
    var id = idList[i];
    var element = document.getElementById(id);
    if(element) {
      if ($(window).width() > 600){
        element.innerHTML = serviceCard.p1+imgList[i%imgMod].url+imgPos1+imgList[i%imgMod].desktop.size+imgPos2+imgList[i%imgMod].desktop.pos+imgPos3+serviceCard.p2+serviceList[i].name+serviceCard.p3+serviceList[i].price+serviceCard.p4;
      } else {
        element.innerHTML = serviceCard.p1+imgList[i%imgMod].url+imgPos1+imgList[i%imgMod].mobile.size+imgPos2+imgList[i%imgMod].mobile.pos+imgPos3+serviceCard.p2+serviceList[i].name+serviceCard.p3+serviceList[i].price+serviceCard.p4;
      }
    }
  }

  // Fire when ready

  $( document ).ready(function() {
    getReview();

    document.onkeyup = function(event) {
      if (event.key === "Escape"){

      }
    }
    var back = localStorage.getItem("currentPop");
    document.onkeydown = function (e) {
      switch (e.key) {
        case 'Escape':
          hidePop();
          break;
        case 'ArrowLeft':
          // left arrow
          back = localStorage.getItem("currentPop");
          back = parseInt(back);
          console.log(back);
          back = back-1;
          localStorage.setItem("currentPop", back);
          switchPop(back);
          break;
        case 'ArrowRight':
          // right arrow
          back = localStorage.getItem("currentPop");
          back = parseInt(back);
          back = back+1;
          localStorage.setItem("currentPop", back);
          switchPop(back);
        }
      };

    var year = new Date().getFullYear();
    document.getElementById('copyright').innerHTML = "©"+year+" PetPals"
  });
