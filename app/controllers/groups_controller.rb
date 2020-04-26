class GroupsController < ApplicationController
  def index
    @groups = Group.all
    
  end
  def new
    @group = Group.new
    @group.users << current_user
  end
  def create
    @group = Group.new
    if @group.save(group_params)
      redirect_to "/groups/#{@group.id}/messages", notice: 'グループを作成しました'
    else
      render :new
    end
  end
  def edit
    @group = Group.find(params[:id])
  end
  def update
    @group = Group.find(params[:id])
    if @group.save(group_params)
      redirect_to "/groups/#{@group.id}/messages", notice: 'グループを更新しました'
    else
      render :edit
    end
    
  end


  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
