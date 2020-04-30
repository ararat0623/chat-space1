require 'rails_helper'

describe MessagesController,type: :controller do
  describe 'GET #index' do
    context  "ログインしている場合"      do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      it "アクション内で定義しているインスタンス変数があるか" do
        messages = create_list(:message,3)
        get :index
        expect(assaigns(:messages)).to match(messages)
      end
      it "該当するビューが描画されているか" do
     
      end
    end
    context "ログインしていない場合"　do
      before do
        get :index, params: { group_id: group.id }
      end
      it "意図したビューにリダイレクトできているか" do

      end
    end
  end
end