$(function(){
  
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
                 `<div class="message">
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
      var html = //メッセージに画像が含まれない場合のHTMLを作る
                `<div class="message">
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
});