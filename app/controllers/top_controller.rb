class TopController < ApplicationController
  def index
    user_id = current_user&.setting&.user_id || 1
    @setting = Setting.find_by(user_id: user_id)
  end
end

