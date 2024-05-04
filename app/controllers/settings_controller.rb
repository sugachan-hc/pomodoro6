class SettingsController < ApplicationController
  def update
    @setting = Setting.find(params[:id])

    if @setting && @setting.user_id == current_user.id
      @setting.assign_attributes(setting_params)
    else
      @setting = Setting.new(setting_params)
      @setting.user = current_user
    end
  
    if @setting.save
      redirect_to root_path, notice: "登録しました"
    else
      redirect_to root_path, alert: "更新に失敗しました"
    end
  end

  def setting_params
    params.require(:setting).permit(
      :work_minute, :work_second, :automatic_work_start,
      :short_break_minute, :short_break_second,
      :long_break_minute, :long_break_second,
      :work_interval, :automatic_break_start,
      :sound_notification,
      :start_message1, :start_message2, :start_message3,
      :display_message, :theme
    )
  end
end
