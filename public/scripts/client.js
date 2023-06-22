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
            <i class="fa-solid fa-flag icon" href=""></i>
            <i class="fa-solid fa-retweet icon" href=""></i>
            <i class="fa-solid fa-heart icon" href=""></i>
          </div>
        </div>
      </article>
    `);

    return $tweet;
  };


  $('#tweetform').on("submit", function (event) {
    event.preventDefault(); //stop the browser from auto submitting
    //console.log("form submission prevented"); //shows if event.preventDefault is executed
    
    
    if ($('#input-text').val() === "" || $('#input-text').val() === null) {
      alert(`Tweet can not be empty, please enter a Tweet below`);
      return;
    }
    
    if ($('#input-text').val().length > 140) {
      alert(`Tweet too long, only 140 characters per Tweet`);
      return;
    }
    
    const data = $('#tweetform').serialize();
    //console.log(data); shows what the input is
    
    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: data,
      success: () => {
        console.log("Ajax request successful");
        loadtweets();

        $('#input-text').val('');
        $('.counter').text('140');
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

  loadtweets();

});

