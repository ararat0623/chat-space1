require 'rails_helper'

describe Message do
  describe '#create' do
    it  "contentが存在すれば保存できる" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end
    it  "imageが存在すれば保存できる" do
      message = build(:message, content: nil)
      expect(message).to be_valid
    end
    it  "contentとimageが存在すれば保存できる" do
      message = build(:message)
      expect(message).to be_valid
    end
    it  "メッセージも画像も無いと保存できない" do
      message = build(:message,content: nil,image: nil)
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end
    it  "group_idが無いと保存できない" do
      message = build(:message,group: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    it  "user_idが無いと保存できない" do
      message = build(:message,user: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
    

  end
end