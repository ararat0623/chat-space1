class MessagesController < ApplicationController
  before_action :group_setting
  
  def index
    @message =Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
   @message = @group.messages.new(message_params)
   if @message.save
   redirect_to "/groups/#{@group.id}/messages" ,notice: "messageを送信しました"
   else
    @messages = @group.messages.includes(:user)
    flash.now[:alert] = 'メッセージを入力してください。'
    render :index
   end
  end

private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end 
  def group_setting
    @groups = Group.all.includes(:user)
    @group = Group.find(params[:group_id])
  end

end
