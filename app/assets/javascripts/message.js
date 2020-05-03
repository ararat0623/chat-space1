$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
                 `<div class="message" data-message-id=${message.id}>
                 <div class="message__top">
                 <p class="message__top--name">
                 ${message.user_name}
                 </p>
                 <p class="message__top--date-time">
                 ${message.created_at}
                 </p>
                 </div>
                 <p class="message__content">
                 ${message.content}
                 <br>
                 <img class="message__content--image" src=${message.image}>
                 </p>
                 </div>`
      return html
    } else {
      var html =
                `<div class="message" >
                 <div class="message__top">
                 <p class="message__top--name">
                 ${message.user_name}
                 </p>
                 <p class="message__top--date-time">
                 ${message.created_at}
                 </p>
                 </div>
                 <p class="message__content">
                 ${message.content}
                 <br>
                 </p>
                 </div>`
      return html
    }
    
  };
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      console.log(message)
      var html = buildHTML(message)
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $(".message-items__send-btn").prop("disabled", false);
      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".message-items__send-btn").prop("disabled", false);
    })
  });


  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i,message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__message-list').append(insertHTML);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});