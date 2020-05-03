$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
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
      var html = //メッセージに画像が含まれない場合のHTMLを作る
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i,message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
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