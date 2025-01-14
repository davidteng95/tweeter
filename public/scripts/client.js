/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// $(document).ready(() => {}); below is the shortened version

$(() => {


  // console.log("client.js file loaded"); checking if file loaded correctly

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1687211805435
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1687298205435
    }
  ];

  
  const renderTweets = function(tweets) {
    const $tweet = $('.old-tweet');
    $tweet.empty();
    
    for (const tweet of tweets) {
      const $tweetInfo = createTweetElement(tweet);
      $tweet.prepend($tweetInfo);
    };
  
  }
  
  const createTweetElement = (data) => {
    const timestamp = timeago.format(data.created_at);
    const $tweet = $(`
      <article class="tweet">
        <div class="info">
          <div class="avatar-name">
            <img src="${data.user.avatars}" class="avatar">
            <label>${data.user.name}</label>
          </div>
          <label class="at-account">${data.user.handle}</label>
          </div>
        <div class="old-text">${data.content.text}</div>
        <div class="time-icon">
          <label class="day">${timestamp}</label>
          <div>
            <a href=""><i class="fa-solid fa-flag icon"></i></a>
            <a href=""><i class="fa-solid fa-retweet icon"></i></a>
            <a href=""><i class="fa-solid fa-heart icon"></i></a>
          </div>
        </div>
      </article>
    `);

    $tweet.find('.old-text').text(data.content.text); //.text() method

    return $tweet;
  };

  //escape method, <div class="old-text">${escape(data.content.text)}</div>
  // const escape = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };


  $('#tweetform').on("submit", function (event) {
    event.preventDefault(); //stop the browser from auto submitting
    //console.log("form submission prevented"); //shows if event.preventDefault is executed
    
    
    if ($('#input-text').val() === "" || $('#input-text').val() === null) {
      $('.error').text(`⚠️Tweet can not be empty, please enter a Tweet below⚠️`).slideDown();
      return;
    }
    
    if ($('#input-text').val().length > 140) {
      $('.error').text(`⚠️Tweet too long, only 140 characters per Tweet⚠️`).slideDown();
      return;
    }
    
    const data = $('#tweetform').serialize();
    //console.log(data); shows what the input is after serialize
    
    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: data,
      success: () => {
        console.log("Ajax request successful");
        loadtweets();

        $('#input-text').val('');
        $('.counter').text('140');
        $('.error').hide();
      }
    });
  });

  const loadtweets = () => {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: (data) => {
        console.log("got tweets");
        renderTweets(data);
      }
    });
  }

  loadtweets(); //preloads existing tweets from data
  $('.error').hide(); //hides the border when not triggered

});

